import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-4xl font-bold text-gray-800">
          CONTACT <span className="text-blue-500">US</span>
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full max-w-md h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Information Section */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          {/* Office Info */}
          <div className="space-y-2">
            <b className="text-xl text-gray-800">OUR OFFICE</b>
            <p className="text-lg text-gray-700">2 Cost MP State, Gurugram, India</p>
            <p className="text-lg text-gray-700">Tel: 4594795453</p>
            <p className="text-lg text-blue-500">greatstackdev@gmail.com</p>
          </div>

          {/* Careers Info */}
          <div className="space-y-2">
            <b className="text-xl text-gray-800">CAREERS AT PRESCRIPTO</b>
            <p className="text-lg text-gray-700">
              Learn more about our teams and job openings.
            </p>
          </div>

          {/* Button */}
          <div>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
