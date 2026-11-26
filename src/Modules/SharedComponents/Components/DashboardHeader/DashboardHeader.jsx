import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function DashboardHeader() {
    let navigate = useNavigate();
  return <>
  
      <div className="recipe-info row justify-content-center align-items-center px-5 py-4 m-3 rounded rounded-3">
        <div className="col-lg-8">
          <h3>Fill the <span className='main-color'>Recipes</span> !</h3>
          <p>you can now fill the meals easily using the table and form , click here and sill it with the table </p>
        </div>
        <div className="col-lg-4">
          <button onClick={()=>navigate("/dashboard/recipes")} className='btn btn-hover bg-main text-white w-75'>All Recipes <i className='fas fa-arrow-right'></i></button>
        </div>

      </div>
  
  
  </>
}
