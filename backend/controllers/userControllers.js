

//API to register user
import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'


const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            res.status(400).json({
                success: false,
                message: "please fill all the detail"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Please enter a stronger password"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashpassword
        }
        const newUser = new userModel(userData)

        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY)

        res.json({
            success: true,
            token
        })









    } catch (e) {

        console.log(e)
        res.json({ success: false, message: e.message })

    }

}

const userLogin = async (req, res) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.json({
            success: false,
            message: 'incorrected email or password'
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
        const token = await jwt.sign({ id: user._id }, process.env.JWT_KEY)
        res.json({
            success: true,
            token

        })
    } else {
        res.json({
            success: false,
            message: "Invalid credentials"
        })
    }





}

//API to get user profile data

const getProfile = async (req, res) => {

    try {

        const { userId } = req.body;

        const userData = await userModel.findById(userId).select('-password')

        res.json({
            success: true,
            userData
        })




    } catch (error) {

        console.log(error)
        res.json({
            success: false,
            message: error.message
        })

    }

}

//API to update use profile

const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file
        if (!name || !phone || !dob || !gender) {
            return res.json({
                success: false,
                message: "Data Missing"
            })
        }
        const parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;
        await userModel.findByIdAndUpdate(userId, { name, phone, address: parsedAddress, dob, gender })

        if (imageFile) {
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })

        }

        res.json({
            success: true,
            message: "Profile Updated"
        })


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })


    }

}


const bookAppointment = async (req, res) => {
    try {

        const { userId, docId, slotTime, slotDate } = req.body;
     


        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData) {

            return res.json({

                success: false,
                message: "doctor is not found"
            })
        }




        if (!docData.available) {
            return res.json({
                success: false,
                message: "doctor is not available"
            })
        }



        let slots_booked = docData.slots_booked;

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({
                    success: false,
                    message: "Slot not available"
                })
            } else {

                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime)
        }


        const userData = await userModel.findById(userId).select("-password");


        delete docData.slots_booked;


        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            docData,
            userData,
            amount: docData.fees,
            date: Date.now()


        }

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();



        //save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })



        res.json({
            success: true,
            message: "appointment booked successfully"
        })


    } catch (error) {

        console.error("Error booking appointment:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
}


const allAppointment = async (req, res) => {

    try {


        const { userId } = req.body;

        const alldata = await appointmentModel.find({ userId });

        res.json({
            success: true,
            alldata

        })

    } catch (error) {

        res.json({
            success: false,
            message: "error in getting appointment"
        })
    }

}

const cancelAppointment = async (req, res) => {

    try {

        const { userId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId)

        //verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({
                success: false,
                message: 'Unauthorized action'
            })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        //releasing doctor slot

        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({
            success: true,
            message: "Appointment Cancelled"
        })






    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })

    }

}


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
//API to make payment of appointment using razorpay


const paymentRazorpay = async (req, res) => {
   try {

    const {appointmentId}=req.body


    const appointmentData=await appointmentModel.findById(appointmentId)

    if(!appointmentData || appointmentData.cancelled){
        return res.json({
            success:false,
            message:"Appointment Cancelled or not found"
        }) 
    }
    //creating option for razorpay payment

    const options={
        amount:appointmentData.amount*100,
        currency:process.env.CURRENCY,
        receipt:appointmentId
    }

    //creation of an orders
    const order =await razorpayInstance.orders.create(options)

    res.json({success:true,order})
    
   } catch (e) {

    console.log(e);
    res.json({
        success: false,
        message: e.message
    })

    
   }



}





export { registerUser, userLogin, getProfile, updateProfile, bookAppointment, allAppointment, cancelAppointment }

