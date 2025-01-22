import express from "express"
import { addDoctor ,adminLogin, allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard} from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"
import authadmin from "../middlewares/authAdmin.js"
import { changeAvailable } from "../controllers/doctorController.js"


const adminRouter=express.Router()

adminRouter.post('/add-doctor',authadmin,upload.single('image'),addDoctor)
adminRouter.post('/login',adminLogin)
adminRouter.get('/all-doctors',authadmin,allDoctors)
adminRouter.post('/change-status',authadmin,changeAvailable) 
adminRouter.get('/appointments',authadmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authadmin,appointmentCancel)
adminRouter.get('/dashboard',authadmin,adminDashboard)

export default adminRouter;