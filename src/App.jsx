import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "./Modules/SharedComponents/Components/AuthLayout/AuthLayout"
import Notfound from "./Modules/SharedComponents/Components/Notfound/Notfound"
import Login from "./Modules/Authentication/Components/Login/Login"
import Register from "./Modules/Authentication/Components/Register/Register"
import ForgetPass from "./Modules/Authentication/Components/ForgetPass/ForgetPass"
import ResetPass from "./Modules/Authentication/Components/ResetPass/ResetPass"
import MasterLayout from "./Modules/SharedComponents/Components/MasterLayout/MasterLayout"
import DashboardData from "./Modules/Dashboard/Components/DashboardData/DashboardData"
import RecipesList from "./Modules/Recipes/Components/RecipesList/RecipesList"
import RecipeData from "./Modules/Recipes/Components/RecipeData/RecipeData"
import CategoriesList from "./Modules/Categories/Components/CategoriesList/CategoriesList"
import FavList from "./Modules/Fav/Components/FavList/FavList"
import FavData from "./Modules/Fav/Components/FavData/FavData"
import UsersList from "./Modules/Users/Components/UsersList/UsersList"
import UserData from "./Modules/Users/Components/UserData/UserData"
import { ToastContainer } from "react-toastify"
import VerifyAcount from "./Modules/Authentication/Components/VerifyAccount/VerifyAccount"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import ProtectedRoute from "./Modules/SharedComponents/Components/ProtectedRoute/ProtectedRoute.jsx"
import AuthContextProvider from "./context/AuthContext.jsx"
import AuthGuard from "./Modules/SharedComponents/Components/AuthGuard/AuthGuard.jsx"



function App() {



let routes = createBrowserRouter([
  {
    path:"",
    element:<AuthLayout/>,
    errorElement:<Notfound/>,
    children:[
      
      {index:true , element:<AuthGuard><Login /></AuthGuard>},
      {path:"login" , element:<AuthGuard><Login /></AuthGuard>},
      {path:"register" , element:<AuthGuard><Register/></AuthGuard>},
      {path:"forget-pass" , element:<AuthGuard><ForgetPass/></AuthGuard>},
      {path:"verify-account" , element:<AuthGuard><VerifyAcount/></AuthGuard>},
      {path:"reset-pass" , element:<AuthGuard><ResetPass/></AuthGuard>},
     
    ]



  },
    {
    path:"/dashboard",
    element:<MasterLayout/>,
    errorElement:<Notfound/>,
    children:[
      {index:true , element:<ProtectedRoute><DashboardData/></ProtectedRoute>},
      {path:"recipes" , element:<ProtectedRoute><RecipesList/></ProtectedRoute> },
      {path:"recipe-data/:key" , element:<ProtectedRoute><RecipeData/></ProtectedRoute>},
      {path:"categories" , element:<ProtectedRoute><CategoriesList/></ProtectedRoute>},
      {path:"fav-list" , element:<ProtectedRoute><FavList/></ProtectedRoute>},
      {path:"fav-data" , element:<ProtectedRoute><FavData/></ProtectedRoute>},
      {path:"users" , element:<ProtectedRoute><UsersList/></ProtectedRoute>},
      {path:"user-data" , element:<ProtectedRoute><UserData/></ProtectedRoute>},
    
      
     
    ]



  }
])





  return <>
  <AuthContextProvider>

<ToastContainer/>
  <RouterProvider router={routes}>
      
  </RouterProvider>
  

  </AuthContextProvider>
    
  </>

}
export default App
