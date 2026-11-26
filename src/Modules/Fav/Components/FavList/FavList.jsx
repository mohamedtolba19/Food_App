import React, { useEffect, useState } from 'react'
import { deleteFav, getFavs } from '../../../../api/modules/favs.js'
import noData from "../../../../assets/images/recipe.jpg"
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import noDataModel from "../../../../assets/images/no-data.png"
export default function FavList() {

  const [favs, setFavs] = useState([])
   const [show, setShow] = useState(false);
   const [item, setItem] = useState({});

 async function getFavourites(){
  
  try {
     let response = await getFavs();
     console.log(response)
     setFavs(response.data.data)
  } catch (error) {
    console.log(error)
  }
    
  }
 async function deleteFromFav(id){
  
  try {
    console.log(id)
    let response =  await deleteFav(id);
    console.log(response)
     toast.success("deleted")
     getFavourites()
     setShow(false)
  } catch (error) {
    console.log(error)
  }
    
  }

function showModel(fav){
  setItem(fav)
  setShow(true)
}

  useEffect(() => {
  getFavourites();
  }, [])
  
  return (
    <div>
      <div className="favs-container">
            <div className="delete-model">   
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className='border-0 '>
          
        </Modal.Header>
        <Modal.Body className='text-center p-3'>
          <img src={noDataModel} alt="" />
          <h5 className='pt-2'>Delete This item ?</h5>
          <p>are you sure you want to delete {item?.recipe?.name} ? if you are sure just click on delete it</p>
        </Modal.Body>
        <Modal.Footer className='border-0'>
      
          <Button variant="outline-danger" onClick={() => deleteFromFav(item?.id)}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
        <div className="container">
          <div className="row p-4">
           {favs?.map((fav)=><div className='col-md-4 '>
            
<div className='position-relative'>
  <i onClick={()=>showModel(fav)} className='fas fa-heart main-color position-absolute top-0 end-0 p-1 m-1'></i>
  {fav.recipe.imagePath?<img className='img-fluid rounded rounded-3' src={`https://upskilling-egypt.com:3006/${fav.recipe.imagePath}`} alt="" />:<img className='img-fluid rounded rounded-3' src={noData} alt="" />}
  <h6>{fav.recipe.name}</h6>
  <p>{fav.recipe.description}</p>
</div>


           </div>)} 

            
          </div>
        </div>
      </div>
    </div>
  )
}
