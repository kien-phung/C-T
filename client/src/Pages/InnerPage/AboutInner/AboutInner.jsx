import { FaArrowRightLong } from 'react-icons/fa6';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getTranslation } from '../../../utils/translations';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPublicSolutions } from '../../../api/api';
import { socket } from '../../../api/socket';
// API-driven solutions

// Fallback dữ liệu tĩnh (khôi phục hiển thị nếu API lỗi/trống)
const getFallbackSolutions = (language) => {
  const base = [
    {
      slug: 'khu-vui-choi-giai-tri',
      image: '/images/solutions/giaitri.jpg',
      title_vn: 'Khu vui chơi giải trí',
      title_en: 'Amusement Park',
      description_vn: 'Giải pháp thanh toán tự động cho khu vui chơi giải trí.',
      description_en: 'Automated payment solution for amusement parks.',
      is_published: true,
    },
    {
      slug: 'can-tin-hoc-duong',
      image: '/images/solutions/cantin.jpg',
      title_vn: 'Căn tin học đường',
      title_en: 'School Canteen',
      description_vn: 'Thanh toán không tiếp xúc cho căn tin trường học.',
      description_en: 'Contactless payment for school canteens.',
      is_published: true,
    },
    {
      slug: 'thu-tien-tu-dong',
      image: '/images/solutions/thutien.jpg',
      title_vn: 'Thu tiền tự động',
      title_en: 'Automated Cashier',
      description_vn: 'Máy thu tiền tự động cho cửa hàng bán lẻ.',
      description_en: 'Automated cash handling for retail stores.',
      is_published: true,
    },
    {
      slug: 'ben-xe-van-tai',
      image: '/images/solutions/benxe.jpg',
      title_vn: 'Bến xe, hãng vận tải hành khách',
      title_en: 'Bus Station & Transport',
      description_vn: 'Hệ thống bán vé tự động và quản lý lịch trình cho bến xe.',
      description_en: 'Automatic ticketing and schedule management for bus stations.',
      is_published: true,
    },
    {
      slug: 'website-ban-hang',
      image: '/images/solutions/banhang.png',
      title_vn: 'Website bán hàng',
      title_en: 'E-commerce Website',
      description_vn: 'Thiết kế website bán hàng chuyên nghiệp, tích hợp thanh toán online.',
      description_en: 'Professional e-commerce website with online payment integration.',
      is_published: true,
    },
    {
      slug: 'cong-tu-dong',
      image: '/images/solutions/tudong.jpg',
      title_vn: 'Cổng tự động',
      title_en: 'Automatic Gate',
      description_vn: 'Kiểm soát ra vào với nhận diện biển số và barrier tự động.',
      description_en: 'Access control with license plate recognition and auto barrier.',
      is_published: true,
    },
    {
      slug: 'camera-ai',
      image: '/images/solutions/camera1.jpg',
      title_vn: 'Camera Giám Sát Tích Hợp AI',
      title_en: 'AI-powered Surveillance Camera',
      description_vn: 'Giám sát thông minh, phát hiện hành vi bất thường, cảnh báo xâm nhập.',
      description_en: 'Smart surveillance with AI behavior detection and intrusion alerts.',
      is_published: true,
    },
    {
      slug: 'tiet-kiem-dien',
      image: '/images/solutions/dien1.jpg',
      title_vn: 'Hệ Thống Tiết Kiệm Năng Lượng Điện Tích Hợp AI',
      title_en: 'AI Energy Saving System',
      description_vn: 'Dự đoán và tối ưu hóa tiêu thụ điện, tiết kiệm 10-15% chi phí.',
      description_en: 'Predict and optimize power usage, save 10-15% costs.',
      is_published: true,
    },
    {
      slug: 'thiet-bi-doc-cccd',
      image: '/images/solutions/cccd.jpg',
      title_vn: 'Giải pháp thiết bị đọc CCCD',
      title_en: 'ID Card Reader Solution',
      description_vn: 'Thiết bị đọc CCCD tự động, xác thực nhanh và lưu trữ an toàn.',
      description_en: 'Automated ID card reader with fast verification and secure storage.',
      is_published: true,
    },
    {
      slug: 'can-dinh-luong-nha-may',
      image: '/images/solutions/dien2.jpg',
      title_vn: 'Giải pháp Cân định lượng dành cho nhà máy',
      title_en: 'Factory Dosing Scale Solution',
      description_vn: 'Tính toán chính xác theo công thức, giám sát từ xa thời gian thực.',
      description_en: 'Accurate formula-based dosing with real-time remote monitoring.',
      is_published: true,
    }
  ];
  return base;
};

const AboutInner = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const [solutions, setSolutions] = useState([]);

  const resolveTitle = (s) => currentLanguage === 'EN' ? (s?.title_en || s?.title_vn || '') : (s?.title_vn || s?.title_en || '');
  const resolveDesc = (s) => currentLanguage === 'EN' ? (s?.description_en || s?.description_vn || '') : (s?.description_vn || s?.description_en || '');

  const fetchSolutions = async () => {
    try {
      const res = await getPublicSolutions();
      const items = res?.data?.solutions || [];
      // Only show published if flag exists; otherwise show all (backward compatible)
      const filtered = items.filter(s => (typeof s.is_published === 'boolean' ? s.is_published : true));
      if (filtered.length === 0) {
        // Khôi phục hiển thị bằng dữ liệu tĩnh nếu API không có dữ liệu
        setSolutions(getFallbackSolutions(currentLanguage));
      } else {
        setSolutions(filtered);
      }
    } catch (e) {
      console.error('Load public solutions failed', e);
      // API lỗi: dùng dữ liệu tĩnh để đảm bảo trang không trống
      setSolutions(getFallbackSolutions(currentLanguage));
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, [currentLanguage]);

  useEffect(() => {
    const onChange = () => fetchSolutions();
    socket.on('solutions.changed', onChange);
    return () => socket.off('solutions.changed', onChange);
  }, []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Số giải pháp mỗi trang (thay đổi từ 6 thành 3 để dễ thấy pagination)

  // Tính toán
  const totalPages = Math.ceil(solutions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSolutions = solutions.slice(indexOfFirstItem, indexOfLastItem);

  // Chuyển trang
  const handlePageChange = (pageNumber, shouldScroll = false) => {
    setCurrentPage(pageNumber);
    if (shouldScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={t('nav.solutions')}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={t('nav.solutions')}
        bgImage={'/images/solutions/about1.jpg'}
      />

      <section className='py-[120px] bg-BodyBg4-0'>
        <div className='Container'>
          {/* Header Section */}
          <div className='text-center mb-16'>
            <h1
              className='font-FiraSans font-semibold text-4xl sm:text-5xl text-HeadingColor-0 mb-6'
              data-aos='fade-up'
              data-aos-duration='800'
            >
              {t('service.pageTitle')}
            </h1>
            <h2
              className='font-FiraSans font-semibold text-3xl text-HeadingColor-0 mb-6'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='100'
            >
              {t('service.subtitle')}
            </h2>
            <p
              className='font-FiraSans text-TextColor2-0 text-lg max-w-3xl mx-auto'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='200'
            >
              {t('service.description')}
            </p>
          </div>

          {/* Solutions Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`grid gap-8 ${
                currentPage === totalPages && currentSolutions.length === 2
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {currentSolutions.map((solution, index) => (
                <div
                  key={solution._id || solution.slug || index}
                  className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col h-full ${
                    currentPage === totalPages && currentSolutions.length === 1 ? 'lg:col-start-2' : ''
                  }`}
                  data-aos='fade-up'
                  data-aos-duration='800'
                  data-aos-delay={300 + (index * 100)}
                >
                <div className='relative overflow-hidden bg-gray-100 dark:bg-gray-700' style={{minHeight: '256px'}}>
                  <img
                    src={solution.image || '/images/placeholder-solution.png'}
                    alt={resolveTitle(solution)}
                    className='w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105'
                    style={{display: 'block', opacity: 1, visibility: 'visible'}}
                    onError={(e) => {
                      console.log('Image load error:', e.target.src);
                      e.target.src = '/images/placeholder-solution.png';
                    }}
                    onLoad={() => console.log('Image loaded:', solution.image)}
                  />
                  {/* <div className='absolute inset-0 bg-PrimaryColor-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300'></div> */}
                </div>
                <div className='p-6 flex flex-col flex-grow'>
                  <h3 className='font-FiraSans font-semibold text-xl text-HeadingColor-0 dark:text-white mb-3'>
                    {resolveTitle(solution)}
                  </h3>
                  <p className='font-FiraSans text-TextColor2-0 dark:text-gray-300 mb-4'>
                    {resolveDesc(solution)}
                  </p>
                  <div className='space-y-2 mb-6 flex-grow' />
                  <div className='mt-auto'>
                    <Link
                      to={`/solution/${solution.slug}`}
                      className='block w-full bg-PrimaryColor-0 dark:bg-green-600 text-white px-6 py-3 rounded-lg font-FiraSans font-medium hover:bg-opacity-90 transition-all duration-300 text-center'
                    >
                      {t('service.learnMore')}
                    </Link>
                  </div>
                </div>
              </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className='flex justify-center items-center gap-2 mt-12'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='600'
            >
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1, true)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-FiraSans font-medium transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 text-HeadingColor-0 dark:text-white hover:bg-PrimaryColor-0 dark:hover:bg-green-600 hover:text-white'
                }`}
              >
                {currentLanguage === 'VN' ? 'Trước' : 'Previous'}
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 rounded-lg font-FiraSans font-medium transition-all duration-300 ${
                      currentPage === pageNumber
                        ? 'bg-PrimaryColor-0 dark:bg-green-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-HeadingColor-0 dark:text-white hover:bg-PrimaryColor-0 dark:hover:bg-green-600 hover:text-white'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1, true)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-FiraSans font-medium transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 text-HeadingColor-0 dark:text-white hover:bg-PrimaryColor-0 dark:hover:bg-green-600 hover:text-white'
                }`}
              >
                {currentLanguage === 'VN' ? 'Sau' : 'Next'}
              </button>
            </div>
          )}

          {/* Call to Action */}
          <div
            className='mt-16 text-center'
            data-aos='fade-up'
            data-aos-duration='800'
            data-aos-delay='400'
          >
            <div className='bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg'>
              <h3 className='font-FiraSans font-semibold text-2xl text-HeadingColor-0 dark:text-white mb-4'>
                {currentLanguage === 'VN' ? 'Bạn cần giải pháp riêng cho doanh nghiệp?' : 'Need a custom solution for your business?'}
              </h3>
              <p className='font-FiraSans text-TextColor2-0 dark:text-gray-300 mb-6'>
                {currentLanguage === 'VN' ? 'Liên hệ với chúng tôi để nhận tư vấn miễn phí và thiết kế giải pháp phù hợp nhất.' : 'Contact us for free consultation and the most suitable solution design.'}
              </p>
              <Link
                to="/contact"
                className='inline-block bg-PrimaryColor-0 dark:bg-green-600 text-white px-8 py-3 rounded-lg font-FiraSans font-medium hover:bg-opacity-90 transition-all duration-300'
              >
                {currentLanguage === 'VN' ? 'Liên hệ ngay' : 'Contact Now'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutInner;
