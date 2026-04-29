import React from 'react'
import { Box2 } from './Box2'

const Box1 = () => {
  return (
    <div style={{width : 1000, height : 800, backgroundColor : "red"}}>
        <h1>Box1</h1>

        <Box2 />
    </div>
  )
}

export default Box1