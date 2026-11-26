import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext();

export default function AuthContextProvider(props){

  const [loginData, setLoginData] = useState({});

    function saveUserData(){

       if(localStorage.getItem("token")){
          
        let encodedToken = localStorage.getItem("token");
        let decodedToken = jwtDecode(encodedToken);
       
        setLoginData(decodedToken)
        
       }


    }


  

        useEffect(() => {
          
        saveUserData();
          
        }, [])

return <AuthContext.Provider value={{loginData , saveUserData , setLoginData}}>
{props.children}

</AuthContext.Provider>


}