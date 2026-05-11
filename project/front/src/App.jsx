import React, { useState } from 'react'
import Header from './components/Header'
import AllRoutes from './routes/AllRoutes'
import Footer from './components/Footer'

import AuthContext from './context/AuthContext'

const App = () => {
  let obj = { 
      isToken :  localStorage.getItem("access-token") ? true : false,
      name : localStorage.getItem("name") ? localStorage.getItem("name") : ""
    }
  let isLoggedIn = useState(obj)
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