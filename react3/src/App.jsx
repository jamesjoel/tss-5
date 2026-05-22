import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Student from './pages/Student'
import Header from './components/Header'
import Game from './pages/Game'

const App = () => {

  

  return (
    <>
      <Header />
    <div className='w-full h-dvh bg-gray-400 flex justify-center items-center flex-col'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/student' element={<Student />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </div>
    </>
  )
}

export default App