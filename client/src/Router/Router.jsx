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
import AdminUsers from '../Pages/Admin/AdminUsers'; // Admin Users
import AdminBlogs from '../Pages/Admin/AdminBlogs'; // Admin Blogs
import AdminProjects from '../Pages/Admin/AdminProjects'; // Admin Projects
import AdminProducts from '../Pages/Admin/AdminProducts'; // Admin Products
import AdminSolutions from '../Pages/Admin/AdminSolutions'; // Admin Solutions
import AdminPolicies from '../Pages/Admin/AdminPolicies'; // Admin Policies
import AdminCustomers from '../Pages/Admin/AdminCustomers'; // Admin Customers
import ProtectedAdminRoute from './ProtectedAdminRoute'; // Protected Route
import { AdminThemeProvider } from '../contexts/AdminThemeContext';

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
        path: '/service_details/', // Alias with trailing slash
        element: <ServiceDetails />,
      },
      {
        path: '/service-details', // Alias with hyphen
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
    element: (
      <AdminThemeProvider>
        <AdminLogin />
      </AdminThemeProvider>
    ),
  },
  {
    path: '/admin/dashboard',
    element: (
      <AdminThemeProvider>
        <ProtectedAdminRoute>
          <AdminDashboard />
        </ProtectedAdminRoute>
      </AdminThemeProvider>
    ),
  },
  {
    path: '/admin/contacts',
    element: (
      <AdminThemeProvider>
        <ProtectedAdminRoute>
          <AdminContacts />
        </ProtectedAdminRoute>
      </AdminThemeProvider>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <AdminThemeProvider>
        <ProtectedAdminRoute>
          <AdminUsers />
        </ProtectedAdminRoute>
      </AdminThemeProvider>
    ),
  },
  {
    path: '/admin/blogs',
    element: (
      <AdminThemeProvider>
        <ProtectedAdminRoute>
          <AdminBlogs />
        </ProtectedAdminRoute>
      </AdminThemeProvider>
    ),
  },
  {
    path: '/admin/projects',
    element: (
      <AdminThemeProvider>
        <ProtectedAdminRoute>
          <AdminProjects />
        </ProtectedAdminRoute>
      </AdminThemeProvider>
    ),
  },
  {
    path: '/admin/products',
    element: (
      <AdminThemeProvider>
        <ProtectedAdminRoute>
          <AdminProducts />
        </ProtectedAdminRoute>
      </AdminThemeProvider>
    ),
  },
  {
    path: '/admin/solutions',
    element: (
      <AdminThemeProvider>
        <ProtectedAdminRoute>
          <AdminSolutions />
        </ProtectedAdminRoute>
      </AdminThemeProvider>
    ),
  },
  {
    path: '/admin/policies',
    element: (
      <AdminThemeProvider>
        <ProtectedAdminRoute>
          <AdminPolicies />
        </ProtectedAdminRoute>
      </AdminThemeProvider>
    ),
  },
  {
    path: '/admin/customers',
    element: (
      <AdminThemeProvider>
        <ProtectedAdminRoute>
          <AdminCustomers />
        </ProtectedAdminRoute>
      </AdminThemeProvider>
    ),
  },
]);

export default router;
