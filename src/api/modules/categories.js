import axiosClient from "../axiosCliient.js";

export async function getCategories(pageNumber = 1 , pageSize = 5 , name){

  const response = await  axiosClient.get("/Category" , {
    params:{pageNumber , pageSize , name}
  })
  return response ;
}
export async function deleteCategory(id){

  const response = await  axiosClient.delete(`/Category/${id}`)
  return response ;
}
export async function updateCategory(data , id){

  const response = await  axiosClient.put(`/Category/${id}`, data)
  return response ;
}
export async function addCategory(data){

  const response = await  axiosClient.post(`/Category` , data)
  return response ;
}