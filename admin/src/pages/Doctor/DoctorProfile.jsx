import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData} = useContext(DoctorContext);
  const backendUrl=import.meta.env.VITE_BACKEND_URL
  const [isEdit,setIsEdit]=useState(false)

  const updateProfile=async () => {

     try {
 
      const updateData={

      address:profileData.address,
      fees:profileData.fees,
      available:profileData.available
      }

      const {data}=await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{dToken}})
      console.log(data)

      if(data.success){
        toast.success(data.message);
        setIsEdit(false)
        getProfileData()
      }else{
        toast.error(data.message)
      }
      
     } catch (error) {
      toast.error(error.message)
      console.log(error)
     }
    
  }



  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <div className="flex gap-6">
          {/* Profile Image */}
          <div className="w-32 h-32 flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-300">
            <img src={profileData.image} alt="Doctor" className="w-full h-full object-cover" />
          </div>

          {/* Profile Information */}
          <div className="flex-1 space-y-4">
            {/* Doctor Info: Name, Degree, Experience */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-sm text-gray-600">{profileData.degree} - {profileData.speciality}</p>
                <button className="px-4 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                  {profileData.experience} years
                </button>
              </div>
            </div>

            {/* About Section */}
            <div>
              <p className="font-semibold text-gray-700">About:</p>
              <p className="text-sm text-gray-600">{profileData.about}</p>
            </div>

            {/* Appointment Fee */}
            <p className="text-gray-700 font-semibold">
              Appointment Fee: <span className="text-gray-800 font-bold">$ { isEdit?<input type="number" onChange={(e)=>setProfileData(prev=>({...prev,fees:e.target.value}))}  value={profileData.fees}/>:profileData.fees}</span>
            </p>

            {/* Address */}
            <div>
              <p className="font-semibold text-gray-700">Address:</p>
              <p className="text-sm text-gray-600">
                {isEdit? <input type="text" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1} />:profileData.address.line1}
                <br />
                {isEdit? <input type="text" onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2} />:profileData.address.line2}
              </p>
            </div>

            {/* Availability Checkbox */}
            <div className="flex items-center gap-2 mt-4">
              <input
                onChange={()=>isEdit && setProfileData(prev=>({...prev,available:!prev.available}))}
                checked={profileData.available}
                type="checkbox"
                id="available"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="available" className="text-sm text-gray-700">
                Available
              </label>
            </div>

            {/* Edit Button */}
            {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-6 py-2 bg-green-600 text-white font-semibold rounded shadow hover:bg-green-700"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700"
                >
                  Edit
                </button>
              )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
