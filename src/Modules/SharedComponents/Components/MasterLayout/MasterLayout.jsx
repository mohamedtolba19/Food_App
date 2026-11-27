import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import SidebarComponent from '../SidebarComponent/SidebarComponent'

export default function MasterLayout() {
  return <>
  <div className="master-container d-flex">
    <SidebarComponent/>
    <div className="w-100">
      
     
      <Outlet/>
    </div>
  </div>
  
  </>
}
