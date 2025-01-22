import React from 'react';
import { useState,useContext} from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {setAToken,backendUrl}=useContext(AdminContext);

  const {setDToken}=useContext(DoctorContext);

  const onSubmitHandler=async(event)=>{
        event.preventDefault()

        try { 

            if(state=='Admin'){
                const {data}=await axios.post(backendUrl+'/api/admin/login',{email,password})
                if(data.success){
                   // console.log(data.token);
                    localStorage.setItem('aToken',data.token)
                    setAToken(data.token)
                }else{
                    console.log(data.message);
                    toast.error(data.message) 
                }
            }else{

              const {data}=await axios.post(backendUrl+'/api/doctor/login',{email,password})

              if(data.success){
                console.log(data.token);
                localStorage.setItem('dToken',data.token)
                setDToken(data.token)
            }else{
                console.log(data.message);
                toast.error(data.message) 
            }



            }
            
        } catch (error) {
            
        }
  }
  

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <p className="text-xl font-semibold text-gray-800 mb-4">
          <span className="text-blue-600">{state}</span> Login
        </p>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Email</p>
          <input
           onChange={(e)=>setEmail(e.target.value)} value={email}
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-600 mb-1">Password</p>
          <input
           onChange={(e)=>setPassword(e.target.value)} value={password}
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
        {
            state==='Admin'
            ?<p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
            :<p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  );
};

export default Login;
