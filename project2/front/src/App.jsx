import React, { useState } from 'react'
import Header from './component/Header'
import Footer from './component/Footer'
import AllRoutes from './routes/AllRoutes'
import Slider from './component/Slider'
import AuthContext from './context/AuthContext'
const App = () => {
  

  let isLoggedIn = useState({
    isLogged : localStorage.getItem("access-token") ? true : false,
    name : localStorage.getItem("name") ? localStorage.getItem("name") : ""
  })


  return (
    <>
      <AuthContext.Provider value={isLoggedIn}>
        <Header />
        <main className="main">
          <AllRoutes />
        </main>
        <Footer />
      </AuthContext.Provider>

    </>
  )
}

export default App