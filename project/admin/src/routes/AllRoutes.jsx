import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import ListCuisine from '../pages/cuisine/ListCuisine'
import AddCuisine from '../pages/cuisine/AddCuisine'
import AddAmenities from '../pages/amenities/AddAmenities'
import ListAmenities from '../pages/amenities/ListAmenities'
import ListHotels from '../pages/hotels/ListHotels'
import AddHotels from '../pages/hotels/AddHotels'
const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/cuisine' element={<ListCuisine />} />
        <Route path='/cuisine/add' element={<AddCuisine />} />
        <Route path='/amenities' element={<ListAmenities />} />
        <Route path='/amenities/add' element={<AddAmenities />} />
        <Route path='/amenities/edit/:id' element={<AddAmenities />} />
        <Route path='/hotels' element={<ListHotels />} />
        <Route path='/hotels/add' element={<AddHotels />} />
    </Routes>
  )
}

export default AllRoutes