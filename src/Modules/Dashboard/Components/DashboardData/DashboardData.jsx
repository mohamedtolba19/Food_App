import React, { useContext } from 'react'
import headerImg from "../../../../assets/images/headerImg.png"
import Header from '../../../SharedComponents/Components/Header/Header.jsx'
import DashboardHeader from '../../../SharedComponents/Components/DashboardHeader/DashboardHeader.jsx'
import { AuthContext } from '../../../../context/AuthContext.jsx'
export default function DashboardData() {
   
  let {loginData} = useContext(AuthContext)
  return <>
  <div className="dashboard-container">
     <Header title = {`Welcome ${loginData?.userName}`} desc = "This is a welcoming screen for the entry of the application , you can now see the options" imgUrl = {headerImg}/>
  <DashboardHeader/>
  </div>
  
  
  </>
}
