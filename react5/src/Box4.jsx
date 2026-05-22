import React, {useContext} from 'react'
import InfoContext from './InfoContext'

const Box4 = () => {
  
  let x = useContext(InfoContext)

  return (
    <div style={{backgroundColor : "yellow", height : 300, width : 300}}>
        <h1>Box4</h1>
        <h1>{x[0].name}</h1>
        <h1>{x[0].age}</h1>
    </div>
  )
}

export default Box4