import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import { getCategories } from '../../../../api/modules/categories.js';
import { getTags } from '../../../../api/modules/tags.js';
import { addRecipe, getRecipe, updateRecipe } from '../../../../api/modules/recipes.js';
import { toast } from 'react-toastify';
import DashboardHeader from '../../../SharedComponents/Components/DashboardHeader/DashboardHeader.jsx';

export default function RecipeData() {
  let {register , formState:{errors} , handleSubmit , reset} =  useForm() ;

const [categories, setCategories] = useState([]);
const [recipe, setRecipe] = useState({});
const [tags, setTags] = useState([]);
async function getCategoryItems(){
  try {
    const response =  await getCategories()
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

let params = useParams();

async function appendFormData(data){
  const formData = new FormData();
   formData.append("name" ,data.name );
   formData.append("price" ,data.price );
   formData.append("description" ,data.description );
   formData.append("tagId" ,data.tagId );
   formData.append("categoriesIds" ,data.categoriesIds );
 if (data.recipeImage && data.recipeImage.length > 0) {
    formData.append("recipeImage", data.recipeImage[0]);
  }else if (recipe.imagePath) {
    
  const res = await fetch(`https://upskilling-egypt.com:3006/${recipe.imagePath}`);
  if (!res.ok) throw new Error("Could not load old image");
  const blob = await res.blob();
  console.log(blob.type, blob.size);   // should be image/jpeg or image/png, size > 0
  const fileName = recipe.imagePath.split("/").pop();
  formData.append("recipeImage", new File([blob], fileName, { type: blob.type }));
}

   return formData
}
   async function onSubmit(data){
try {
  console.log(data)
   const formData = await appendFormData(data)
   if(params.key!="add"){
   const response = await updateRecipe(formData , recipe.id)
   toast.success(response.data.message)
   navigate("/dashboard/recipes")
   }
   else{
       const response = await addRecipe(formData)
   toast.success(response.data.message)
   navigate("/dashboard/recipes")
   }

  console.log(response)
  
} catch (error) {
  console.log(error)
}
   }
  let navigate = useNavigate();
 
  useEffect(() => {
    if(params.key != "add"){
    getUpdateRecipe(params.key)
    }
  getCategoryItems();
  getTagItems();
  }, [])
  
  async function getUpdateRecipe(id){
      try {
          const response = await   getRecipe(id)
        setRecipe(response.data);
        console.log(response.data.category?.[0]?.id)
           reset({
      name: response.data.name,
      price: response.data.price,
      description: response.data.description,
      tagId: response.data.tag?.id,                // adjust to your API shape
      categoriesIds: response.data.category?.[0]?.id, // adjust to your API shape
    });
      
      } catch (error) {
        console.log(error)
      }
  }


  
  return <>
    <div className="recipe-container">
<DashboardHeader/>
      <div className="form-container">
        {params.key == "add" ? <h3 className='m-3 '>Add New Recipe</h3>:<h3>update Recipe</h3>}
        <form onSubmit={handleSubmit(onSubmit)} className='w-75 mx-auto p-4'>
              <div className="input-group my-3">
            <input {...register("name" , {
              required:"name is required"
            })} type="text" className='form-control rounded rounded-2' placeholder='Recipe Name' />
          </div>
              <div className="input-group my-3">
         <select  {...register("tagId" , {
              required:"tag is required"
            })} className='form-control'>
               <option value="" disabled>Choose a tag...</option>
     {tags?.map((tag)=> <option value={tag.id}>{tag.name}</option>)}
   
         </select>
          </div>
          <div className="input-group my-3">
            <input {...register("price" , {
              required:"price is required"
            })} type="number" className='form-control' placeholder='price' />
          </div>
          <div className="input-group my-3">
              <select  {...register("categoriesIds" , {
              required:"name is required"
            })} className='form-control'>
              <option value="" disabled>Choose a category...</option>
       {categories?.map((category)=> <option value={category.id}>{category.name}</option>)}
         </select>
          </div>
          <div className="input-group my-3">
            <textarea {...register("description" , {
              required:"description is required"
            })} className='form-control' placeholder='description'></textarea>
          </div>
          <div className="input-group my-3">
           <input {...register("recipeImage")}   type="file" className='form-control' />
          </div>
     {recipe.imagePath?<img className='table-img my-2' src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`} alt="" />:""}
<div className="btns">
  <button className='btn btn-outline-success mx-2'>Cancel</button>
  <button className='btn btn-success'>Save</button>
</div>
        </form>
      </div>
    </div>
  
  
  </>
}
