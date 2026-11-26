
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthApi } from '../../../../api/index.js'

export default function Register() {
const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)
const [isLoading, setIsLoading] = useState(false)
let {register , formState:{errors} , handleSubmit , getValues} =  useForm()

let navigate = useNavigate()
async function onSubmit(data){
  
  try {
setIsLoading(true)
  await AuthApi.register(data)
   toast.success("Register succesfuly")
   setIsLoading(false)
   navigate("/verify-account")
 
    
  } catch (error) {
      const message = error.response
        ? 'this email or userName already registered'
        : 'Network error, please try again'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }

}
  return <>
  <div className="register-container ">
        <div className="title">
            <h3 className='h5'>Register</h3>
            <p className='text-muted'>Welcome Back! Please enter your details</p>
          </div>
          <div className="form-container  ">
            <form onSubmit={handleSubmit(onSubmit)} >
       <div className=" register-form  justify-content-center">
           <div className=' me-md-3  col-md-6'>
             <div className="input-group mt-3  px-2 rounded rounded-1  d-flex justify-content-center align-items-center">
<span><i className="fa-regular fa-envelope"></i></span>
<input  {...register("userName" , {
  required:"username  is required" ,
 pattern:{
  value : /^(?=.*\d).{3,7}$/ ,
  message : "Username must be 3-7 characters and contain a number"
 }
})} type="text" className='form-control' placeholder='Enter your userName ' />
           </div>
           {errors.userName ?<div className='text-danger error'>{errors.userName .message}</div>:""}
           <div className="input-group mt-3  px-2 rounded rounded-1  d-flex justify-content-center align-items-center">
<span><i className="fa-regular fa-envelope"></i></span>
<input  {...register("country" , {
  required:"country  is required" ,

})} type="text" className='form-control' placeholder='Enter your country ' />
           </div>
           {errors.country?<div className='text-danger error'>{errors.country.message}</div>:""}
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
              {errors.password?<div className='text-danger error error'>{errors.password.message}</div>:""}
          </div>
       <div className='col-md-6'>
            <div className="input-group mt-3  px-2 rounded rounded-1  d-flex justify-content-center align-items-center">
<span><i className="fa-regular fa-envelope"></i></span>
<input  {...register("email" , {
  required:"email is required" ,
   pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
})} type="email" className='form-control' placeholder='Enter your E-mail' />
           </div>
           {errors.email?<div className='text-danger error'>{errors.email.message}</div>:""}
           <div className="input-group mt-3  px-2 rounded rounded-1  d-flex justify-content-center align-items-center">
<span><i className="fa-regular fa-envelope"></i></span>
<input  {...register("phoneNumber" , {
  required:"phoneNumber  is required" ,
   pattern: {
      value: /^01[0125][0-9]{8}$/,
      message: "Please enter a valid EGY Number ",
    },
})} type="text" className='form-control' placeholder='Enter your Phone Number' />
           </div>
           {errors.phoneNumber?<div className='text-danger error'>{errors.phoneNumber.message}</div>:""}
            <div className="input-group mt-3  px-2 rounded rounded-1  d-flex justify-content-center align-items-center">
<span><i className="fa-solid fa-lock"></i></span>
<input {...register("confirmPassword" , {
  required:"confirm password is required" ,
 
    validate :(value)=>
      value === getValues("password") || "passwords do not match"
    
    
})}  type={showConfirmPassword?"text":"password"} className='form-control' placeholder='confirm your password' />
          {!showConfirmPassword?<i onClick={()=>setShowConfirmPassword(true)} className="fas fa-eye"></i>:<i  onClick={()=>setShowConfirmPassword(false)} className="fas fa-eye-slash"></i>}
           </div>
              {errors.confirmPassword?<div className='text-danger error'>{errors.confirmPassword.message}</div>:""}
       </div>
       </div>
      
          <div className='submit-container d-flex justify-content-center my-3'>
           {isLoading? <button className='btn bg-main w-75 text-white '>Sending <i className='fas fa-spin fa-spinner'></i></button>:  <button className='btn bg-main w-75 text-white '>Register</button>}
          </div>
            </form>
          </div>
  </div>
  
  
  </>
}
