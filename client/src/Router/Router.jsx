import { createBrowserRouter } from 'react-router-dom';
import Main from '../Main/Main';
import Home1 from '../Pages/Home1/Home1'; // Trang Chủ
import ErrorPage from '../Shared/ErrorPage/ErrorPage';
import AboutInner from '../Pages/InnerPage/AboutInner/AboutInner'; // Giải Pháp
import ServiceDetails from '../Pages/InnerPage/ServiceDetails/ServiceDetails'; // Sản Phẩm
import ContactInner from '../Pages/InnerPage/ContactInner/ContactInner'; // Liên Hệ
import PolicyInner from '../Pages/InnerPage/PolicyInner/PolicyInner'; // Chính Sách
import CustomerInner from '../Pages/InnerPage/CustomerInner/CustomerInner'; // Khách Hàng
import BlogGrid from '../Pages/InnerPage/BlogGrid/BlogGrid'; // Tin Tức
import TeamInner from '../Pages/InnerPage/TeamInner/TeamInner'; // Đội Ngũ

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
]);

export default router;
