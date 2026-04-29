import React, { useEffect, useState } from 'react'
import Pro from '../components/Pro'
import axios from 'axios'
const Demo2 = () => {

    let [product, setProduct] = useState([])

    useEffect(()=>{
        axios
        .get("https://dummyjson.com/products")
        .then(response=>{
            setProduct(response.data.products)
        })
    },[])


  return (
    <div className="container my-4">
        <div className="row">
               {
                product.map(item=><Pro item={item} />)
               } 
        </div>
    </div>
  )
}

export default Demo2