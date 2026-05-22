import React from 'react'


// let {info} = {info : { name : "sa"}}

const Box = ({info}) => {
  return (
    <div style={{height : 200, width : 200, backgroundColor : "red"}}>
        <img src={info.src} style={{height : 100, width : 100}} />
        <h1>{info.name}</h1>
        <h5>{info.price}</h5>
    </div>
  )
}

export default Box

/*
De-structruing in Object

let { y, x } = { x : "red", y : "blue"}



*/