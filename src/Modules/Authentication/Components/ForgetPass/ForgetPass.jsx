
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthApi } from '../../../../api/index.js'

export default function ForgetPass() {

let {register , formState:{errors} , handleSubmit} =  useForm()
const [isLoading, setIsLoading] = useState(false)
let navigate = useNavigate()
async function onSubmit(data){
  
  try {
setIsLoading(true)
    await AuthApi.forgetPass(data)
   toast.success("email sent successfully")
   navigate("/reset-pass")

    
  } catch (error) {
        const message = error.response
          ? 'invalid email'
          : 'Network error, please try again'
        toast.error(message)
      } finally {
        setIsLoading(false)
      }

}
  return <>
  <div className="logo-container">
        <div className="title">
            <h3 className='h5'>Forgot Your Password?</h3>
            <p className='text-muted'>No worries! Please enter your email and we will send a password reset link </p>
          </div>
          <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)} >
           <div className="input-group  px-2 rounded rounded-1  d-flex justify-content-center align-items-center">
<span><i className="fa-regular fa-envelope"></i></span>
<input  {...register("email" , {
  required:"email is required" ,
   pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
})} type="email" className='form-control' placeholder='Enter your E-mail' />
           </div>
           {errors.email?<div className='text-danger'>{errors.email.message}</div>:""}
          <div className='submit-container d-flex justify-content-center my-3'>
          {isLoading?<button className='btn bg-main w-75 text-white '>Sending <i className='fas fa-spin fa-spinner'></i> </button>:   <button className='btn bg-main w-75 text-white '>Submit</button>}
          </div>
            </form>
          </div>
  </div>
  
  
  </>
}
