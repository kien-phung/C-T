import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    // Nếu chưa đăng nhập, chuyển đến trang login
    return <Navigate to="/admin/login" replace />;
  }

  // Nếu đã đăng nhập, hiển thị component
  return children;
};

export default ProtectedAdminRoute;
