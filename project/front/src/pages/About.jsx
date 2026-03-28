import React, { useEffect, useState } from 'react'
import axios from 'axios'

const About = () => {
  let [product, setProduct] = useState([])

  let [loading, setLoading] = useState(false)


  useEffect(()=>{
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        console.log(response.data.products)
        setProduct(response.data.products)
        setLoading(false)
      })
  },[])



  let getData = () => {
    setLoading(true)
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        console.log(response.data.products)
        setProduct(response.data.products)
        setLoading(false)
      })
  }

  return (
    <div className="container my-5" style={{ minHeight: 500 }}>
      <div className="row">
        <div className="col-md-12">
          

          
          <div className="row">
            {
              product.map(item => {
                return (
                  <div className="col-md-3">
                    <div className="card m-2">
                      <div className="card-header bg-info" style={{height : 80}}>
                        <h6>{item.title}</h6>
                      </div>
                      <div className="card-body">
                        <img src={item.images[0]} style={{width : "100%", height : 200}} />
                      </div>
                      <div className="card-footer">
                        <p>Price : {item.price}</p>
                        <button className='btn btn-info btn-sm'>Buy</button>
                      </div>
                    </div>
                  </div>
                )
              })
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default About