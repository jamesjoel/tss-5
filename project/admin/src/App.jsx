import React from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Footer from './components/Footer'
import AllRoutes from './routes/AllRoutes'

const App = () => {
  return (
    <>
    <div className="container-fluid position-relative d-flex p-0">
        <Sidebar />
        <div className="content">
           <Header />
            <AllRoutes />
           <Footer />
        </div>
      </div>
    </>
  )
}

export default App