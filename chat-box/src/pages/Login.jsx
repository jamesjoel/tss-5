import React from 'react'

const Login = () => {
  return (
    <div className='w-full h-dvh bg-[#091413] pt-30'>
        <div className='w-250 mx-auto h-100  flex'>
            <div className='w-125 h-100 '>
                <div className='flex flex-col items-center justify-center w-100 h-90 bg-gray-200 rounded-3xl'>
                    <h1 className='text-3xl font-bold text-gray-700 mb-4'>Login</h1>
                    <input type='text' className='my-3 border border-gray-400 w-70 bg-gray-300 py-3 px-5 rounded-2xl' placeholder='Username' />
                    <input type='password' className='my-3 border bg-gray-300 w-70 border-gray-400 py-3 px-5 rounded-2xl' placeholder='Password' />
                    <button className='bg-[#408A71] py-3 w-70 mt-3 text-xl text-white rounded-2xl cursor-pointer hover:bg-[#285A48]'>Sign-In</button>
                </div>
            </div>
            <div className='w-125 h-100 '>
                <h1 className='text-gray-400 text-5xl mt-15'>Messenger</h1>
                <p className='text-gray-400 mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque cupiditate quod, provident odit adipisci exercitationem eaque dolorem natus accusantium eligendi aperiam voluptate neque harum, fugit soluta ipsa ut nulla maxime ad modi quisquam unde eveniet. Esse, delectus sequi. Perspiciatis dolorum molestias assumenda culpa ex quos rem dolores, sint in. Repellat.</p>
            </div>
        </div>
    </div>
  )
}

export default Login