import React from 'react'

const Header = () => {
  return (
    <div className='w-full h-22 flex justify-center'>
        <div className='h-22 w-200 fixed bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.8))] my-5 rounded-2xl py-2 px-10 mx-auto flex justify-between'>
            <div className='h-22 w-50 flex flex-col cursor-pointer items-center justify-center '>
                <h1 className='text-white text-3xl'><span className='bg-white py-1 px-2 text-black rounded-md'>M</span>edi<span className='bg-white text-black py-1 px-2 rounded-md'>C</span>aps</h1>
                <p className='text-white text-sm mt-2'>Best University in Rau</p>
            </div>
            <div className='h-22 w-200 '>
                <ul className='flex h-22 items-center'>
                    <li>
                        <a href='' className='py-3 px-5  rounded-md hover:bg-black hover:text-white mx-3'>Home</a>
                    </li>
                    <li>
                        <a href='' className='py-3 px-5  rounded-md hover:bg-black hover:text-white mx-3'>Home</a>
                    </li>
                    <li>
                        <a href='' className='py-3 px-5  rounded-md hover:bg-black hover:text-white mx-3'>Home</a>
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Header