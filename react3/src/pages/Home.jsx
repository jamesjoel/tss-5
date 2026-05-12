import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { addStu } from '../redux/StudentSlice'

const Home = () => {
  let dispatch = useDispatch();
  let data = useSelector(state=>state.StudentReducer)


    let [frm, setFrm]=useState({
    fname : "",
    lname : ""
  })


  let clickHandler = ()=>{
    document.title = "Hello World"
    dispatch(addStu())
    console.log(frm)
  }

  return (
    <>
    <h1 className='text-2xl'>Hello World</h1>
      <br />
      {/*                                     setFrm({ fname : "", lname : "", fname : e.target.value }) */}
      <input value={frm.fname} onChange={(e)=>setFrm({...frm, fname : e.target.value})} type='text' placeholder='First Name' className='border-amber-100 bg-white border-2 p-3 text-xl my-2' />
      <input value={frm.lname}  onChange={(e)=>setFrm({...frm, lname : e.target.value})} type='text' placeholder='Last Name' className='border-amber-100 bg-white border-2 p-3 text-xl my-2' />
      <br />
      {
        data.map(item=><p>{item}</p>)
      }
    <button onClick={clickHandler} className='bg-gray-800 text-white py-2 px-10'>OK</button>
    </>
  )
}

export default Home