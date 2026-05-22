import React, {useContext} from 'react'
import Box3 from './Box3'
import InfoContext from './InfoContext'

const Box2 = () => {
  let x = useContext(InfoContext)

  return (
    <div style={{backgroundColor : "green", height : 500, width : 500}}>
        <h1>Box2</h1>
        <h4>{x[0].name}</h4>
        <h4>{x[0].age}</h4>
        <Box3 />
    </div>
  )
}

export default Box2