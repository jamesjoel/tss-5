import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'

const App = () => {
  return (
    <>
    <Header />
    <div className='container' style={{minHeight : "750px"}}>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
        </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App