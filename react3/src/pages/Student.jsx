import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { delStu } from '../redux/StudentSlice'; 
const Student = () => {
  let dispatch = useDispatch();
  let stu = useSelector(state=>state.StudentReducer)

  let delHandler = (fname)=>{
    dispatch(delStu(fname))
  }
  return (
    <div>
      <table className='w-150 border-2 text-xl'>
      <thead>
        <tr className='border-2'>
          <th className='border-2'>#</th>
          <th className='border-2'>Name</th>
          <th className='border-2'>Last</th>
          <th className='border-2'>Del</th>
        </tr>
      </thead>
      <tbody>

      {
        stu.map((item, index)=><tr className='border-2'>
          <td  className='border-2'>{index+1}</td>
          <td className='border-2' > {item.fname}</td>
          <td className='border-2'>{item.lname}</td>
          <td><button onClick={()=>delHandler(item.fname)} className='bg-red-500 text-white py-1 px-2 m-1'>Del</button></td>
        </tr>
        )
      }
      </tbody>
      </table>
    </div>
  )
}

export default Student