import { useState } from "react";
import { deleteUser } from "../../service/UserService";

const UserList = ({ users, setUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to delete user by ID
  const deleteByUserId = async (id) => {
    try{
      await deleteUser(id);
      setUsers(prevUsers => prevUsers.filter(user => user.userId !== id));
      toast.success("user deleted");
    }catch(e){
      console.error(e);
      toast.error("Unable to deleting user")
    }
  };

  return (
    <div
      className="user-list-container container py-3"
      style={{
        minHeight: "75vh",
        overflowY: "auto",
        overflowX: "hidden",
        backgroundColor: "#f7f7f7",
      }}
    >
      {/* Search bar */}
      <div className="row mb-3 pe-2">
        <div className="input-group">
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Search by name..."
            className="form-control"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      {/* User cards */}
      <div className="row g-3 pe-2">
        {filteredUsers.map((user, index) => (
          <div key={index} className="col-12">
            <div className="card p-3 bg-dark">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{user.name}</h5>
                  <p className="nm-0 text-white">{user.email}</p>
                </div>
                <div>
                  <button className="btn danger btn-sm" onClick={() => deleteByUserId(user.userId)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>

          </div>
        ))
        }
      </div>
    </div>
  );
};git push origin master
git commit -m "Added Manageuser and userList"


export default UserList;
