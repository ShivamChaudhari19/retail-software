// import React, { useEffect, useState } from 'react'
import "./ManageUsers.css"
import UserForm from '../../componenets/UserForm/UserForm'
import UserList from '../../componenets/UsersList/UserList'
import { fetchUsers } from '../../service/UserService'
import { toast } from 'react-toastify'
import { useEffect, useState } from "react"

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    async function loadUsers() {
      try{
        setLoading(true);
        const response = await fetchUsers();
        setUsers(response.data);
        console.log("Fetched users:", response.data);
      }catch (error) {
          console.error(error);
          toast.error("Unable to fetch users");
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  return (
     <div className='users-container text-light'>
      <div className='left-column'>
          <UserForm setUsers={setUsers}/>
      </div>

      <div className='right-column'>
         <UserList users={users} setUsers={setUsers}/>
      </div>
      
    </div>
  )
}

export default ManageUsers
