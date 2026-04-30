import React from 'react'
import {NavLink} from 'react-router-dom'

const Header = () => {
  return (
     <header id="header" className="header fixed-top">

    <div className="topbar d-flex align-items-center">
      <div className="container d-flex justify-content-center justify-content-md-between">
        <div className="contact-info d-flex align-items-center">
          <i className="bi bi-envelope d-flex align-items-center"><a href="mailto:contact@example.com">contact@example.com</a></i>
          <i className="bi bi-phone d-flex align-items-center ms-4"><span>+1 5589 55488 55</span></i>
        </div>
        
      </div>
    </div>

    <div className="branding d-flex align-items-cente">

      <div className="container position-relative d-flex align-items-center justify-content-between">
        <a href="index.html" className="logo d-flex align-items-center me-auto me-xl-0">
          
          <h1 className="sitename">Restaurantly</h1>
        </a>

        <nav id="navmenu" className="navmenu d-flex justify-content-center" style={{width : "100%"}}>
          <ul className=''>
            <li><NavLink to="/">Home<br/></NavLink></li>
            <li><a href="#hero">About<br/></a></li>
            <li><a href="#contact">Contact</a></li>
            
            
            {/* <li className="dropdown"><a href="#"><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
              <ul>
                <li><a href="#">Dropdown 1</a></li>
                <li className="dropdown"><a href="#"><span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                  <ul>
                    <li><a href="#">Deep Dropdown 1</a></li>
                    <li><a href="#">Deep Dropdown 2</a></li>
                    <li><a href="#">Deep Dropdown 3</a></li>
                    <li><a href="#">Deep Dropdown 4</a></li>
                    <li><a href="#">Deep Dropdown 5</a></li>
                  </ul>
                </li>
                <li><a href="#">Dropdown 2</a></li>
                <li><a href="#">Dropdown 3</a></li>
                <li><a href="#">Dropdown 4</a></li>
              </ul>
            </li> */}
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
          {/* <NavLink class="btn-book-a-table d-none d-xl-block" to="/login">Login</a> */}
          {/* <NavLink class="btn-book-a-table d-none d-xl-block" to="/login">Login</a> */}
          <NavLink className="btn-book-a-table d-none d-xl-block" to="/signup">Signup</NavLink>
          <NavLink className="btn-book-a-table d-none d-xl-block" to="/login">Login</NavLink>
          

        

      </div>

    </div>

  </header>
  )
}

export default Header