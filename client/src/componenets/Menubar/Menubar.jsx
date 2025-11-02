import React, { useContext } from 'react'
import './Menubar.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.png"
import Profile from "../../assets/profile.png"
import { AppContext } from '../../context/AppContext';
const Menubar = () => {
    const navigate = useNavigate();
    const {setAuthData} = useContext(AppContext);
    const logout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            setAuthData(null, null);
            navigate("/login");
    }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
    <a className="navbar-brand" href="#">
        <img src={Logo} alt="Logo" height="70"/>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse p-2" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/explor">Explore</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/items">Manage Items</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/category">Manage Categories</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/users">Manage Users</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/orders">Order History</Link>
            </li>
        </ul>
        {/* <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-light" type="submit">Search</button>
        </form> */}
        {/* Add the dropdown for the userprofile */}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role='button' data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={Profile} alt='' height={32} width={32}/>
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby='navbarDropdown'>
                    <li>
                        <a href="#" className="dropdown-item">
                            Setting
                        </a>
                        <a href="#" className="dropdown-item">
                            Activity log
                        </a>
                        <li>
                            <hr className='dropdown-divider'/>
                        </li>
                        <a href="#" className="dropdown-item" onClick={logout}>
                            Logout
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</nav>
  )
}

export default Menubar
