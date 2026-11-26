import axiosClient from "../axiosCliient.js";

export async function getRecipes(params){

  const response = await  axiosClient.get("/Recipe" , {params})
  return response ;
}
export async function getRecipe(id){

  const response = await  axiosClient.get(`/Recipe/${id}`)
  return response ;
}
export async function deleteRecipe(id){

  const response = await  axiosClient.delete(`/Recipe/${id}`)
  return response ;
}
export async function addRecipe(data){

  const response = await  axiosClient.post(`/Recipe` , data)
  return response ;
}
export async function updateRecipe(data , id){

  const response = await  axiosClient.put(`/Recipe/${id}` , data)
  return response ;
}