import React, { useEffect } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'

const ProtactedRoutes = () => {
    let navigate = useNavigate();
    useEffect(()=>{
        if(! localStorage.getItem("access-token")){
            navigate("/")
        }
    },[])


  return (
    <Outlet />
  )
}

export default ProtactedRoutes