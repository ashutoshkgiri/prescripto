import express from "express"
import { DoctorList,doctorLogin,doctorAppointment, appointmentCancel, appointmentComplete,getDashboard,doctorProfile,updateDoctorProfile} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

 
const doctorRouter=express.Router();

doctorRouter.get('/list',DoctorList)
doctorRouter.post('/login',doctorLogin)
doctorRouter.get('/appointments',authDoctor,doctorAppointment)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.get('/dashboard',authDoctor,getDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)
 



export default doctorRouter