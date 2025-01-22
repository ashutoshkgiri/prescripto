import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate=useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-6 rounded-lg shadow-lg">
      {/* Left side */}
      <div className="flex justify-center items-center h-screen text-center md:text-left md:w-1/2 space-y-4">
        <div>
             <p className="text-lg font-semibold text-gray-500">Book Appointment</p>
             <p className="text-2xl font-bold text-blue-500">With 100+ Trusted Doctors</p>
             </div>
   <button onClick={()=>{navigate('/login');scrollTo(0,0)}} className='lex flex-col items-center bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition-all'>
         Create Account
         </button>
     </div>

      

      {/* Right side */}
      <div className="mt-6 md:mt-0 md:w-1/2 flex justify-center">
        <img
          className="w-full max-w-sm object-contain"
          src={assets.appointment_img}
          alt="Appointment"
        />
      </div>
    </div>
  );
};

export default Banner;  