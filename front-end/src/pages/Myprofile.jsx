import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
 
const Myprofile = () => {
  const {userData, setUserData,token,backendUrl,loadUserProfileData} =useContext(AppContext)


  const [isEdit, setIsEdit] = useState(false);
  const [image,setImage]=useState(false);

  const updateUserProfileData=async()=>{
    
        try {

          const formData=new FormData();
          formData.append('name',userData.name)
          formData.append('phone',userData.phone)
          formData.append('address',JSON.stringify(userData.address))
          formData.append('gender',userData.gender)
          formData.append('dob',userData.dob)



          image && formData.append('image',image)

          const {data}=await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token}})

       
          if(data.success){
            toast.success(data.message)
            await loadUserProfileData();
            setIsEdit(false);
            setImage(false);
          }else{
            toast.error(data.message)
          }




          
        } catch (error) {
          console.log(error);
          toast.error(error.message)
          
        }
  }

  return userData&& (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Profile Picture */}

      {
        isEdit?
        <label htmlFor='image'>
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image):userData.image} alt="" />
              <img className='w-10 absolute bottom-12 right-12' src={image?'':assets.upload_icon} alt="" />
            </div>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden />
        </label>
        :
        <div className="mb-6"> 
        <img
          src={userData.image}
          alt="Profile"
          className="w-40 h-40 rounded-full shadow-md object-cover"
        />
      </div>
      }


      {/* Name Section */}
      <div className="text-center mb-6">
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({...prev, name: e.target.value}))
            }
            className="text-xl font-semibold text-gray-800 border px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <p className="text-2xl font-bold text-gray-800">{userData.name}</p>
        )}
      </div>

      <hr className="w-full border-gray-300 mb-6" />

      {/* Contact Information */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 mb-6 space-y-4">
        <p className="text-lg font-semibold text-gray-800">Contact Information</p>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Email ID:</p>
            <p className="text-gray-700">{userData.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="border px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            ) : (
              <p className="text-gray-700">{userData.phone}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Address:</p>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1:e.target.value },
                    }))
                  }
                  className="border px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
                />
                <input
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2:e.target.value },
                    }))
                  }
                  className="border px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
                />
              </div>
            ) : (
              <p className="text-gray-700">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 mb-6 space-y-4">
        <p className="text-lg font-semibold text-gray-800">Basic Information</p>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Gender:</p>
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="border px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-700">{userData.gender}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="border px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            ) : (
              <p className="text-gray-700">{userData.dob}</p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="text-center">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

export default Myprofile
