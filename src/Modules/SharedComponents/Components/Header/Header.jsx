import React from 'react'

export default function Header({title, desc , imgUrl}) {
  return <>
  <div className="header-container pt-5  p-md-3 m-md-3">
    <div className="container">
      <div className="row">
        <div className="  col-md-8 d-flex justify-content-start  text-white">
       <div className="content-container">
           <h2>{title}</h2>
          <p className='lead'>{desc}</p>
       </div>
        </div>
        <div className=" col-md-4">
          <img src={imgUrl} alt="header-img" className='img-fluid'/>
        </div>
      </div>
    </div>
  </div>
  
  
  </>
}
