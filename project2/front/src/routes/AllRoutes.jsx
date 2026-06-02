import React, { useEffect } from 'react'
import {Routes, Route, Outlet, useNavigate} from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import About from '../pages/About'
import Logout from '../pages/Logout'
import MyProfile from '../pages/MyProfile'
import ProtectedRoute from './ProtectedRoute'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />

        <Route path='' element={<ProtectedRoute />}>
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/logout' element={<Logout />} />

        </Route>        


    </Routes>
  )
}

export default AllRoutes




