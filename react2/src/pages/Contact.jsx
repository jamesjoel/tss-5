import React, { useState } from 'react'
import ProductBox from '../components/ProductBox'

const Contact = () => {
    let [a, setA] = useState(0)
    let [b, setB] = useState(0)

   

    let demo = ()=>{
   
        let x = Math.floor(Math.random()*1200);
        let y = Math.floor(Math.random()*600);

        setA(y);
        setB(x);

        
    }


  return (
    <div className="container">
        
        <div onMouseOver={demo} style={{height : 150, width : 150, backgroundColor : "#74AFD1", borderRadius : 100, position : "absolute", top : a, left : b}}></div>

        <ProductBox title="MI" price={5000} />
    </div>
  )
}

export default Contact