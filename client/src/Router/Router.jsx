import { createBrowserRouter, Navigate } from 'react-router-dom';
import Main from '../Main/Main';
import Home1 from '../Pages/Home1/Home1'; // Trang Chủ
import ErrorPage from '../Shared/ErrorPage/ErrorPage';
import AboutInner from '../Pages/InnerPage/AboutInner/AboutInner'; // Giải Pháp
import SolutionDetails from '../Pages/InnerPage/SolutionDetails/SolutionDetails'; // Chi tiết Giải Pháp
import ServiceDetails from '../Pages/InnerPage/ServiceDetails/ServiceDetails'; // Sản Phẩm
import ContactInner from '../Pages/InnerPage/ContactInner/ContactInner'; // Liên Hệ
import PolicyInner from '../Pages/InnerPage/PolicyInner/PolicyInner'; // Chính Sách
import CustomerInner from '../Pages/InnerPage/CustomerInner/CustomerInner'; // Khách Hàng
import BlogGrid from '../Pages/InnerPage/BlogGrid/BlogGrid'; // Tin Tức
import TeamInner from '../Pages/InnerPage/TeamInner/TeamInner'; // Đội Ngũ
import AdminLogin from '../Pages/Admin/AdminLogin'; // Admin Login
import AdminDashboard from '../Pages/Admin/AdminDashboard'; // Admin Dashboard
import AdminContacts from '../Pages/Admin/AdminContacts'; // Admin Contacts
import ProtectedAdminRoute from './ProtectedAdminRoute'; // Protected Route

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <Main />,
    children: [
      {
        path: '/', // Trang Chủ
        element: <Home1 />,
      },
      {
        path: '/service_details', // Sản Phẩm
        element: <ServiceDetails />,
      },
      {
        path: '/about', // Giải Pháp
        element: <AboutInner />,
      },
      {
        path: '/solution/:slug', // Chi tiết Giải Pháp
        element: <SolutionDetails />,
      },
      {
        path: '/contact', // Liên Hệ
        element: <ContactInner />,
      },
      {
        path: '/blog_grid', // Tin Tức
        element: <BlogGrid />,
      },
      {
        path: '/policy', // Chính Sách
        element: <PolicyInner />,
      },
      {
        path: '/customer', // Khách Hàng
        element: <CustomerInner />,
      },
      {
        path: '/team', // Đội Ngũ
        element: <TeamInner />,
      },
    ],
  },
  // Admin routes (separate from main layout)
  {
    path: '/admin',
    element: localStorage.getItem('adminToken') ?
      <Navigate to="/admin/dashboard" replace /> :
      <Navigate to="/admin/login" replace />,
  },
  {
    path: '/admin/',
    element: localStorage.getItem('adminToken') ?
      <Navigate to="/admin/dashboard" replace /> :
      <Navigate to="/admin/login" replace />,
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedAdminRoute>
        <AdminDashboard />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: '/admin/contacts',
    element: (
      <ProtectedAdminRoute>
        <AdminContacts />
      </ProtectedAdminRoute>
    ),
  },
]);

export default router;
