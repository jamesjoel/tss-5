import React, {useContext} from 'react'
import Box2 from './Box2'
import InfoContext from './InfoContext'
const Box1 = () => {
  
  let x = useContext(InfoContext)

  let demo = ()=>{
    x[1]({ name : "amar", age : 25})
  }

  return (
    <div style={{backgroundColor : "red", minHeight : 600, width : 600}}>
        <h1>Box1</h1>
        <button onClick={demo}>OK</button>
        <Box2 />
    </div>
  )
}

export default Box1