import React, { useContext, useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from "../../../../assets/images/sidebarImg.png"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext.jsx';
import Button from 'react-bootstrap/Button';
import passwordLogo from "../../../../assets/images/logo.png"
import Modal from 'react-bootstrap/Modal';
import { changePassword } from '../../../../api/modules/users.js';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
export default function SidebarComponent() {
const [showOldPassword, setShowOldPassword] = useState(false)
const [showNewPassword, setShowNewPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)
let {register , formState:{errors} , handleSubmit , getValues} =  useForm()
  const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false)

    let {loginData , setLoginData } = useContext(AuthContext)
  function toggleCollapsed(){
    setIsCollapsed(!isCollapsed)
  }

  let nav = useNavigate();
  const deleteUserData = ()=>{
  
 setLoginData(null);
 localStorage.removeItem("token")
 nav("/login")
 

}

  async function onSubmit(data){
    
    try {
  setIsLoading(true)
     await changePassword(data);
     toast.success("Password changed Successfully")
     setShow(false)
  
      
    } catch (error) {
          const message = error.response
            ? 'invalid password'
            : 'Network error, please try again'
          toast.error(message)
        } finally {
          setIsLoading(false)
        }
  
  }

    useEffect(() => {

    const mediaQuery = window.matchMedia('(max-width: 991.98px)')

    
    setIsCollapsed(mediaQuery.matches)

   
    const handleChange = (e) => setIsCollapsed(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return <>
  <div className="sidebar-container d-flex">
       <div className="change-password-model">
        <Modal show={show} onHide={() => setShow(false)} centered>
         <Modal.Header closeButton className='border-0'>
         
          </Modal.Header>
          <Modal.Body>

            <div className="change-password-container ">
          <div className="logo-container text-center">
                <img  src={passwordLogo} className=' w-50' alt="logo" />
          </div>
           <div className="info p-2">
            <h3 className='m-0'>Change Your Password</h3>
            <span className='m-0 text-muted fs-6'>Enter your details below</span>
           </div>
          <form onSubmit={handleSubmit(onSubmit)} >
         
           
          <div className="input-group mt-3  px-2 rounded rounded-1  d-flex justify-content-center align-items-center">
<span><i className="fa-solid fa-lock"></i></span>
<input {...register("oldPassword" , {
  required:"oldPassword is required" ,
   pattern: {
        value: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{4,15}$/,
    message:
      "Password must be 4-9 characters and contain at least one uppercase letter and one symbol",
    },
})}  type={showOldPassword?"text":"password"} className='form-control' placeholder='Enter your old Password' />
{!showOldPassword?<i onClick={()=>setShowOldPassword(true)} className="fas fa-eye"></i>:<i  onClick={()=>setShowOldPassword(false)} className="fas fa-eye-slash"></i>}
           </div>
              {errors.oldPassword?<div className='text-danger '>{errors.oldPassword.message}</div>:""}
          <div className="input-group mt-3  px-2 rounded rounded-1  d-flex justify-content-center align-items-center">
<span><i className="fa-solid fa-lock"></i></span>
<input {...register("newPassword" , {
  required:"newPassword is required" ,
   pattern: {
        value: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{4,15}$/,
    message:
      "Password must be 4-9 characters and contain at least one uppercase letter and one symbol",
    },
})}  type={showNewPassword?"text":"password"} className='form-control' placeholder='Enter your newPassword' />
{!showNewPassword?<i onClick={()=>setShowNewPassword(true)} className="fas fa-eye"></i>:<i  onClick={()=>setShowNewPassword(false)} className="fas fa-eye-slash"></i>}
           </div>
              {errors.newPassword?<div className='text-danger '>{errors.newPassword.message}</div>:""}
              <div className="input-group mt-3  px-2 rounded rounded-1  d-flex justify-content-center align-items-center">
<span><i className="fa-solid fa-lock"></i></span>
<input {...register("confirmNewPassword" , {
  required:"confirm password is required" ,
 
    validate :(value)=>
      value === getValues("newPassword") || "passwords do not match"
    
    
})}  type={showConfirmPassword?"text":"password"} className='form-control' placeholder='confirm your password' />
          {!showConfirmPassword?<i onClick={()=>setShowConfirmPassword(true)} className="fas fa-eye"></i>:<i  onClick={()=>setShowConfirmPassword(false)} className="fas fa-eye-slash"></i>}
           </div>
              {errors.confirmNewPassword?<div className='text-danger'>{errors.confirmNewPassword.message}</div>:""}
          <div className='submit-container d-flex justify-content-center my-3'>
             {isLoading?<button className='btn bg-main w-75 text-white '>Sending <i className='fas fa-spin fa-spinner'></i></button>:<button className='btn bg-main w-75 text-white '>Submit</button>}
          </div>
            </form>
             </div>
          </Modal.Body>
        </Modal>
      </div>
<Sidebar collapsed={isCollapsed}>
  <Menu>
    <div onClick={toggleCollapsed} className='text-center p-3'>
      <img className='img-fluid' src={logo} alt="sidebar-img" />
    </div>
    <MenuItem component={<Link to = "/dashboard"></Link>} icon = {<i className="fa-regular fa-house"></i>}>  Home </MenuItem>
    <MenuItem component={<Link to = "/dashboard/recipes"></Link>} icon = {<i className="fa-solid fa-table-list"></i>}> Recipes </MenuItem>
{loginData.userGroup=="SuperAdmin"?<>
    <MenuItem component={<Link to = "/dashboard/users"></Link>} icon = {<i className="fa-solid fa-user-group"></i>}> Users </MenuItem>
     <MenuItem component={<Link to = "/dashboard/categories"></Link>} icon = {<i className="fa-solid fa-table-cells-large"></i>}> Categories </MenuItem>
</>:  <>
 <MenuItem component={<Link to = "/dashboard/fav-list"></Link>} icon = {<i className="fa-solid fa-table-cells-large"></i>}> Favourites </MenuItem>
 <MenuItem  onClick={() => setShow(true)} icon = {<i className="fa-solid fa-unlock"></i>}> Change Password </MenuItem>
</>
}
    
   
   
    <MenuItem onClick={()=>deleteUserData()}  icon = {<i className="fa-solid fa-arrow-right-from-bracket"></i>}> Logout </MenuItem>
  </Menu>
</Sidebar>
  </div>
  
  
  </>
}
