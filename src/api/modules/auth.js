import axiosClient from "../axiosCliient.js";

export async function login(data){
  let response =  await axiosClient.post(`Users/Login` , data);
  return response 
}

export async function register(data){
  let response =  await axiosClient.post(`Users/Register` , data);
  return response 
}

export async function forgetPass(data){
  let response =  await axiosClient.post(`Users/Reset/Request` , data);
  return response 
}

export async function verifyPass(data){
  let response =  await axiosClient.put(`Users/verify` , data);
  return response 
}
export async function resetPass(data){
  let response =  await axiosClient.post(`Users/Reset` , data);
  return response 
}