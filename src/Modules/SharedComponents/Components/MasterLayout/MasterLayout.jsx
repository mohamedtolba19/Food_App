import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import SidebarComponent from '../SidebarComponent/SidebarComponent'

export default function MasterLayout({loginData , setLoginData , deleteUserData}) {
  return <>
  <div className="master-container d-flex">
    <SidebarComponent deleteUserData = {deleteUserData}/>
    <div className="w-100">
      <Navbar loginData = {loginData } setLoginData = {setLoginData}/>
     
      <Outlet/>
    </div>
  </div>
  
  </>
}
