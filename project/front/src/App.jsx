import React, { useState } from 'react'
import Header from './components/Header'
import AllRoutes from './routes/AllRoutes'
import Footer from './components/Footer'

import AuthContext from './context/AuthContext'

const App = () => {
  let isLoggedIn = useState(localStorage.getItem("access-token") ? true : false)
  // [false, fn]


  return (
    <>
    <AuthContext.Provider value={isLoggedIn}>
      <Header />
      <AllRoutes />
      <Footer />
    </AuthContext.Provider>
    </>
  )
}

export default App