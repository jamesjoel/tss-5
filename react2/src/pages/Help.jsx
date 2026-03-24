import React, { useState } from 'react'

const Help = () => {
  let [num, setNum] = useState(10);
  let demo = ()=>{
    // setNum(20)
    setNum(prev=>prev+10)
  }

  let demo2 = ()=>{
    setNum(prev=>prev-10)
  }
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-12">
          <button style={{ width : num+"px"}} onClick={demo} className='btn btn-info btn-lg'>{num}</button>
          <br />
          <br />
          <button onClick={demo2} className='btn btn-danger btn-lg'>{num}</button>
          {/* <h1>{num}</h1> */}
        </div>
      </div>
    </div>
  )
}

export default Help

/*



let [name, setName] = useState("rohit");

1. setName("aman")
2. setName(prev=>{

    return "gaurav"
  })

*/