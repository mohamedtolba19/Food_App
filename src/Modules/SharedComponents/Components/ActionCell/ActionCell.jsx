import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext.jsx'
import { addToFav } from '../../../../api/modules/favs.js'
import { toast } from 'react-toastify'

export default function ActionCell({setShow ,setShowEdit, setItem , item , type}) {
const [isClicked, setIsClicked] = useState(false)
const [isLoading, setIsLoading] = useState(false)
 let {loginData} = useContext(AuthContext)
  function toggleClick(){
    setIsClicked(!isClicked)
  }

  async function addFav(id){
 try {
  setIsLoading(true)
   await  addToFav({
      recipeId : id
    })
    setIsLoading(false)
    toast.success("added to fav")
 } catch (error) {
  toast.error(error)
 }

  }
  return (
     <td className='position-relative'>
        <i onClick={toggleClick} class="fa-solid fa-ellipsis"></i>
   <div className={`bg-white action-cell d-flex  align-items-center rounded rounded-3 position-absolute top-0 end-0 z-3 py-2  ${isClicked == true?"d-block" :"d-none"}`  }>
    <i  onClick={toggleClick} class="fa-regular fa-circle-xmark main-color position-absolute top-0 end-0 px-4 py-2"></i>
{loginData.userGroup == "SuperAdmin" ?   <div className='ps-3'>
    
   
   {type == "categories"? <div  onClick={()=>{setShowEdit(true) , setItem(item), toggleClick()} }><i className="fa-solid fa-square-pen main-color py-2 "></i> <span className='ms-1'>Edit</span></div>:"" }
   {type == "recipes"? <Link className=' ' to = {`/dashboard/recipe-data/${item.id}`}><div><i className="fa-solid fa-square-pen main-color py-2 "></i> <span className='ms-1'>Edit</span></div></Link>:"" }
    <div onClick={()=>{setShow(true) , setItem(item), toggleClick()} } ><i className="fa-solid fa-trash-can main-color py-2 "></i> <span className='ms-1'>Delete</span></div>
  </div>:<div className='p-3' onClick={()=>addFav(item.id)}>{isLoading?<>
  <i className="fas fa-spin fa-spinner main-color py-2 "></i> <span className='ms-1'>Adding  </span>
  </>:<>
  <i className="fas fa-heart main-color py-2 "></i> <span className='ms-1'>Add To Fav</span>
  </>}</div>
  }
   </div>

      </td>
  )
}
