import React from 'react'
import {Routes, Route, Outlet} from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Detail from '../pages/Detail'
import ViewAll from '../pages/ViewAll'
import Profile from '../pages/user/Profile'
import Logout from '../pages/user/Logout'
import ProtactedRoutes from './ProtactedRoutes'
const AllRoutes = () => {
  return (
    <Routes>

        

          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        



        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/view-all' element={<ViewAll />} />

        <Route path='' element={<ProtactedRoutes />}>

              <Route path='/profile' element={<Profile />} />
              <Route path='/logout' element={<Logout />} />
        </Route>

    </Routes>
  )
}

export default AllRoutes

