import React from 'react'

const MyBox = ({setTemp}) => {
    let user = {
        name : "rohit",
        age : 25
    }
  return (
    <div className="col-md-5 m-5" style={{height : 300, width : 300, backgroundColor : "#745210"}}>
        <br />
        <br />
        <button onClick={()=>setTemp(user)} className='btn btn-light'>ok</button>
    </div>
  )
}

export default MyBox