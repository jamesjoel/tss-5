import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Navigate } from 'react-router-dom'

const ProtactedRoutes = () => {
    if(! localStorage.getItem("admin-access-token"))
        return <Navigate to="/" />
        


  return (
     <div className="container-fluid position-relative d-flex p-0">
         <Sidebar />
         <div className="content">
            <Header />
             <Outlet />
            <Footer />
         </div>
      </div> 
  )
}

export default ProtactedRoutes