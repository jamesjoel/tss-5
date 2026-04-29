import React, { useState } from 'react'
import MyBox from '../components/MyBox'

const Home2 = () => {

    let [temp, setTemp] = useState({})

  return (
    <div className="container">
        <h1>{temp.name}</h1>
        <div className="row">
            <MyBox setTemp={setTemp}/>
            {/* setTemp(user) */}
        </div>
    </div>
  )
}

export default Home2