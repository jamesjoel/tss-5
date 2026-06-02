import React, { useEffect } from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
const ProtectedRoutes = () => {
    let navigate = useNavigate();
    useEffect(()=>{
        if(! localStorage.getItem(import.meta.env.VITE_ADMIN_ACCESS_TOKEN)){
            navigate("/")
            return;
        }
    },[])
  return (
    <>
    <SideBar />
  
  <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <TopBar />
    <Outlet />
  <Footer />
  </main> 
    </>
  )
}

export default ProtectedRoutes