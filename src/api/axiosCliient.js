import axios from "axios";

 let axiosClient = axios.create({
    baseURL :"https://upskilling-egypt.com:3006/api/v1/"
})

axiosClient.interceptors.request.use((config)=>{

    let token = localStorage.getItem("token");
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
} ,
(error)=>{
    Promise.reject(error)
}
)

export default axiosClient