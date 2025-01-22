import doctorModel from '../models/doctorModel.js';
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';


const changeAvailable=async (req,res) => {

   try {

    const {docId}=req.body;

    const docdata=await doctorModel.findById(docId);

    await doctorModel.findByIdAndUpdate(docId,{
        available:!docdata.available
    })
    res.status(201).json({
        success:true,
        message:"availability changed"
    })
    
   } catch (e) {

      res.json({
        success:false,
        message:e.message
      })
    
   }


}

const DoctorList=async(req,res)=>{

    try {
        
        const doctors=await doctorModel.find({}).select(['-password','-email'])
        res.status(200).json({
          success:true,
          doctors,
          message:'all doctors'
        })
    } catch (error) {
        res.json({
            success:false,
            message:e.message
          })
        
    }
}


const  doctorLogin=async (req,res) => {

      try {

        const {email,password}=req.body;

        const doctorData=await doctorModel.findOne({email});

        if(!doctorData){
          res.json({
            success:false,
            message:"doctor not existed"
          })
        }

        const check=await bcrypt.compare(password,doctorData.password);

        if(check){

            const token=jwt.sign({id:doctorData._id},process.env.JWT_KEY)
            res.json({
              success:true,
              token
            })
        }else{

          res.json({
        success:false,
            message:"invalid credentials"
          })
      

        }
        
      } catch (error) {

        res.json({
          success:false,
          message:error.message
        })
        
      }

        

  
}

const doctorAppointment=async(req,res) => {
      
    try {

      const {docId}=req.body

      const appointments=await appointmentModel.find({docId});
   
   
      if(!appointments){
         res.json({
           success:false,
           message:"no appointments"
   
         })
      }
   
      res.json({
       success:true,
       appointments
   
   
      })
   
      
    } catch (error) {

      res.json({
        success:false,
        message:error.message
      })
      
    }

   
     

    
}
//API to mark appointmetn completed for doctor panel

const appointmentComplete=async (req,res) => {

   try {

    const {docId,appointmentId}=req.body

    const appointmentData= await appointmentModel.findById(appointmentId)

    if(appointmentData && appointmentData.docId===docId){

       await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
    
           res.json({
            success:true,
            message:"Appointment Completed"

           })
      
    }else{

      res.json({
        success:false,
        message:"Mark Failed"

       })

    }
    
   } catch (error) {

    res.json({
      success:false,
      message:error.message
    })
    
   }
  
}

//API to cancel appointment  for doctor panel

const appointmentCancel=async (req,res) => {

  try {

   const {docId,appointmentId}=req.body

   const appointmentData= await appointmentModel.findById(appointmentId)

   if(appointmentData && appointmentData.docId===docId){

      await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
      res.json({
           success:true,
           message:"Appointment Cancelled"

          })
     
   }else{

     res.json({
       success:false,
       message:"Cancellation failed"

      })

   }
   
  } catch (error) {

   res.json({
     success:false,
     message:error.message
   })
   
  }
 
}


//API to get dashboard data;

   const  getDashboard=async (req,res) => {
         
      try {

        const {docId}=req.body;

        const appointments=await appointmentModel.find({docId});

        let earnings=0;

        appointments.map((item)=>{
           if(item.isCompleted || item.payment){
             earnings+=item.amount;
           }
        })

        let patients=[]

        appointments.map((item)=>{
             if(!patients.includes(item.userId)){
              patients.push(item.userId)
             }
        })
        

        const dashboard={
          earnings,
          appointments:appointments.length,
           patients:patients.length,
           latestAppointments:appointments.reverse().slice(0,5)
        }

        res.json({
           success:true,
           dashboard
        })
        
      } catch (error) {
        
        res.json({
          success:false,
          message:error.message
        })
      }
    
   }

   //API to get doctor profile for Doctor Panel

   const  doctorProfile=async (req,res) => {
       
    try {
      const {docId}=req.body;
      const profileData=await  doctorModel.findById(docId).select('-password')

      res.json({
        success:true,
        profileData
      })

      
    } catch (error) {
      res.json({
        success:false,
        message:error.message
      })
      
    }

    
   }

   //API to update doctor profile data from Doctor Panel

   const updateDoctorProfile=async (req,res) => {

     try {
      const {docId,fees,address,available}=req.body
      await doctorModel.findByIdAndUpdate(docId,{fees,address, available})

      res.json({
        success:true,
        message:'profile Updated'
      })
      
     } catch (error) {
      res.json({
        success:false,
        message:error.message
      })
      
     }
    
   }


export {changeAvailable,DoctorList,doctorLogin,doctorAppointment,appointmentCancel,appointmentComplete,getDashboard,doctorProfile,updateDoctorProfile}