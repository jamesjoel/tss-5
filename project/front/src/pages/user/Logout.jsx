import React, {useContext} from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
const Logout = () => {
    let [loggedIn, setLoggedIn] = useContext(AuthContext);
    localStorage.removeItem("access-token")
    setLoggedIn(false)

  return (
    <Navigate to="/login" />
  )
}

export default Logout