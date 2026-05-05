import React from 'react'
import Dashboard from './pages/Dashboard'
import SideBar from './components/SideBar'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import AllRoutes from './routes/AllRoutes'

const App = () => {
  return (
    <>
    <SideBar />
  
  <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <TopBar />
    <AllRoutes />
  <Footer />
  </main>
  
    </>
  )
}

export default App