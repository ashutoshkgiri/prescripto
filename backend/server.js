import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloundinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js'
import { userRouter } from './routes/userRoute.js';

const app=express()
const port=process.env.PORT||4000;
//middlewares

connectDB();
connectCloundinary();

app.use(express.json());
app.use(cors())

app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

// api endpoints

app.get('/',(req,res)=>{
   res.send('API not WORKING')
})
app.listen(port,()=> console.log("server started",port))

