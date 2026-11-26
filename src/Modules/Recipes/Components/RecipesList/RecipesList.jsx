import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../SharedComponents/Components/Header/Header.jsx'
import logo from "../../../../assets/images/categoryImg.png"
import noData from "../../../../assets/images/no-data.png"
import ActionCell from '../../../SharedComponents/Components/ActionCell/ActionCell.jsx'
import { addRecipe, deleteRecipe, getRecipes } from '../../../../api/modules/recipes.js';
import NoData from '../../../SharedComponents/Components/NoData/NoData.jsx';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getCategories } from '../../../../api/modules/categories.js'
import { getTags } from '../../../../api/modules/tags.js'
import { AuthContext } from '../../../../context/AuthContext.jsx'
export default function RecipesList() {
const [list, setList] = useState([]);
 const [show, setShow] = useState(false);
 const [item, setItem] = useState({});
const [page, setPage] = useState(1);
  const [numberOfTotalPages, setNumberOfTotalPages] = useState(1);

   const pageSize = 5 ;
 
   const [filters, setFilters] = useState({ name: "", tagId: "", CategoryId: "" });
 const [appliedFilters, setAppliedFilters] = useState({});
 
const [categories, setCategories] = useState([]);
const [tags, setTags] = useState([]);

let {loginData} = useContext(AuthContext)
async function getList(pageNumber = page, currentFilters = appliedFilters) {
  try {

    const response = await getRecipes({ ...currentFilters, pageSize, pageNumber });
    console.log(response)
    setList(response.data.data);
    setNumberOfTotalPages(response.data.totalNumberOfPages);
  } catch (error) {
    console.log(error);
  }
}
function handleChange(e) {
  setFilters({ ...filters, [e.target.name]: e.target.value });
}

function handleSearch(e) {
  e.preventDefault();
  setPage(1);                  // always go back to the first page
  setAppliedFilters(filters);  // triggers the effect
}

function handleReset() {
  const empty = { name: "", tagId: "", categoryId: "" };
  setFilters(empty);
  setPage(1);
  setAppliedFilters(empty);
}
useEffect(() => {
 
 getList(page)
 
}, [page]);

useEffect(() => {
  console.log("hello")
  getList(page, appliedFilters);
}, [page, appliedFilters]);

async function getCategoryItems(pageNumber= 1, pageSize=50){
  try {
    const response =  await getCategories(pageNumber= 1, pageSize=50 )
    console.log("categpories",response.data)
    setCategories(response.data.data)
  } catch (error) {
    console.log(error)
  }


}
async function getTagItems(){
  try {
    const response =  await getTags()
    console.log(response.data)
    setTags(response.data)
  } catch (error) {
    console.log(error)
  }


}


 function setRecipe (item){
  setItem(item)
 }

async function deleteItem(id){
  try {
    const response =  await deleteRecipe(id)
    setShow(false)
    getList()
     toast.success(`successfully deleted ${item?.name}`)
  } catch (error) {
    console.log(error)
  }


}

useEffect(() => {
 
getList();
getCategoryItems();
getTagItems();
 
}, [])

let navigate = useNavigate();
  return <>
  <div className="recipes-container">
    <div className="header-container">
      <Header title = "Recipes Items" desc="You can now add your items that any user can order it from the Application and you can edit" imgUrl={logo}/>
    </div>
    <div className="delete-model">   
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className='border-0 '>
          
        </Modal.Header>
        <Modal.Body className='text-center p-3'>
          <img src={noData} alt="" />
          <h5 className='pt-2'>Delete This Recipe ?</h5>
          <p>are you sure you want to delete {item?.name} ? if you are sure just click on delete it</p>
        </Modal.Body>
        <Modal.Footer className='border-0'>
      
          <Button variant="outline-danger" onClick={() => deleteItem(item.id)}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    <div className="info-container row justify-content-between align-items-center px-4 py-3">
      <div className='col-md-8'>
        <h3>Recipes Table Details</h3>
        <span>You can check all details</span>
      </div>
<div className='col-md-4 mt-4'>
    {loginData.userGroup == "SuperAdmin" ?   <button onClick={()=>navigate("/dashboard/recipe-data/add")} className='btn btn-add'>Add New Recipe</button>:""}
</div>
    </div>
    <div className="table-container  px-4 py-3 table-responsive">
 {list?
  <div>
      <form onSubmit={handleSearch} className="row g-2 py-3">
  <div className="col-md-2">
    <input className="form-control" name="name" placeholder="Search by name"
           value={filters.name} onChange={handleChange} />
  </div>

  <div className="col-md-2">
    <select className="form-select" name="tagId"
            value={filters.tagId} onChange={handleChange}>
              <option value="">any tag</option>
    {tags?.map((tag)=> <option value={tag.id}>{tag.name}</option>)}
    </select>
  </div>
  <div className="col-md-2">
    <select className="form-select" name="categoryId"
            value={filters.categoryId} onChange={handleChange}>
               <option value="">any category</option>
    {categories?.map((category)=> <option value={category.id}>{category.name}</option>)}
    </select>
  </div>
  <div className="col-md-1 d-flex gap-2">
    <button type="submit" className="btn btn-success">Search</button>
    <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>Reset</button>
  </div>
</form>
 <table class="table table-striped table-hover   ">
  <thead className='table-light'>
    <tr>
      <th className='p-3' scope="col">Id</th>
      <th className='p-3' scope="col">Name</th>
      <th className='p-3' scope="col">Image</th>
      <th className='p-3' scope="col">Price</th>
      <th className='p-3' scope="col">Description</th>
      <th className='p-3' scope="col">Tag</th>
      <th className='p-3' scope="col">Category</th>
      <th className='p-3' scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
 {list?.map((item)=>   <tr>
      <td>{item.id}</td>
      <td >{item?.name}</td>

      <td>{item.imagePath?<img className='table-img' src={`https://upskilling-egypt.com:3006/${item.imagePath}`} alt="" />:<img className='table-img' src={noData} alt="" />}</td>

      <td >{item.price}</td>
      <td >{item.description.slice(0,15)}</td>
      <td >{item.tag.name}</td>
      <td>{item.category[0]?.name}</td>
      
   <ActionCell setShow = {setShow}  setItem = {setRecipe} item = {item} type = "recipes"  />
      
    </tr>)}

  </tbody>
</table>
<Pagination className="justify-content-center custom-pagination">
  <Pagination.Prev
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  />

  {[...Array(numberOfTotalPages)].map((_, index) => (
    <Pagination.Item
      key={index + 1}
      active={page === index + 1}
      onClick={() => setPage(index + 1)}
    >
      {index + 1}
    </Pagination.Item>
  ))}

  <Pagination.Next
    disabled={page === numberOfTotalPages}
    onClick={() => setPage(page + 1)}
  />
</Pagination>
 </div>
:<NoData/>}
    </div>

  </div>
  
  </>
}
