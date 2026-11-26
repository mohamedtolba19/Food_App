
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthApi } from '../../../../api/index.js'

export default function resetPass() {
const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)
const [isLoading, setIsLoading] = useState(false)
let {register , formState:{errors} , handleSubmit , getValues} =  useForm()
let navigate = useNavigate()
async function onSubmit(data){
  
  try {
setIsLoading(true)
   await AuthApi.resetPass(data);
   toast.success("Password Reset Successfully")
   navigate("/")

    
  } catch (error) {
        const message = error.response
          ? 'invalid Email or OTP'
          : 'Network error, please try again'
        toast.error(message)
      } finally {
        setIsLoading(false)
      }

}
  return <>
  <div className="logo-container">
        <div className="title">
            <h3 className='h5'>Reset Password</h3>
            <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox</p>
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
           <div className="input-group mt-3 px-2 rounded rounded-1  d-flex justify-content-center align-items-center">
<span><i className="fa-regular fa-envelope"></i></span>
<input  {...register("seed" , {
  required:"OTP is required" ,
  
})} type="text" className='form-control' placeholder='Enter your OTP' />
           </div>
           {errors.seed?<div className='text-danger'>{errors.seed.message}</div>:""}
          <div className="input-group mt-3  px-2 rounded rounded-1  d-flex justify-content-center align-items-center">
<span><i className="fa-solid fa-lock"></i></span>
<input {...register("password" , {
  required:"password is required" ,
   pattern: {
        value: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{4,15}$/,
    message:
      "Password must be 4-9 characters and contain at least one uppercase letter and one symbol",
    },
})}  type={showPassword?"text":"password"} className='form-control' placeholder='Enter your Password' />
{!showPassword?<i onClick={()=>setShowPassword(true)} className="fas fa-eye"></i>:<i  onClick={()=>setShowPassword(false)} className="fas fa-eye-slash"></i>}
           </div>
              {errors.password?<div className='text-danger '>{errors.password.message}</div>:""}
              <div className="input-group mt-3  px-2 rounded rounded-1  d-flex justify-content-center align-items-center">
<span><i className="fa-solid fa-lock"></i></span>
<input {...register("confirmPassword" , {
  required:"confirm password is required" ,
 
    validate :(value)=>
      value === getValues("password") || "passwords do not match"
    
    
})}  type={showConfirmPassword?"text":"password"} className='form-control' placeholder='confirm your password' />
          {!showConfirmPassword?<i onClick={()=>setShowConfirmPassword(true)} className="fas fa-eye"></i>:<i  onClick={()=>setShowConfirmPassword(false)} className="fas fa-eye-slash"></i>}
           </div>
              {errors.confirmPassword?<div className='text-danger'>{errors.confirmPassword.message}</div>:""}
          <div className='submit-container d-flex justify-content-center my-3'>
             {isLoading?<button className='btn bg-main w-75 text-white '>Sending <i className='fas fa-spin fa-spinner'></i></button>:<button className='btn bg-main w-75 text-white '>Submit</button>}
          </div>
            </form>
          </div>
  </div>
  
  
  </>
}
