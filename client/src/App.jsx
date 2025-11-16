import './App.css'
import Menubar from './componenets/Menubar/Menubar'

import { Route, Routes, useLocation } from 'react-router-dom'

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
import ChatBot from './pages/ChatBot/ChatBot'
import BusinessGrowth from './pages/BusinessGrowth/BusinessGrowth'

function App() {

  const location = useLocation();
  const {auth} = useContext(AppContext);

  const LoginRoute = ({element}) => {
    if(auth.token){
      return <Navigate to="/dashboard" replace />
    }
    return element;
  }

  const ProtectedRoute = ({element, allowedRoles}) => {
    if(!auth.token){
      return <Navigate to="/login" replace/>
    }

    if(allowedRoles && !allowedRoles.include(auth.role)){
      return <Navigate to="/dashboard" replace/> 
    }
    return element;
    
  }

  return (
    <div>
     {location.pathname !== "/login" && <Menubar/>}
     <Toaster/>

     <Routes >
      
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/explor" element={<Explor/>} />
        {/* <Route path="/chatbot" element={<ChatBot />} /> */}
        {/* <Route path="/business" element={<BusinessGrowth />} /> */}

        {/* Admin only routes */}
        <Route path="/category" element={<ProtectedRoute element={<ManageCategoties/>} allowedRoles={['ROLE_ADMIN']}/>} />
        <Route path="/users" element={<ProtectedRoute element={<ManageUsers/>} allowedRoles={['ROLE_ADMIN']}/>} />
        <Route path="/items" element={<ProtectedRoute element={<ManageItems/>} allowedRoles={['ROLE_ADMIN']}/>} />

        <Route path="/login" element={<LoginRoute element={<Login/>} />} />
        <Route path='/orders' element={<OrderHistory/>}/>
        <Route path="/" element={<Dashboard/>} />

        

        <Route path="*" element={<Notfound />} />

     </Routes>
    </div>
  )
}

export default App
