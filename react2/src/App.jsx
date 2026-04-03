import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Help from './pages/Help'
import Contact from './pages/Contact'

const App = () => {
  return (
    <>
    <Header />
    <div className='container' style={{minHeight : "750px"}}>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/about' element={<About />} />
            <Route path='/help' element={<Help />} />
            <Route path='/contact' element={<Contact />} />
        </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App