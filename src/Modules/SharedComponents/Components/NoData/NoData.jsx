import React from 'react'
import noData from "../../../../assets/images/no-data.png"
export default function NoData() {
  return <>
  <div className="no-data-container text-center ">
    <img src={noData} alt="" />
    <h2>No Data !</h2>
    <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
  </div>
  
  </>
}
