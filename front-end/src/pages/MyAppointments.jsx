import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyAppointments = () => {
  const { token, backendUrl,getDoctorsData } = useContext(AppContext);
  const [userAppointment, setUserAppointment] = useState([]);
   
  const months=["Jan","Feb",'Mar',"Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const slotDateFormat=(slotDate)=>{
     const dateArray=slotDate.split('-');

     return dateArray[0]+" "+months[Number(dateArray[1])-1]+" "+dateArray[2]

  }



  const getUserAppointment = async () => {
    try {
      if (token) {
        const response = await axios.get(`${backendUrl}/api/user/appointment`, {
          headers: { token },
        });

        const { success, alldata } = response.data;
        console.log(alldata);
        if (success) {
          setUserAppointment(alldata);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const cancelAppointment=async(appointmentId)=>{
        try {

          const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})

          if(data.success){
            toast.success(data.message);
            getUserAppointment();
            getDoctorsData();
          }else{
            toast.error(data.message); 

          }
          
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || "Something went wrong");
          
        }
  }





  useEffect(() => {
    if (token) {
      getUserAppointment();
    }
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Appointments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userAppointment.length > 0 ? (
          userAppointment.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-4 border border-gray-200"
            >
              <div className="mb-4">
              <img
  src={item.docData.image}
  alt={item.docData.name}
  className="w-full h-auto object-contain rounded-lg"
/>

              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.docData.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {item.docData.speciality}
                </p>
                <div className="mt-2 text-sm text-gray-700">
                  <p>
                    <span className="font-bold">Address:</span>
                  </p>
                  <p>{item.docData.address.line1}</p>
                  <p>{item.docData.address.line2}</p>
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  <p>
                    <span className="font-bold">Date & Time:</span>{" "}
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
              {!item.cancelled && !item.payment &&!item.isCompleted && <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Pay Online
                </button>}
               {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  Cancel Appointment
                </button>}
                {item.cancelled && !item.isCompleted&& <button className='sm:min-w-48 py-2 boarder boarder boarder-red-500 rounded text-red-500'>Appointment cancelled</button>} 
                {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No appointments found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
