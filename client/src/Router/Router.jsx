import { createBrowserRouter } from 'react-router-dom';
import Main from '../Main/Main';
import Home1 from '../Pages/Home1/Home1'; // Trang Chủ
import ErrorPage from '../Shared/ErrorPage/ErrorPage';
import AboutInner from '../Pages/InnerPage/AboutInner/AboutInner'; // Giải Pháp
import ServiceDetails from '../Pages/InnerPage/ServiceDetails/ServiceDetails'; // Sản Phẩm
import BlogDetails from '../Pages/InnerPage/BlogDetails/BlogDetails'; // Chi Tiết Tin Tức
import ContactInner from '../Pages/InnerPage/ContactInner/ContactInner'; // Liên Hệ
import PolicyInner from '../Pages/InnerPage/PolicyInner/PolicyInner'; // Chính Sách
import CustomerInner from '../Pages/InnerPage/CustomerInner/CustomerInner'; // Khách Hàng
import BlogGrid from '../Pages/InnerPage/BlogGrid/BlogGrid'; // Tin Tức

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
        path: '/contact', // Liên Hệ
        element: <ContactInner />,
      },
      {
        path: '/blog_grid', // Tin Tức
        element: <BlogGrid />,
      },
      {
        path: '/blog_details', // Chi Tiết Tin Tức
        element: <BlogDetails />,
      },
      {
        path: '/policy', // Chính Sách
        element: <PolicyInner />,
      },
      {
        path: '/customer', // Khách Hàng
        element: <CustomerInner />,
      },
    ],
  },
]);

export default router;
