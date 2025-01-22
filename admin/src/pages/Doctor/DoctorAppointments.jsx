import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { dToken, getAppointments, appointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken])
  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <p className="mb-4 text-xl font-semibold text-gray-800">All Appointments</p>

      <div className="bg-white border rounded-lg shadow-md text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 py-3 px-6 border-b bg-gray-50">
          <p className="font-medium text-gray-600">#</p>
          <p className="font-medium text-gray-600">Patient</p>
          <p className="font-medium text-gray-600">Payment</p>
          <p className="font-medium text-gray-600">Age</p>
          <p className="font-medium text-gray-600">Date & Time</p>
          <p className="font-medium text-gray-600">Fees</p>
          <p className="font-medium text-gray-600">Action</p>
        </div>

        {/* Rows */}
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 items-center py-3 px-6 border-b hover:bg-gray-50 transition duration-200"
          >
            {/* Serial Number */}
            <p className="text-gray-700">{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-3">
              <img
                src={item.userData.image}
                alt="Patient"
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
              <p className="text-gray-800 font-medium">{item.userData.name}</p>
            </div>

            {/* Payment Method */}
            <p
              className={`${item.payment ? "text-green-600" : "text-red-600"
                } font-medium`}
            >
              {item.payment ? "Online" : "Cash"}
            </p>

            {/* Age */}
            <p className="text-gray-700">{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p className="text-gray-600">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Fees */}
            <p className="text-gray-800 font-medium">${item.amount}</p>

            {/* Actions */}
 
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
        ))}
      </div>
    </div>

  )
}

export default DoctorAppointments