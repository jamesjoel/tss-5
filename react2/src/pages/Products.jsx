import React from 'react'
import { NavLink } from 'react-router-dom'

const Products = () => {
  // js
  let a = "rohit sharma"
  let b = 25
  let products = [
    {
    title : "I-Phone",
    price : 45000,
    category : "Mobile"
    },
    {
      title : "T-Shirt",
      price : 1200,
      category : "Fashion"
    },
    {
      title : "Fridge",
      price : 22500,
      category : "Home Appliance"
    }
]

  let color = ["red", "green", "blue", "yellow", "black", "white"]
  return (
    <>
    <h2>Full Name - {a}</h2>
    <h2>Age - {b}</h2>
    <div className='row'>
      {
        products.map((item)=>{
          return(
            <div className='col-md-2'>
              <div className='card'>
                <div className="card-header">
                  <h5>{item.title}</h5>
                </div>
                <div className="card-body">
                  <p>{item.price}</p>
                  <p>{item.category}</p>
                </div>
                <div className="card-footer">
                  <button className='btn btn-info'>More</button>
                </div>
              </div>
            </div>
          )
        })
      }
      


      {/* {
        color.map((item)=>{
          return(
            <h3>{item}</h3>
          )
        })
      } */}
    </div>
    </>
  )
}

export default Products