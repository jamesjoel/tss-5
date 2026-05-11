import React from 'react'
import { Navigate } from 'react-router-dom'
const Logout = () => {
    localStorage.removeItem("admin-access-token")
    localStorage.removeItem("admin-name")
    localStorage.removeItem("admin-type")

  return (
    <Navigate to="/" />
  )
}

export default Logout