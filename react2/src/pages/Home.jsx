import React from 'react'
import Box1 from '../components/Box1'
import ProductBox from '../components/ProductBox'

const Home = () => {

  let clickHandler = (e)=>{
    console.log("***********", e)
  }
  let demo = (e)=>{
    e.preventDefault()
  }
  
  let img = "https://s.alicdn.com/@sc04/kf/H908f88de71d443f1ac7601f4d30bc2d0E/iPhone16-for-iPhone-16-New-US-Version-Netcom-5G-Phone-with-Face-Recognition-NFC.jpg_300x300.jpg"
  let title = "I-Phone 17"
  let price = 55000




  return (
    <div className="container my-5">
      <button onClick={(e)=>clickHandler(e)} className='btn btn-info'>OK</button>
      <div onContextMenu={(e)=>demo(e)} style={{height : 200, width : 200, backgroundColor : "#7485AA"}}></div>
      <ProductBox  
        img={img}
        title={title}
        price={price}
       />
    </div>
  )
}

export default Home