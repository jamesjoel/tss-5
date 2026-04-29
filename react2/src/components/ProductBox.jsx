import React from 'react'

const ProductBox = (info) => {
  return (
    <div style={{border : "1px solid red", padding : 15, height : 200, width : 150}}>
        <img style={{height : 100, width : 100}} src={info.img ? info.img : 'https://cdn1.smartprix.com/rx-i8TxMmUVY-w1200-h1200/8TxMmUVY.webp'} />
        <h3>{info.title ? info.title : "Sony"}</h3>
        <h5>{info.price ? info.price : 10000}</h5>
    </div>
  )
}

export default ProductBox