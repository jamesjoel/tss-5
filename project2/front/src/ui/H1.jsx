import React, { useState } from 'react'

const H1 = ({txt, color}) => {

    let [c, setC] = useState("#fff")

    let change = ()=>setC(color)
  return (
    <h1 style={{color : c}} onContextMenu={change}>{txt}</h1>
  )
}

export default H1