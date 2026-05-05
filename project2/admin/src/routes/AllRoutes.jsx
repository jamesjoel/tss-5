import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import ListCuisine from '../pages/cuisine/ListCuisine'
import AddCuisine from '../pages/cuisine/AddCuisine'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/cuisine' element={<ListCuisine />} />
        <Route path='/cuisine/add' element={<AddCuisine />} />
    </Routes>
  )
}

export default AllRoutes