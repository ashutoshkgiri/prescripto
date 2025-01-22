import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate=useNavigate()

  const {backendUrl,token,setToken}=useContext(AppContext)
  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    
    // Add logic for API call or form processing here

      try {
        

        if(state=='Sign Up'){
          const {data}=await axios.post(backendUrl+'/api/user/register',{name,email,password})

          if(data.success){
            localStorage.setItem('token',data.token)
            setToken(data.token)
          }else{
            toast.error(data.message)
          }
        }else{

          const {data}=await axios.post(backendUrl+'/api/user/login',{email,password})

          if(data.success){
            localStorage.setItem('token',data.token)
            setToken(data.token)
          }else{
            toast.error(data.message)
          }

        }
      } catch (error) {
        toast.error(error.message)
        
      }


  }

  useEffect(()=>{

    if(token){
         navigate('/')
    }
  },[token])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-6"
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </p>
          <p className="text-gray-600">
            Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment
          </p>
        </div>

        {/* Name Input */}
        {state === 'Sign Up' && (
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {/* Toggle between Login and Sign Up */}
        <p className="text-center text-sm text-gray-600">
          {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
          >
            {state === 'Sign Up' ? 'Log In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </form>
  )
}

export default Login
