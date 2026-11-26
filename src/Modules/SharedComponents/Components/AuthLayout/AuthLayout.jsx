import React from 'react'
import logo from "../../../../assets/images/logo.png"
import { Outlet } from 'react-router-dom'
export default function AuthLayout() {
  return <>
  <div className="auth-container vh-100">
    <div className="container-fluid bg-overlay py-md-5 vh-100">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-10 col-lg-8 container-auth bg-white rounded rounded-3 px-4 py-3 ">
          <div className="logo-container text-center">
            <img className='w-50 ' src={logo} alt="logo" />
          </div>
      
          <div>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  </>
}
