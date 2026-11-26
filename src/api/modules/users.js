import axiosClient from "../axiosCliient.js";

export async function getUsers(params){

  const response = await  axiosClient.get(`/Users`, {params 
  })
  return response ;
}
export async function deleteUser(id){

  const response = await  axiosClient.delete(`/Users/${id}`)
  return response ;
}
export async function changePassword(data){

  const response = await  axiosClient.put(`/Users/ChangePassword` , data)
  return response ;
}
