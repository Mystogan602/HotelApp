import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ApiService from '../../service/ApiService'

const Navbar = () => {
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogOut = window.confirm("Are you sure you want to logout?");
        if (isLogOut) {
            ApiService.logOut();
            navigate("/login");
        }
    }

    return (
        <nav className='navbar'>
            <div className='navbar-brand'>
                <NavLink to="/home">Mys Hotel</NavLink>
            </div>
            <ul className='navbar-ul'>
                <li><NavLink to="/home" activeClass="active">Home</NavLink></li>
                <li><NavLink to="/rooms" activeClass="active">Rooms</NavLink></li>
                <li><NavLink to="/find-booking" activeClass="active">Find Booking</NavLink></li>
            </ul>

            {isUser && <li><NavLink to="/profile" activeClass="active">Profile</NavLink></li>}
            {isAdmin && <li><NavLink to="/admin" activeClass="active">Admin</NavLink></li>}
            {!isAuthenticated && <li><NavLink to="/login" activeClass="active">Login</NavLink></li>}
            {!isAuthenticated && <li><NavLink to="/register" activeClass="active">Register</NavLink></li>}
            {isAuthenticated && <li onClick={handleLogout}>Logout</li>}
        </nav>
    )
}

export default Navbar
