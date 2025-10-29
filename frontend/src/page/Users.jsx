import React, { useEffect, useState, useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import SearchBar from "../component/Searchbar";
import { ThemeContext2 } from "../context/ThemeContext2";

const Users = () => {
  const { isDark } = useContext(ThemeContext2);
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
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`p-4 sm:p-6 md:p-10 rounded-xl shadow-md flex flex-col space-y-4 h-[calc(100vh-80px)] transition-colors ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h4 className="text-2xl sm:text-3xl font-bold text-yellow-600">Users</h4>
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or email..."
        />
      </div>

      {/* Users Scrollable */}
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className={`flex flex-col sm:grid sm:grid-cols-6 gap-4 items-start sm:items-center p-4 rounded-lg shadow hover:shadow-lg transition-colors ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
            >
              {/* Name */}
              <p className={`${isDark ? "text-gray-200" : "text-gray-700"} font-medium`}>
                {user.name}
              </p>

              {/* Email */}
              <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>{user.email}</p>

              {/* Empty space for alignment */}
              <div className="hidden sm:block col-span-3"></div>

              {/* Actions: Delete */}
              <div className="flex gap-4 mt-2 sm:mt-0">
                {user.role !== "admin" && (
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="flex justify-center items-center text-red-500 hover:text-red-700 transition"
                  >
                    <FiTrash2 size={20} />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-center py-4`}>
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Users;
