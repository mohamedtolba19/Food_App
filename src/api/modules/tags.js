import axiosClient from "../axiosCliient.js";

export async function getTags(){

  const response = await  axiosClient.get("/tag")
  return response ;
}
