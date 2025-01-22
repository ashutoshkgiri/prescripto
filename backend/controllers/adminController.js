
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt  from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

 
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({
                success: false,
                message: "Missing details"
            });
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

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Uploading image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees, 
            address:JSON.parse(address),
            available: true,
            date: Date.now(), 
        };

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save();

        res.status(201).json({
            success: true,
            message: "Doctor added successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

const adminLogin=async (req,res) => {

    try {

        const {email,password}=req.body;

        if(!email ||!password){
            res.status(400).json({
                success:false,
                message:"please enter username and password"
            })
        }

        if(email===process.env.ADMIN_EMAIL&& password===process.env.ADMIN_PASSWORD){
              
             const token=jwt.sign(email+password,process.env.JWT_KEY)
 
             res.json({
                success:true,
                token
             })
        }else{

            res.json({
                success:false,
                message:"invalid credencial"
            })

        } 



        
    } catch (e) {
        console.log(e);
        res.status(400).json({
             success:false,
             message:"some error"
        }); 
        
    }
    
}

//API to get all doctors list fro admin panel

const allDoctors=async (req,res) => {
    try {
        const doctors=await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})

        
    } catch (error) {
        console.log(e);
        res.status(400).json({
             success:false,
             message:"some error"
        }); 
        
    }
    
}

//API to get all appointments list

const appointmentsAdmin=async (req,res) => {

    try{

        const appointments=await appointmentModel.find({})
        res.json({
            success:true,
            appointments
        })


    }catch(error){
        console.log(e);
        res.status(400).json({
             success:false,
             message:"some error"
        }); 
    }

    
}


const appointmentCancel = async (req, res) => {

    try {

        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId)

        //verify appointment user


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

//cancellation of the appointment


//API to get dashboard data for admin panel



const adminDashboard=async (req,res) => {
    try {

        const doctors=await doctorModel.find({});

        const users=await userModel.find({});

        const appointments=await appointmentModel.find({})

        const dashData={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointment:appointments.reverse().slice(0,5)



        }

        res.json({
            success:true,
            dashData
        })

          

        
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
        
    }
    
}

export { addDoctor ,adminLogin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard};
