import { FaArrowRightLong } from 'react-icons/fa6';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import { Link } from 'react-router-dom';
const AboutInner = () => {
  const solutions = [
    {
      id: 1,
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
      title: 'Cổng tự động',
      description: 'Cung cấp giải pháp cổng tự động cho các khu vui chơi, tòa nhà,...',
      image: '/images/solutions/tudong.jpg',
      details: [
        'Cổng barrier tự động',
        'Nhận diện biển số xe',
        'Hệ thống kiểm soát ra vào',
        'Tích hợp camera an ninh'
      ]
    }
  ];

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Giải Pháp'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Giải Pháp'}
        bgImage={'/images/solutions/about1.jpg'}
      />
      
      <section className='py-[120px] bg-BodyBg4-0'>
        <div className='Container'>
          {/* Header Section */}
          <div className='text-center mb-16'>
            <h1 className='font-FiraSans font-semibold text-4xl sm:text-5xl text-HeadingColor-0 mb-6'>
              Điện tử C&T
            </h1>
            <h2 className='font-FiraSans font-semibold text-3xl text-HeadingColor-0 mb-6'>
              Giải pháp
            </h2>
            <p className='font-FiraSans text-TextColor2-0 text-lg max-w-3xl mx-auto'>
              Chúng tôi cung cấp các giải pháp công nghệ toàn diện, 
              đáp ứng nhu cầu đa dạng của các lĩnh vực khác nhau.
            </p>
          </div>

          {/* Solutions Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {solutions.map(solution => (
              <div key={solution.id} className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col h-full'>
                <div className='relative overflow-hidden'>
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className='w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105'
                    onError={(e) => {
                      e.target.src = '/images/placeholder-solution.png';
                    }}
                  />
                  <div className='absolute inset-0 bg-PrimaryColor-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300'></div>
                </div>
                <div className='p-6 flex flex-col flex-grow'>
                  <h3 className='font-FiraSans font-semibold text-xl text-HeadingColor-0 mb-3'>
                    {solution.title}
                  </h3>
                  <p className='font-FiraSans text-TextColor2-0 mb-4'>
                    {solution.description}
                  </p>
                  <ul className='space-y-2 mb-6'>
                    {solution.details.map((detail, index) => (
                      <li key={index} className='font-FiraSans text-TextColor2-0 text-sm flex items-start gap-2'>
                        <span className='text-PrimaryColor-0 mt-1'>•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <div className='mt-auto'>
                    <button className='w-full bg-PrimaryColor-0 text-white px-6 py-3 rounded-lg font-FiraSans font-medium hover:bg-opacity-90 transition-all duration-300'>
                      Tìm hiểu thêm
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className='mt-16 text-center'>
            <div className='bg-white rounded-2xl p-8 shadow-lg'>
              <h3 className='font-FiraSans font-semibold text-2xl text-HeadingColor-0 mb-4'>
                Bạn cần giải pháp riêng cho doanh nghiệp?
              </h3>
              <p className='font-FiraSans text-TextColor2-0 mb-6'>
                Liên hệ với chúng tôi để nhận tư vấn miễn phí và thiết kế giải pháp phù hợp nhất.
              </p>
              <Link
                  to="/contact" 
                  className='bg-PrimaryColor-0 text-white px-8 py-3 rounded-lg font-FiraSans font-medium hover:bg-opacity-90 transition-all duration-300'
              >
                Liên hệ ngay
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutInner;
