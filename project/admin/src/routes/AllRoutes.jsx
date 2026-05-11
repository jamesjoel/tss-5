import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import ListCuisine from '../pages/cuisine/ListCuisine'
import AddCuisine from '../pages/cuisine/AddCuisine'
import AddAmenities from '../pages/amenities/AddAmenities'
import ListAmenities from '../pages/amenities/ListAmenities'
import ListHotels from '../pages/hotels/ListHotels'
import AddHotels from '../pages/hotels/AddHotels'
import Login from '../pages/Login'
import ProtactedRoutes from './ProtactedRoutes'
import Logout from '../pages/Logout'
const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />

      <Route path='' element={<ProtactedRoutes />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/cuisine' element={<ListCuisine />} />
        <Route path='/cuisine/add' element={<AddCuisine />} />
        <Route path='/cuisine/edit/:id' element={<AddCuisine />} />
        <Route path='/amenities' element={<ListAmenities />} />
        <Route path='/amenities/add' element={<AddAmenities />} />
        <Route path='/amenities/edit/:id' element={<AddAmenities />} />
        <Route path='/hotels' element={<ListHotels />} />
        <Route path='/hotels/add' element={<AddHotels />} />
        <Route path='/logout' element={<Logout />} />
      </Route>

    


    </Routes >
  )
}

export default AllRoutes