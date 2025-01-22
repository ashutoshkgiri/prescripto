import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol,backendUrl,token,getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState(null);

  const Navigate=useNavigate();



  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  
  };

  const getAvailableSlots = async () => {
    if (!docInfo) {
      return; // Exit early if docInfo is null
    }
  
    setDocSlots([]); // Reset slots
    let today = new Date();
  
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
  
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
  
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
  
        const slotDate = `${day}-${month}-${year}`;
        const slotTime = formattedTime;
  
        const isSlotAvailable = docInfo.slots_booked?.[slotDate]?.includes(slotTime) ? false : true;
  
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
  
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };
  

const bookAppointment = async () => {
  if (!token) {
    toast.error("Please login first");
    Navigate('/login');
    return;
  }

  try {
    const date = docSlots[slotIndex][0].datetime;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const slotDate = `${day}-${month}-${year}`;

    // Call the backend API
    const response = await axios.post(
      backendUrl+'/api/user/book-appointment',
      { docId, slotDate, slotTime },
      { headers: { token } }
    );

    // Access the response data
    const { success, message } = response.data;

    if (success) {
      toast.success(message);
      getDoctorsData();
      Navigate('/my-appointments');
    } else {
      toast.error(message);
    }
  } catch (error) {
    console.error("Error booking appointment:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
  
  }, [docSlots]);

  return (
    docInfo && (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex flex-col sm:flex-row gap-6 bg-white shadow-lg p-6 rounded-lg">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-48 h-48 object-cover rounded-full border-4 border-blue-500"
            />
          </div>

          {/* Doctor Info */}
          <div className="flex flex-col gap-4">
            {/* Name and Verification */}
            <div className="flex items-center gap-2">
              <p className="text-2xl font-semibold text-gray-800">{docInfo.name}</p>
              <img src={assets.verified_icon} alt="Verified" className="w-6 h-6" />
            </div>

            {/* Degree, Specialty, and Experience */}
            <div className="text-gray-600">
              <p className="text-lg">{`${docInfo.degree} - ${docInfo.speciality}`}</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                {`${docInfo.experience} years of experience`}
              </button>
            </div>

            {/* About Section */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="text-lg font-medium text-gray-700 flex items-center gap-2">
                About <img src={assets.info_icon} alt="Info" className="w-5 h-5" />
              </p>
              <p className="text-sm text-gray-600 mt-2">{docInfo.about}</p>
            </div>
            <p className='text-gray-500 font-medium'>Appointment fee: <span>{currencySymbol}{docInfo.fees}</span></p>
          </div>
        </div>


        {/*  booling slots */}
         
         <div className='sm-ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
           <p>Booking slots</p>
            <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
              {
                docSlots.length&& docSlots.map((item,index)=>(
                 <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-[64px] rounded-full cursor-pointer ${
                  slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
                }`} key={index}>
                    <p>{item[0]&& daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                 </div>
                ))
              }
            </div>

           

            <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4' >
            {docSlots.length > 0 && docSlots[slotIndex].map((item,index)=>(
                 <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-fill cursor-pointer ${item.time===slotTime ?'bg-primary text-white':'text-gray-400 border border-gray-300'} `} key={index}>
                  {item.time.toLowerCase()}
                 </p>
              ))
              }
            </div>
            <div>
              <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
            </div>
         
         </div>

         <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>

      </div>
    )
  );
};

export default Appointment;
