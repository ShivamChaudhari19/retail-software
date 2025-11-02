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

function App() {

  const location = useLocation();

  return (
    <div>
     {location.pathname !== "/login" && <Menubar/>}
     <Toaster/>

     <Routes >
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/category" element={<ManageCategoties/>} />
        <Route path="/users" element={<ManageUsers/>} />
        <Route path="/items" element={<ManageItems/>} />
        <Route path="/explor" element={<Explor/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/orders' element={<OrderHistory/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
     </Routes>
    </div>
  )
}

export default App
