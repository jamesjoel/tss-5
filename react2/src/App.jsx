import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Help from './pages/Help'
import Contact from './pages/Contact'
import Demo from './pages/Demo'
import Demo2 from './pages/Demo2'
import Home2 from './pages/Home2'

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
            <Route path='/demo' element={<Demo />} />
            <Route path='/demo2' element={<Demo2 />} />
            <Route path='/home2' element={<Home2 />} />
        </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App