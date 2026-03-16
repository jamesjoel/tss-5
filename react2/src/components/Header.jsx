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
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Header