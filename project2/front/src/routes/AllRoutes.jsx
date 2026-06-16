import React, { useEffect } from 'react'
import {Routes, Route, Outlet, useNavigate} from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import About from '../pages/About'
import Logout from '../pages/Logout'
import MyProfile from '../pages/MyProfile'
import ProtectedRoute from './ProtectedRoute'
import ChangePassword from '../pages/ChangePassword'
import ForgotPassword from '../pages/ForgotPassword'
import Otp from '../pages/Otp'
import PasswordUpdate from '../pages/PasswordUpdate'
import Detail from '../pages/Detail'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/otp' element={<Otp />} />
        <Route path='/passwordupdate' element={<PasswordUpdate />} />

        <Route path='' element={<ProtectedRoute />}>
          <Route path='/changepassword' element={<ChangePassword />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/logout' element={<Logout />} />

        </Route>        


    </Routes>
  )
}

export default AllRoutes




