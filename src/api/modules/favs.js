import axiosClient from "../axiosCliient.js";


export async function addToFav(data){

  const response = await  axiosClient.post(`/userRecipe` , data)
  return response ;
}
export async function getFavs(data){

  const response = await  axiosClient.get(`/userRecipe` )
  return response ;
}
export async function deleteFav(id){

  const response = await  axiosClient.delete(`/userRecipe/${id}`)
  return response ;
}
