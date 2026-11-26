
// import axios from 'axios'
// import React, { useContext } from 'react'
// import { useForm } from 'react-hook-form'
// import { Link, useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { AuthApi } from '../../../../api/index.js'
// import { useState } from 'react'
// import { AuthContext } from '../../../../context/AuthContext.jsx'

// export default function Login() {
// const [showPassword, setShowPassword] = useState(false)
// const [isloading, setIsLoading] = useState(false)
// let {register , formState:{errors} , handleSubmit} =  useForm()
// let navigate = useNavigate()
// let {saveUserData} = useContext(AuthContext)
// async function onSubmit(data){
  
//   try {
// setIsLoading(true)
//    let response = await AuthApi.login(data);
//    localStorage.setItem("token" , response.data.token)
//    saveUserData();
//    setIsLoading(false)
//    toast.success("login succesfuly")
//    navigate("/dashboard")
 
    
//   } catch (error) {
//     setIsLoading(false)
//     toast.error("invalid email or password")
    
//   }

// }
//   return <>
//   <div className="logo-container">
//         <div className="title">
//             <h3 className='h5'>Log in</h3>
//             <p className='text-muted'>Welcome Back! Please enter your details</p>
//           </div>
//           <div className="form-container">
//             <form onSubmit={handleSubmit(onSubmit)} >
//            <div className="input-group  px-2 rounded rounded-1  d-flex justify-content-center align-items-center">
// <span><i className="fa-regular fa-envelope"></i></span>
// <input  {...register("email" , {
//   required:"email is required" ,
//    pattern: {
//       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//       message: "Please enter a valid email address",
//     },
// })} type="email" className='form-control' placeholder='Enter your E-mail' />
//            </div>
//            {errors.email?<div className='text-danger'>{errors.email.message}</div>:""}
//            <div className="input-group mt-3  px-2 rounded rounded-1  d-flex justify-content-center align-items-center">
// <span><i className="fa-solid fa-lock"></i></span>
// <input {...register("password" , {
//   required:"password is required" ,
//    pattern: {
//         value: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{4,9}$/,
//     message:
//       "Password must be 4-9 characters and contain at least one uppercase letter and one symbol",
//     },
// })}  type={showPassword?"text":"password"} className='form-control' placeholder='Enter your Password' />
// {!showPassword?<i onClick={()=>setShowPassword(true)} className="fas fa-eye"></i>:<i  onClick={()=>setShowPassword(false)} className="fas fa-eye-slash"></i>}
//            </div>
//               {errors.password?<div className='text-danger'>{errors.password.message}</div>:""}
//            <div className="links d-flex justify-content-between">
//             <Link to={"/register"} className='text-decoration-none text-muted'>Register Now ?</Link>
//             <Link to={"/forget-pass"} className='main-color text-decoration-none'>Forgot Password?</Link>
//            </div>
//           <div className='submit-container d-flex justify-content-center my-3'>
//              {isloading?<button className='btn bg-main w-75 text-white  '> Sending <i className='fas fa-spin fa-spinner'></i></button>:<button className='btn bg-main w-75 text-white  '>Login</button>}
//           </div>
//             </form>
//           </div>
//   </div>
  
  
//   </>
// }


import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthApi } from '../../../../api/index.js'
import { AuthContext } from '../../../../context/AuthContext.jsx'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { register, formState: { errors }, handleSubmit } = useForm()
  const navigate = useNavigate()
  const { saveUserData } = useContext(AuthContext)

  async function onSubmit(data) {
    try {
      setIsLoading(true)
      const response = await AuthApi.login(data)
      localStorage.setItem('token', response.data.token)
      saveUserData()
      toast.success('Logged in successfully')
      navigate('/dashboard')
    } catch (error) {
      const message = error.response
        ? 'Invalid email or password'
        : 'Network error, please try again'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="logo-container">
      <div className="title">
        <h3 className="h5">Log in</h3>
        <p className="text-muted">Welcome back! Please enter your details</p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="input-group  rounded d-flex justify-content-center align-items-center">
            <span><i className="fa-regular fa-envelope" aria-hidden="true"></i></span>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
              type="email"
              autoComplete="email"
              aria-label="Email"
              aria-invalid={!!errors.email}
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
          {errors.email && <div className="text-danger">{errors.email.message}</div>}

          <div className="input-group mt-3  rounded d-flex justify-content-center align-items-center">
            <span><i className="fa-solid fa-lock" aria-hidden="true"></i></span>
            <input
              {...register('password', { required: 'Password is required' })}
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              aria-label="Password"
              aria-invalid={!!errors.password}
              className="form-control"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="btn p-0 border-0"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
          {errors.password && <div className="text-danger">{errors.password.message}</div>}

          <div className="links d-flex justify-content-between">
            <Link to="/register" className="text-decoration-none text-muted">Register now?</Link>
            <Link to="/forget-pass" className="main-color text-decoration-none">Forgot password?</Link>
          </div>

          <div className="submit-container d-flex justify-content-center my-3">
            <button className="btn bg-main w-75 text-white" >
              {isLoading ? <>Sending <i className="fas fa-spin fa-spinner"></i></> : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
