import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const {dashData,setDashData,getDashData,dToken,completeAppointment,cancelAppointment}=useContext(DoctorContext)
  const {slotDateFormat}=useContext(AppContext)

  useEffect(()=>{
    if(dToken){
      getDashData();
    }
  },[dToken])

  return dashData &&(
    <div className='m-5'>
       <div className='flex flex-wrap gap-3'>
                  
                  <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-13' src={assets.earning_icon} alt="" />
      
                    <div>
                      <p>{dashData.earnings}</p>
                      <p>Earning</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded boarder-2 boarder-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-13'  src={assets.appointment_icon} alt="" />
        
                    <div>
                      <p>{dashData.appointments}</p>
                      <p>Appointments</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded boarder-2 boarder-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-13' src={assets.patients_icon} alt="" />
      
                    <div> 
                      <p>{dashData.patients}</p>
                      <p>Patients</p>
                    </div>
                  </div>
            </div>
      
            <div className='bg-white'>
              <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
                <img src={assets.list_icon} alt="" />
                <p className='font-semibold'>Latest Bookings</p>
      
              </div>
      
              <div className='pt-4 border border-t-0'> 
      
                {
                  dashData.latestAppointments.map((item,index)=>(
                    <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                      
                      <img className='rounded-full w-10' src={item.userData.image} alt="" />
                      <div>
                        <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                        <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                      </div>
 {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Complete</p>
                :
                <div className="flex items-center gap-3">


                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt="Cancel"
                    className="w-6 h-6 cursor-pointer hover:scale-105 transition-transform"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    src={assets.tick_icon}
                    alt="Confirm"
                    className="w-6 h-6 cursor-pointer hover:scale-105 transition-transform"
                  />
                </div>

            }
                   
                    </div>
                  ))
                }
      
              </div>
      
            </div>
    </div>
  )
}

export default DoctorDashboard