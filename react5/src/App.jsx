import React, { useState } from 'react'
import Box1 from './Box1'
import InfoContext from './InfoContext';

const App = () => {

  let obj = useState({
    name : "rohit",
    age : 25
  })

  return (
    <>
    <InfoContext.Provider value={obj}>
        <Box1 />
    </InfoContext.Provider>

    </>
  )
}

export default App

/*

let [x, setX] = useState(10)


let arr = useState(10);
let x = arr[0]
let setX = arr[1]



*/
