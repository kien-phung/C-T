import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useState } from 'react';
import Counter from './Counter/Counter';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getTranslation } from '../../../utils/translations';
import { motion, AnimatePresence } from 'framer-motion';

const getProductsData = (language) => {
  const products = {
    VN: {
      hardware: [
        {
          id: 1,
          name: 'Thiết bị đọc Căn Cước Công Dân',
          image: '/images/products/mayquetcccd.png',
          price: '15.000.000 VNĐ',
          features: [
            'Thiết bị đọc chip trên thẻ CCCD',
            'Hỗ trợ: Windows / Linux / Android',
            'Nguồn điện: Cấp qua cổng USB',
            'Có thể kết nối với các thiết bị khác thông qua USB',
            'Mắt đọc: Hỗ trợ quét mã QR nhanh, chính xác',
            'Tín hiệu nhận biết: Đèn báo trạng thái - có âm thanh',
            'Chức năng chính: Đọc thông tin Căn cước, Họ và tên, Ảnh, vân tay'
          ]
        },
        {
          id: 2,
          name: 'Máy giao dịch thanh toán tự động',
          image: '/images/products/kiot1.png',
          price: '100.000.000 VND',
          features: [
            'Vỏ máy',
            '2 màn hình Dell 21 inch',
            'Máy cảm biến mệnh giá tiền giấy VND',
            'Đầu đọc thẻ NFC',
            'Máy POS',
            'Máy in'
          ]
        },
        {
          id: 3,
          name: 'Máy giao dịch thanh toán tự động (32 inch)',
          image: '/images/products/kiot2.png',
          price: '80.000.000 VND',
          features: [
            'Vỏ máy',
            'Màn hình 32 inch',
            'Đầu đọc thẻ NFC',
            'Máy POS',
            'Máy in'
          ]
        },
        {
          id: 4,
          name: 'Máy thu ngân',
          image: '/images/products/maythungan.png',
          price: '50.000.000 VND',
          features: [
            'Vỏ máy thu ngân',
            'Máy cảm biến mệnh giá tiền giấy VND',
            'Màn hình hiển thị LCD 320x240',
            'Bàn phím số'
          ]
        },
        {
          id: 5,
          name: 'Thiết bị nhận tiền mặt',
          image: '/images/products/payout.png',
          price: 'Liên hệ',
          features: [
            'Nhận mệnh giá từ 1.000VND-500.000VND',
            'Hỗ trợ trả lại tiền thừa/không hỗ trợ trả lại tiền thừa',
            'Sức chứa lên đến 1000 tờ'
          ]
        },
        {
          id: 6,
          name: 'Thiết bị điểm danh',
          image: '/images/products/diemdanh1.jpg',
          price: 'Liên hệ',
          features: [
            'Màn hình hiển thị thông báo điểm danh',
            'Thiết bị âm thanh',
            'Đọc thẻ nhanh'
          ]
        },
        {
          id: 7,
          name: 'Thiết bị cân điện tử',
          image: '/images/products/candientu1.jpg',
          price: 'Liên hệ',
          features: [
            'Giao diện điều khiển HMI (trên máy cân).',
            'Phần cứng kết nối IOT',
            'Nền tảng giám sát từ xa'
          ]
        }
        
      ],
      software: [
        {
          id: 1,
          name: 'Thiết Kế Phần Mềm',
          image: '/images/products/soft.jpg',
          price: 'Liên hệ',
          features: [
            'Các app giao dịch.',
            'Các web giao dịch.',
            'Các phần mềm bán vé cho các hãng vận tải hành khách.',
            'Các phần mềm giao dịch thanh toán và quản lý tập chung cho các khu vui chơi giải trí.',
          ]
        },
      ]
    },
    EN: {
      hardware: [
        {
          id: 1,
          name: 'Citizen ID Card Reader',
          image: '/images/products/mayquetcccd.png',
          price: '15,000,000 VND',
          features: [
            'CCCD chip reader device',
            'Support: Windows / Linux / Android',
            'Power supply: Via USB port',
            'Can connect to other devices via USB',
            'Scanner: Fast and accurate QR code scanning',
            'Signal indicator: Status LED with sound',
            'Main function: Read ID information, Name, Photo, Fingerprint'
          ]
        },
        {
          id: 2,
          name: 'Automatic Payment Kiosk',
          image: '/images/products/kiot1.png',
          price: '100,000,000 VND',
          features: [
            'Kiosk enclosure',
            '2 Dell 21-inch displays',
            'VND bill acceptor',
            'NFC card reader',
            'POS machine',
            'Printer'
          ]
        },
        {
          id: 3,
          name: 'Automatic Payment Kiosk (32 inch)',
          image: '/images/products/kiot2.png',
          price: '80,000,000 VND',
          features: [
            'Kiosk enclosure',
            '32-inch display',
            'NFC card reader',
            'POS machine',
            'Printer'
          ]
        },
        {
          id: 4,
          name: 'Cash Register Machine',
          image: '/images/products/maythungan.png',
          price: '50,000,000 VND',
          features: [
            'Cash register enclosure',
            'VND bill acceptor',
            'LCD display 320x240',
            'Numeric keypad'
          ]
        },
        {
          id: 5,
          name: 'Cash Payout Device',
          image: '/images/products/payout.png',
          price: 'Contact',
          features: [
            'Accept denominations from 1,000VND-500,000VND',
            'With/without change return support',
            'Capacity up to 1000 bills'
          ]
        },
                {
          id: 6,
          name: 'Attendance Device',
          image: '/images/products/diemdanh1.jpg',
          price: 'Contact',
          features: [
            'Attendance Notification Display',
            'Sound Device',
            'Fast Card Reading'
          ]
        },
        {
          id: 7,
          name: 'Remote Monitoring Electronic Scale System',
          image: '/images/products/candientu1.jpg',
          price: 'Contact',
          features: [
            'HMI control interface (on the weighing machine)',
            'IoT connection hardware',
            'Remote monitoring platform'
          ]
        }
      ],
      software: [
        {
          id: 1,
          name: 'Software Development',
          image: '/images/products/soft.jpg',
          price: 'Contact',
          features: [
            'Transaction apps.',
            'Transaction websites.',
            'Ticketing software for passenger transport companies.',
            'Payment transaction and centralized management software for entertainment areas.',
          ]
        },
      ]
    }
  };
  return products[language] || products.VN;
};

const ServiceDetails = () => {
  const [activeTab, setActiveTab] = useState('hardware');
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const productsData = getProductsData(currentLanguage);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 3 products per page

  // Calculate pagination for current tab
  const currentProducts = productsData[activeTab];
  const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedProducts = currentProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber, shouldScroll = false) => {
    setCurrentPage(pageNumber);
    if (shouldScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset to page 1 when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={t('nav.products')}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={t('nav.products')}
        bgImage={'/images/solutions/service1.jpg'}
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
            <p
              className='font-FiraSans text-TextColor2-0 text-lg max-w-3xl mx-auto'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='100'
            >
              {t('service.description')}
            </p>
          </div>

          {/* Tab Navigation */}
          <div
            className='flex justify-center mb-12'
            data-aos='fade-up'
            data-aos-duration='800'
            data-aos-delay='200'
          >
            <div className='bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg'>
              <button
                onClick={() => handleTabChange('hardware')}
                className={`px-8 py-3 rounded-md font-FiraSans font-medium transition-all duration-300 ${
                  activeTab === 'hardware'
                    ? 'bg-PrimaryColor-0 dark:bg-green-600 text-white'
                    : 'text-HeadingColor-0 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {currentLanguage === 'VN' ? 'Phần cứng' : 'Hardware'}
              </button>
              <button
                onClick={() => handleTabChange('software')}
                className={`px-8 py-3 rounded-md font-FiraSans font-medium transition-all duration-300 ${
                  activeTab === 'software'
                    ? 'bg-PrimaryColor-0 dark:bg-green-600 text-white'
                    : 'text-HeadingColor-0 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {currentLanguage === 'VN' ? 'Phần mềm' : 'Software'}
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`grid gap-8 items-start ${
                currentPage === totalPages && displayedProducts.length === 1
                  ? 'grid-cols-1 max-w-md mx-auto'
                  : currentPage === totalPages && displayedProducts.length === 2
                  ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {displayedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className='bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full'
                  data-aos='fade-up'
                  data-aos-duration='800'
                  data-aos-delay={300 + (index * 100)}
                >
                <div className='relative overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-64 object-contain p-4 transition-transform duration-300 hover:scale-105'
                    onError={(e) => {
                      e.target.src = '/images/placeholder-product.png';
                    }}
                  />
                </div>
                <div className='p-6 flex flex-col flex-grow'>
                  <h3 className='font-FiraSans font-semibold text-xl text-HeadingColor-0 dark:text-white mb-4 min-h-[3rem] flex items-center'>
                    {product.name}
                  </h3>
                  <ul className='space-y-2 mb-6 flex-grow'>
                    {product.features.map((feature, index) => (
                      <li key={index} className='font-FiraSans text-TextColor2-0 dark:text-gray-300 text-sm flex items-start gap-2'>
                        <span className='text-PrimaryColor-0 dark:text-green-400 mt-1 flex-shrink-0'>•</span>
                        <span className='leading-relaxed'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className='flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700'>
                    <div className='text-2xl font-FiraSans font-bold text-PrimaryColor-0 dark:text-green-400'>
                      {product.price}
                    </div>
                    <button className='bg-PrimaryColor-0 dark:bg-green-600 text-white px-6 py-2 rounded-lg font-FiraSans font-medium hover:bg-opacity-90 transition-all duration-300 whitespace-nowrap'>
                      {currentLanguage === 'VN' ? 'Xem chi tiết' : 'View Details'}
                    </button>
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
        </div>
      </section>

      <Counter />
    </>
  );
};

export default ServiceDetails;
