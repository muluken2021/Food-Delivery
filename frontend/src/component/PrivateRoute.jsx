import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user || user.role !== "admin") {
    return <Navigate to="/" />; // redirect non-admins or not logged-in users
  }

  return children;
};

export default AdminPrivateRoute;
