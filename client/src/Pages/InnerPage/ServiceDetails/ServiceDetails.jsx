import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useState } from 'react';
import Counter from './Counter/Counter';

const ServiceDetails = () => {
  const [activeTab, setActiveTab] = useState('hardware');

  const hardwareProducts = [
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
  ];

  const softwareProducts = [
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
  ];

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Sản Phẩm'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Sản Phẩm'}
        // Example: pass a custom breadcrumb background image located in public/images/
        bgImage={'/images/solutions/service1.jpg'}
      />
      
      <section className='py-[120px] bg-BodyBg4-0'>
        <div className='Container'>
          {/* Header Section */}
          <div className='text-center mb-16'>
            <h1 className='font-FiraSans font-semibold text-4xl sm:text-5xl text-HeadingColor-0 mb-6'>
              Điện tử C&T
            </h1>
            <p className='font-FiraSans text-TextColor2-0 text-lg max-w-3xl mx-auto'>
              Chúng tôi cung cấp các giải pháp phần cứng và phần mềm tiên tiến, 
              đáp ứng mọi nhu cầu của doanh nghiệp hiện đại.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className='flex justify-center mb-12'>
            <div className='bg-white rounded-lg p-2 shadow-lg'>
              <button
                onClick={() => setActiveTab('hardware')}
                className={`px-8 py-3 rounded-md font-FiraSans font-medium transition-all duration-300 ${
                  activeTab === 'hardware'
                    ? 'bg-PrimaryColor-0 text-white'
                    : 'text-HeadingColor-0 hover:bg-gray-100'
                }`}
              >
                Phần cứng
              </button>
              <button
                onClick={() => setActiveTab('software')}
                className={`px-8 py-3 rounded-md font-FiraSans font-medium transition-all duration-300 ${
                  activeTab === 'software'
                    ? 'bg-PrimaryColor-0 text-white'
                    : 'text-HeadingColor-0 hover:bg-gray-100'
                }`}
              >
                Phần mềm
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start'>
            {(activeTab === 'hardware' ? hardwareProducts : softwareProducts).map(product => (
              <div key={product.id} className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full'>
                <div className='relative overflow-hidden bg-gray-50 flex items-center justify-center'>
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
                  <h3 className='font-FiraSans font-semibold text-xl text-HeadingColor-0 mb-4 min-h-[3rem] flex items-center'>
                    {product.name}
                  </h3>
                  <ul className='space-y-2 mb-6 flex-grow'>
                    {product.features.map((feature, index) => (
                      <li key={index} className='font-FiraSans text-TextColor2-0 text-sm flex items-start gap-2'>
                        <span className='text-PrimaryColor-0 mt-1 flex-shrink-0'>•</span>
                        <span className='leading-relaxed'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className='flex items-center justify-between mt-auto pt-4 border-t border-gray-100'>
                    <div className='text-2xl font-FiraSans font-bold text-PrimaryColor-0'>
                      {product.price}
                    </div>
                    <button className='bg-PrimaryColor-0 text-white px-6 py-2 rounded-lg font-FiraSans font-medium hover:bg-opacity-90 transition-all duration-300 whitespace-nowrap'>
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Counter />
    </>
  );
};

export default ServiceDetails;
