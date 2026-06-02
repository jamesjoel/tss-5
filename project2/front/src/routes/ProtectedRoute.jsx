import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
let ProtectedRoute = ()=>{
  let navigate = useNavigate();
  useEffect(()=>{
    if(! localStorage.getItem("access-token")){
        navigate("/login")
    }
  },[])


  return(
    <>
    <Outlet />
    </>
  )
}

export default ProtectedRoute