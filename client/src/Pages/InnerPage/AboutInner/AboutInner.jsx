import { FaArrowRightLong } from 'react-icons/fa6';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getTranslation } from '../../../utils/translations';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const getSolutionsData = (language) => {
  const data = {
    VN: [
      {
        id: 1,
        slug: 'khu-vui-choi-giai-tri',
        title: 'Khu vui chơi giải trí',
        description: 'Giải pháp dành cho khu vui chơi giải trí',
        image: '/images/solutions/giaitri.jpg',
        details: [
          'Hệ thống thanh toán tự động',
          'Quản lý vé vào cổng',
          'Hệ thống giải trí thông minh',
          'Quản lý khách hàng'
        ]
      },
      {
        id: 2,
        slug: 'can-tin-hoc-duong',
        title: 'Căn tin học đường',
        description: 'Giải pháp dành cho các căn tin trong trường học',
        image: '/images/solutions/cantin.jpg',
        details: [
          'Hệ thống thanh toán không tiềp xúc',
          'Quản lý thực đơn',
          'Báo cáo doanh thu tự động',
          'Tích hợp thẻ học sinh'
        ]
      },
      {
        id: 3,
        slug: 'thu-tien-tu-dong',
        title: 'Thu tiền tự động',
        description: 'Giải pháp thu tiền tự động dành cho các cửa hàng bán lẻ',
        image: '/images/solutions/thutien.jpg',
        details: [
          'Máy thu tiền tự động',
          'Nhận diện tiền giấy VND',
          'Trả tiền thừa tự động',
          'Bảo mật cao'
        ]
      },
      {
        id: 4,
        slug: 'ben-xe-van-tai',
        title: 'Bến xe, hãng vận tải hành khách',
        description: 'Giải pháp dành cho các bến xe, hãng vận tải hành khách',
        image: '/images/solutions/benxe.jpg',
        details: [
          'Hệ thống bán vé tự động',
          'Quản lý lịch trình xe',
          'Thanh toán điện tử',
          'Báo cáo doanh thu'
        ]
      },
      {
        id: 5,
        slug: 'website-ban-hang',
        title: 'Website bán hàng',
        description: 'Giải pháp dành cho các doanh nghiệp bán hàng online',
        image: '/images/solutions/banhang.png',
        details: [
          'Thiết kế website chuyên nghiệp',
          'Tích hợp thanh toán online',
          'Quản lý đơn hàng',
          'SEO và Marketing'
        ]
      },
      {
        id: 6,
        slug: 'cong-tu-dong',
        title: 'Cổng tự động',
        description: 'Cung cấp giải pháp cổng tự động cho các khu vui chơi, tòa nhà,...',
        image: '/images/solutions/tudong.jpg',
        details: [
          'Cổng barrier tự động',
          'Nhận diện biển số xe',
          'Hệ thống kiểm soát ra vào',
          'Tích hợp camera an ninh'
        ]
      },
      {
        id: 7,
        slug: 'camera-ai',
        title: 'Camera Giám Sát Tích Hợp AI',
        description: 'Giám sát chặt chẽ với công nghệ AI tiên tiến',
        image: '/images/solutions/camera1.jpg',
        details: [
          'Hệ thống camera giám sát mạnh mẽ',
          'Sử dụng công nghệ tiên tiến bậc nhất Đài Loan',
          'Đưa ra kết quả chính xác trên từng khung hình',
          'Vật thể và con người cũng có thể dễ dàng giám sát'
        ]
      },
      {
        id: 8,
        slug: 'tiet-kiem-dien',
        title: 'Hệ Thống Tiết Kiệm Năng Lượng Điện Tích Hợp AI',
        description: 'Tiết kiếm năng lượng hiệu quả với công nghệ AI',
        image: '/images/solutions/dien1.jpg',
        details: [
          'Dự đoán trước được mức điện tiêu thụ ở thời gian cao điểm',
          'Giảm thiểu tối đa chi phí không cần thiết.',
          'Xây dựng được hệ thống thông minh dành cho doanh nghiệp, nhà máy, cơ sở của bạn. ',
          'Chi phí giảm đến con số 10-15%.'
        ]
      },
    ],
    EN: [
      {
        id: 1,
        slug: 'khu-vui-choi-giai-tri',
        title: 'Entertainment Area',
        description: 'Solutions for entertainment venues',
        image: '/images/solutions/giaitri.jpg',
        details: [
          'Automatic payment system',
          'Gate entry management',
          'Smart entertainment system',
          'Customer management'
        ]
      },
      {
        id: 2,
        slug: 'can-tin-hoc-duong',
        title: 'School Canteen',
        description: 'Solutions for school canteens',
        image: '/images/solutions/cantin.jpg',
        details: [
          'Contactless payment system',
          'Menu management',
          'Automatic revenue reporting',
          'Student card integration'
        ]
      },
      {
        id: 3,
        slug: 'thu-tien-tu-dong',
        title: 'Automatic Payment',
        description: 'Automatic payment solutions for retail stores',
        image: '/images/solutions/thutien.jpg',
        details: [
          'Automatic cash machine',
          'VND bill recognition',
          'Automatic change return',
          'High security'
        ]
      },
      {
        id: 4,
        slug: 'ben-xe-van-tai',
        title: 'Bus Station & Passenger Transport',
        description: 'Solutions for bus stations and passenger transport companies',
        image: '/images/solutions/benxe.jpg',
        details: [
          'Automatic ticketing system',
          'Bus schedule management',
          'Electronic payment',
          'Revenue reporting'
        ]
      },
      {
        id: 5,
        slug: 'website-ban-hang',
        title: 'E-commerce Website',
        description: 'Solutions for online businesses',
        image: '/images/solutions/banhang.png',
        details: [
          'Professional website design',
          'Online payment integration',
          'Order management',
          'SEO and Marketing'
        ]
      },
      {
        id: 6,
        slug: 'cong-tu-dong',
        title: 'Automatic Gate',
        description: 'Automatic gate solutions for entertainment areas, buildings, etc.',
        image: '/images/solutions/tudong.jpg',
        details: [
          'Automatic barrier gate',
          'License plate recognition',
          'Access control system',
          'Security camera integration'
        ]
      },
      {
        id: 7,
        slug: 'camera-ai',
        title: 'AI Integrated Surveillance Camera',
        description: 'Close monitoring with advanced AI technology',
        image: '/images/solutions/camera1.jpg',
        details: [
          'Powerful surveillance camera system',
          'Using the most advanced technology in Taiwan',
          'Gives accurate results on every frame',
          'Objects and people can also be easily monitored.'
        ]
      },
      {
        id: 8,
        slug: 'tiet-kiem-dien',
        title: 'AI Integrated Electricity Saving System',
        description: 'Save energy effectively with AI technology',
        image: '/images/solutions/dien1.jpg',
        details: [
          'Predictable electricity consumption at peak times',
          'Minimize unnecessary costs.',
          'Build smart systems for your business, factory, and facility.',
          'Cost reduction up to 10-15%.'
        ]
      },
    ]
  };
  return data[language] || data.VN;
};

const AboutInner = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const solutions = getSolutionsData(currentLanguage);

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
                  key={solution.id}
                  className='bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col h-full'
                  data-aos='fade-up'
                  data-aos-duration='800'
                  data-aos-delay={300 + (index * 100)}
                >
                <div className='relative overflow-hidden bg-gray-100 dark:bg-gray-700' style={{minHeight: '256px'}}>
                  <img
                    src={solution.image}
                    alt={solution.title}
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
                    {solution.title}
                  </h3>
                  <p className='font-FiraSans text-TextColor2-0 dark:text-gray-300 mb-4'>
                    {solution.description}
                  </p>
                  <ul className='space-y-2 mb-6 flex-grow'>
                    {solution.details.map((detail, index) => (
                      <li key={index} className='font-FiraSans text-TextColor2-0 dark:text-gray-300 text-sm flex items-start gap-2'>
                        <span className='text-PrimaryColor-0 dark:text-green-400 mt-1 flex-shrink-0'>•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
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
