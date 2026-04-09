import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar pe-4 pb-3">
            <nav className="navbar bg-secondary navbar-dark">
                <a href="index.html" className="navbar-brand mx-4 mb-3">
                    <h3 className="text-primary"><i class="fas fa-hotel me-2"></i>HotelRankers</h3>
                </a>
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
                        <img className="rounded-circle" src="img/user.jpg" alt="" style={{width: "40px", height: "40px"}}/>
                        <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0">Jhon Doe</h6>
                        <span>Admin</span>
                    </div>
                </div>
                <div className="navbar-nav w-100">
                    <NavLink to="/" className="nav-item nav-link"><i className="fa fa-tachometer-alt me-2"></i>Dashboard</NavLink>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Ammunities</a>
                        <div className="dropdown-menu bg-transparent border-0">
                            <NavLink to="/hotels" className="dropdown-item">Add</NavLink>
                            <NavLink to="/hotels/list" className="dropdown-item">List</NavLink>
                            
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Cuisine</a>
                        <div className="dropdown-menu bg-transparent border-0">
                            <NavLink to="/cuisine/add" className="dropdown-item">Add</NavLink>
                            <NavLink to="/cuisine" className="dropdown-item">List</NavLink>
                            
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Hotels</a>
                        <div className="dropdown-menu bg-transparent border-0">
                            <NavLink to="/hotels" className="dropdown-item">Add</NavLink>
                            <NavLink to="/hotels/list" className="dropdown-item">List</NavLink>
                            
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Users</a>
                        <div className="dropdown-menu bg-transparent border-0">
                            <NavLink to="/users" className="dropdown-item">Add</NavLink>
                            <NavLink to="/users/list" className="dropdown-item">List</NavLink>
                            
                        </div>
                    </div>
                    <NavLink to="/logout" className="nav-item nav-link"><i className="fa fa-key me-2"></i>Logout</NavLink>
                    
                </div>
            </nav>
        </div>
  )
}

export default Sidebar