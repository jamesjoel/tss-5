import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
  let [stu, setStu] = useState([])
  useEffect(()=>{
    axios.get("https://tss-5-demo.onrender.com/api/v1/student")
    .then(response=>{
      setStu(response.data)
    })
  },[])

  return (
    <>
    <div className='mx-auto w-300 p-5 bg-gray-300'>
        {
      stu.map(item=><h1 className='text-xl'>{item.name} - {item.age}</h1>)
    }
    
    </div>
    </>
  )
}

export default App