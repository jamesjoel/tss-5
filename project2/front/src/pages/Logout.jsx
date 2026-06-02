import React, {useContext, useEffect} from 'react'
import AuthContext from '../context/AuthContext'
import {Navigate} from 'react-router-dom'


const Logout = () => {
    let [isLoggedIn, setIsLoggedIn] = useContext(AuthContext)
    useEffect(()=>{
        setIsLoggedIn({
            loggedIn : false,
            name : ""
        })
    },[])
    localStorage.removeItem("access-token")
    localStorage.removeItem("name")


  return (
    <Navigate to="/login" />
  )
}

export default Logout