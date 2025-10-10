import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import SearchBar from "../component/Searchbar";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const url = import.meta.env.VITE_APP_API_URL;

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${url}/api/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.success) setUsers(data.users);
      else if (data.message === "Unauthorized") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
      } else toast.error("Failed to fetch users");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${url}/api/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        fetchUsers();
      } else if (data.message === "Unauthorized") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
      } else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())) 
  );

  console.log(users)

  return (
    <div className="p-4 sm:p-8">
      {/* Header with search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-yellow-600">Users</h2>
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or email..."
        />
      </div>

      {/* Table for desktop */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-yellow-600 font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-yellow-600 font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-yellow-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>

            {filteredUsers.length > 0 ? (
              
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white border-b hover:bg-yellow-50 transition"
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                   {user.role !== 'admin' && (
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="text-red-500 hover:text-red-600 text-xl transition"
                      >
                        <FiTrash2 />
                      </button>
                    )}

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-gray-400 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="sm:hidden flex flex-col gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-md rounded-lg p-4 hover:bg-yellow-50 transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">{user.name}</span>
                {user.role !== 'admin' && (
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="text-red-500 hover:text-red-600 text-xl transition"
                      >
                        <FiTrash2 />
                      </button>
                    )}
              </div>
              <div className="text-gray-600 text-sm">{user.email}</div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-center">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default Users;
