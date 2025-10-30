import React from 'react'
import './Menubar.css';
import { Link } from 'react-router-dom';
import Logo from "../../assets/logo.png"

const Menubar = () => {
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
        </ul>
        {/* <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-light" type="submit">Search</button>
        </form> */}
        Add the dropdown for the userprofile
    </div>
</nav>
  )
}

export default Menubar
