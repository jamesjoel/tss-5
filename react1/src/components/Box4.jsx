import React, {useContext} from 'react'
import NameContext from '../NameContext'
import NumContext from '../NumContext'

const Box4 = () => {

  let x = useContext(NameContext)

  let m = useContext(NumContext)


  let clickHandler = ()=>{
    m.setX(prev=>prev+1)
  }

  return (
    <div style={{width : 400, height : 200, backgroundColor : "yellow"}}>
            <h1>Box4</h1>
            <button onClick={clickHandler} className='btn btn-lg btn-dark'>Click Me</button>
            
        </div>
  )
}

export default Box4