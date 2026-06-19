import React from 'react'
import {NavLink} from 'react-router-dom'
const SideBar = () => {
  return (
    <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
    <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <NavLink className="navbar-brand m-0" to="/">
        
        <h5 className="font-weight-bold text-white">Restaurantly-Admin</h5>
      </NavLink>
    </div>
    <hr className="horizontal light mt-0 mb-2"/>
    <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/">
            
            <span className="nav-link-text ms-1">Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-whit" data-bs-toggle="collapse" data-bs-target="#cuisine" to="/cuisine">
          
            <span className="nav-link-text ms-1">Cuisine</span>
          </NavLink>
          <div className='collapse' id='cuisine'>
            <NavLink className="dd-nav-link" to="/cuisine/add">Add</NavLink>
            <NavLink className="dd-nav-link" to="/cuisine">List</NavLink>
          </div>

        </li>
        <li className="nav-item">
          <NavLink  data-bs-toggle="collapse" data-bs-target="#amenities" className="nav-link text-whit" to="/amenities">
          
            <span className="nav-link-text ms-1">Amenities</span>
          </NavLink>
          <div className='collapse' id='amenities'>
            <NavLink className="dd-nav-link" to="/amenities/add">Add</NavLink>
            <NavLink className="dd-nav-link" to="/amenities">List</NavLink>
          </div>

        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-whit" data-bs-toggle="collapse" data-bs-target="#hotel" to="/hotel">
          
            <span className="nav-link-text ms-1">Hotel</span>
          </NavLink>
          <div className='collapse' id='hotel'>
            <NavLink className="dd-nav-link" to="/hotels/add">Add</NavLink>
            <NavLink className="dd-nav-link" to="/hotels">List</NavLink>
          </div>

        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-whit" to="/users">
          
            <span className="nav-link-text ms-1">Users</span>
          </NavLink>

        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-whit" to="/setting">
          
            <span className="nav-link-text ms-1">Setting</span>
          </NavLink>

        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/donation">
            
            <span className="nav-link-text ms-1">Donation</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-whit" to="/logout">
          
            <span className="nav-link-text ms-1">Logout</span>
          </NavLink>

        </li>
        
        
        
      </ul>
    </div>
    
  </aside>
  )
}

export default SideBar