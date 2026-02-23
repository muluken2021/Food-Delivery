import React, { useEffect, useState } from "react";
import { FiTrash2, FiSearch, FiUser, FiMail, FiShield } from "react-icons/fi";
import { toast } from "react-toastify";

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
        localStorage.clear();
        window.location.href = "/login";
      }
    } catch (err) {
      toast.error("Failed to sync user data");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to remove this account?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${url}/api/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        toast.success("User removed successfully");
        fetchUsers();
      }
    } catch (err) {
      toast.error("Error deleting user");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-sm text-gray-400">View and manage registered customer accounts</p>
        </div>

        <div className="relative group">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-500 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Search by name or email..."
            className="bg-white border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-500/20 transition-all outline-none shadow-sm w-full sm:w-80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2rem] border border-gray-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-[13px] uppercase tracking-wider border-b border-gray-50">
                <th className="px-8 py-6 font-bold">User</th>
                <th className="px-6 py-6 font-bold">Contact Information</th>
                <th className="px-6 py-6 font-bold">Role</th>
                <th className="px-6 py-6 font-bold">Joined Date</th>
                <th className="px-8 py-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50/50 transition-all group">
                    {/* User Identity */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 font-bold text-lg shadow-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-400 font-medium capitalize">{user.role || 'Customer'}</p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                        <FiMail className="text-gray-300" size={14} />
                        {user.email}
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="px-6 py-5">
                      <span className={`px-4 py-1 rounded-xl text-[11px] font-extrabold uppercase tracking-tight ${
                        user.role === 'admin' 
                          ? 'bg-purple-50 text-purple-600' 
                          : 'bg-blue-50 text-blue-600'
                      }`}>
                        {user.role || 'User'}
                      </span>
                    </td>

                    {/* Join Date (Mock/Real) */}
                    <td className="px-6 py-5 text-sm text-gray-500 font-medium">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Oct 12, 2025'}
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        {user.role !== "admin" ? (
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
                            title="Delete User"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        ) : (
                          <div className="p-3 text-gray-200">
                            <FiShield size={16} title="Admin Account Protected" />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-24 text-center text-gray-400 italic font-medium">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;