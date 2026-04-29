import React, { useState } from 'react'
import ProductBox from '../components/ProductBox';

const Help = () => {
  let [x, setX] = useState(100);
  let [y, setY] = useState(100);

  let demo1 = ()=>{
    setX(prev=>prev+1);
    setY(prev=>prev+1);
  }
  let demo2 = ()=>{
    setX(100)
    setY(100)
  }
  
  return (
    <>
    <div onMouseOut={demo2} onMouseMove={demo1} style={{height : x, width : y, backgroundColor : "red"}}></div>  
    <ProductBox />
    </>
  )
}

export default Help

/*



let [name, setName] = useState("rohit");

1. setName("aman")
2. setName(prev=>{

    return "gaurav"
  })

*/