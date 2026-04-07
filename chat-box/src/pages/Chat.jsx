import React from 'react'

const Chat = () => {

  let arr = Array.from({length : 4})


  return (
    <div className='w-full h-dvh bg-[#091413] flex'>
        <div className='w-100 h-dvh'>
            <h1 className='text-center text-gray-300 text-2xl my-3'>Online Users (17)</h1>
          <div className='my-5 w-91 h-155'>
            <ul className='mx-3 h-150 overflow-y-scroll'>
              {
                arr.map((item, index)=>{
                  return(
                    <li className='my-5 border-b border-gray-700 py-3'>
                <span className='bg-[#B0E4CC] text-center text-4xl inline-block rounded-full h-12 w-12'>J</span>
                <span className='inline-block ms-4 text-2xl text-gray-100'>
                James Joel
                </span>
              </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <div className='w-300 h-dvh bg-[#B0E4CC]'>
            <div className='w-full h-147'></div>
            <div className='w-full h-17'>
              <input type='text' className='ms-5 text-xl rounded-s-xl text-gray-700 my-2 p-3 border border-gray-600  w-230' placeholder='Type Your Message Here ...' />
              <button className='bg-[#091413] py-3.5 hover:bg-[#285A48] px-8 rounded-e-xl text-gray-200 text-xl'>Send</button>
            </div>
        </div>
    </div>
  )
}

export default Chat