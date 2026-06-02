import React from 'react'

const ProfileSideBar = () => {
  return (
    <div className="col-md-2">
                        <ul className='nav flex-column p-3 side-nav' style={{ border: "1px solid #47443f", borderRadius: 5 }}>
                            <li className='nav-item'>
                                <a href='' className='nav-link p-3'>My Profile</a>
                            </li>
                            <li className='nav-item'>
                                <a href='' className='nav-link p-3'>Comments</a>
                            </li>
                            <li className='nav-item'>
                                <a href='' className='nav-link p-3'>Favourite</a>
                            </li>
                            <li className='nav-item'>
                                <a href='' className='nav-link p-3'>My Donations</a>
                            </li>
                            <li className='nav-item'>
                                <a href='' className='nav-link p-3'>Settings</a>
                            </li>
                            <li className='nav-item'>
                                <a href='' className='nav-link p-3'>Logout</a>
                            </li>


                        </ul>
                    </div>
  )
}

export default ProfileSideBar