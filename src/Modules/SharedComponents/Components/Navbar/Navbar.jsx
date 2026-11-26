import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext.jsx';

export default function Navbar() {
let navigate = useNavigate();
  const logOut = ()=>{
  
    localStorage.removeItem("token");
    setLoginData(null)
    navigate("/")
  
  }
  let {loginData} = useContext(AuthContext)

  return <>
  
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="#">{loginData?.userName}</a>
        </li>
     
       
      </ul>
   
    </div>
  </div>
</nav>
  
  
  </>
}
