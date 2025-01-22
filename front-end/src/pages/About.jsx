import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-4xl font-bold text-gray-800">
          About <span className="text-blue-500">US</span>
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center gap-4">
  {/* Image Section */}
      <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center">
        <img
          src={assets.about_image}
          alt="About Us"
          className="w-full max-w-md h-auto rounded-lg shadow-md"
        />
      </div>

        {/* Text Content */}
      <div className="w-full lg:w-1/2 space-y-4">
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to <span className="font-semibold">Prescripto</span>, your trusted partner in managing
          your healthcare needs conveniently and efficiently. At Prescripto, we understand the
          challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          Prescripto is committed to excellence in healthcare technology. We continuously strive
          to enhance our platform, integrating the latest advancements to improve user experience
          and deliver superior service. Whether you're booking your first appointment or managing
          ongoing care, Prescripto is here to support you every step of the way.
        </p>

        <b className="text-xl text-gray-800 block">Our Vision</b>
        <p className="text-lg text-gray-700 leading-relaxed">
          Our vision at Prescripto is to create a seamless healthcare experience for every user.
          We aim to bridge the gap between patients and healthcare providers, making it easier
          for you to access the care you need, when you need it.
        </p>
      </div>
      </div>
      <div className='text-xl my-4'>
        <p>
          WHY CHOOSE US
        </p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='boarder px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into
             your busy lifestyle.</p>
        </div>
        <div className='boarder px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='boarder px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>Tailored recommendations and reminders
             to help you stay on top of your health.</p>
        </div>

      </div>
    </div>
  )
}

export default About
