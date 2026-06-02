import React from 'react'
import {Navigate} from 'react-router-dom'
const Logout = () => {
    localStorage.removeItem(import.meta.env.VITE_ADMIN_ACCESS_TOKEN)
    localStorage.removeItem("admin-name")
  return (
    <Navigate to={"/"}/>
  )
}

export default Logout