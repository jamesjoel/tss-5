import React from 'react'
import Header from './component/Header'
import Footer from './component/Footer'
import AllRoutes from './routes/AllRoutes'
import Slider from './component/Slider'
const App = () => {
  return (
    <>
   <Header />

  <main className="main">
    <AllRoutes />
  </main>

    <Footer />
  

    </>
  )
}

export default App