import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality,docId}) => {

     const {doctors}=useContext(AppContext)

     const navigate=useNavigate();
     const [relDoc,setRelDocs]=useState([])

     useEffect(()=>{
        if(doctors.length>0 && speciality){
            const doctorsData=doctors.filter((doc)=> doc.speciality===speciality && doc._id!==docId)
                setRelDocs(doctorsData)
            
        }

     },[doctors,speciality,docId])

  return (
    <div className="max-w-6xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-2">Top Doctors to Book</h1>
      <p className="text-sm text-gray-600 mb-6">
        Simply browse through our extensive list of trusted doctors
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relDoc.slice(0, 4).map((item, index) => (
          <div
          onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
            key={index}
            className="bg-white border border-gray-250 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            <img
              className="w-full h-50 object-cover rounded-t-lg"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4 text-left">
            <div className="flex items-center gap-2 mb-2"> 
              <span className={`w-3 h-3${item.available ? ' bg-green-500' : ' bg-gray-500'} rounded-full`}></span>

                <p className="text-sm text-gray-600">{item.available?'Available':'Not Available'}</p>
              </div>
              <p className="text-lg font-semibold text-gray-800 mb-1">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        More
      </button>
    </div>
  )
}

export default RelatedDoctors