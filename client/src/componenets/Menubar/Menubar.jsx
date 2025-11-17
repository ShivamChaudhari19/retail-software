import React, { useContext } from 'react';
import './Menubar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.png";
import Profile from "../../assets/profile.png";
import { AppContext } from '../../context/AppContext';

const Menubar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuthData, auth } = useContext(AppContext);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setAuthData(null, null);
        navigate("/login", { replace: true });
    };

    const isActive = (path) => location.pathname === path;

    const isAdmin = auth?.role === "ROLE_ADMIN"; // SAFE CHECK

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
            
            <Link className="navbar-brand" to="/dashboard">
                <img src={Logo} alt="Logo" height="70" />
            </Link>

            <button 
                className="navbar-toggler" 
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse p-2" id="navbarNav">
                
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/dashboard') ? 'fw-bold text-warning' : ''}`} to="/dashboard">
                            Dashboard
                        </Link>
                    </li>

                    {/* FIXED PATH: explor → explore */}
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/explor') ? 'fw-bold text-warning' : ''}`} to="/explor">
                            Explore
                        </Link>
                    </li>

                    {isAdmin && (
                        <>
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/items') ? 'fw-bold text-warning' : ''}`} to="/items">
                                    Manage Items
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/category') ? 'fw-bold text-warning' : ''}`} to="/category">
                                    Manage Categories
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/users') ? 'fw-bold text-warning' : ''}`} to="/users">
                                    Manage Users
                                </Link>
                            </li>
                        </>
                    )}

                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/orders') ? 'fw-bold text-warning' : ''}`} to="/orders">
                            Order History
                        </Link>
                    </li>

                </ul>

                <ul className="navbar-nav ms-auto">
                    <li className="nav-item dropdown">
                        <button
                            className="nav-link dropdown-toggle bg-transparent border-0"
                            id="navbarDropdown"
                            data-bs-toggle="dropdown"
                        >
                            <img src={Profile} alt="Profile" height={32} width={32} />
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><button className="dropdown-item">Settings</button></li>
                            <li><button className="dropdown-item">Activity Log</button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                        </ul>
                    </li>
                </ul>

            </div>
        </nav>
    );
};

export default Menubar;
