import './App.css';
import Menubar from './componenets/Menubar/Menubar';

<<<<<<< HEAD
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import Dashboard from './pages/Dashboard/Dashboard'
import Explor from './pages/Explore/Explor'
import ManageItems from './pages/ManageItems/ManageItems'
import ManageUsers from './pages/ManageUsers/ManageUsers'
import ManageCategoties from './pages/ManageCategories/ManageCategoties'
import {Toaster} from "react-hot-toast"
import Login from './pages/Login/Login'
import OrderHistory from './pages/OrderHistory/OrderHistory'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import Notfound from './pages/Notfound/Notfound'
// import ChatBot from './pages/ChatBot/ChatBot'
// import BusinessGrowth from './pages/BusinessGrowth/BusinessGrowth'
=======
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Dashboard from './pages/Dashboard/Dashboard';
import Explor from './pages/Explore/Explor';
import ManageItems from './pages/ManageItems/ManageItems';
import ManageUsers from './pages/ManageUsers/ManageUsers';
import ManageCategoties from './pages/ManageCategories/ManageCategoties';

import { Toaster } from "react-hot-toast";
import Login from './pages/Login/Login';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import Notfound from './pages/Notfound/Notfound';
>>>>>>> 146f98a9858ed29f2bffe7f75911c92ace48d369

function App() {

  const location = useLocation();
  const { auth } = useContext(AppContext);

  const LoginRoute = ({ element }) => {
    return auth.token ? <Navigate to="/dashboard" replace /> : element;
  };

  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!auth.token) {
      return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
      return <Navigate to="/dashboard" replace />;
    }

    return element;
  };

  const hideMenu = location.pathname === "/login" || location.pathname === "/*";

  return (
    <div>
      {!hideMenu && <Menubar />}
      <Toaster />

      <Routes>

        {/* Protected (requires login) */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/explore" element={<ProtectedRoute element={<Explor />} />} />
        <Route path="/orders" element={<ProtectedRoute element={<OrderHistory />} />} />

        {/* Admin-only routes */}
        <Route path="/category" element={<ProtectedRoute element={<ManageCategoties />} allowedRoles={['ROLE_ADMIN']} />} />
        <Route path="/users" element={<ProtectedRoute element={<ManageUsers />} allowedRoles={['ROLE_ADMIN']} />} />
        <Route path="/items" element={<ProtectedRoute element={<ManageItems />} allowedRoles={['ROLE_ADMIN']} />} />

        {/* Public */}
        <Route path="/login" element={<LoginRoute element={<Login />} />} />

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
