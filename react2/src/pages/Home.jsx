import React from 'react'

const Home = () => {

  let clickHandler = (e)=>{
    console.log("***********", e)
  }
  let demo = (e)=>{
    e.preventDefault()
  }

  return (
    <div className="container my-5">
      <button onClick={(e)=>clickHandler(e)} className='btn btn-info'>OK</button>
      <div onContextMenu={(e)=>demo(e)} style={{height : 200, width : 200, backgroundColor : "#7485AA"}}></div>
    </div>
  )
}

export default Home