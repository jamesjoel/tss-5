import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar bg-dark navbar-expand-sm navbar-dark">
        <div className="container">
            <a className='navbar-brand'>My Project</a>
            <button className='navbar-toggler' data-bs-toggle="collapse" data-bs-target="#menu">
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='menu'>
                <ul className='nav navbar-nav'>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/'>Home</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/products'>Products</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/contact'>Contact</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/about'>About</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/help'>Help</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/demo'>Demo</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/demo2'>Demo2</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/home2'>Home2</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/fileupload'>File Uplaod</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Header