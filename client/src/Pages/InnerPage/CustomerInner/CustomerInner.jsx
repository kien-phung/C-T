import { FaArrowRightLong } from 'react-icons/fa6';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';

const CustomerInner = () => {
  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Khách Hàng'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Khách Hàng'}
        bgImage={'/images/solutions/customer1.jpg'}
      />
      <section className='py-[120px] bg-BodyBg4-0'>
        <div className='Container'>
          <div className='text-center mb-16'>
            <h1 className='font-FiraSans font-semibold text-4xl sm:text-5xl text-HeadingColor-0 mb-6'>
              Khách Hàng Của Chúng Tôi
            </h1>
            <p className='font-FiraSans text-TextColor2-0 text-lg max-w-3xl mx-auto'>
              Những đối tác và khách hàng tin tưởng sử dụng sản phẩm, dịch vụ của chúng tôi.
            </p>
          </div>
          
          {/* Customer logos section */}
          <div className='bg-white rounded-2xl p-8 shadow-lg mb-16'>
            <h2 className='font-FiraSans font-semibold text-3xl text-HeadingColor-0 mb-8 text-center'>
              Đối Tác Của Chúng Tôi
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              <div className='bg-white rounded-lg shadow-shades border border-gray-100 p-8 hover:shadow-xl transition-all duration-500 hover:scale-105'>
                <div className='flex justify-center items-center h-20'>
                  <img 
                    src='/images/partners/thegioididong.png' 
                    alt='Thế Giới Di Động' 
                    className='h-16 w-auto object-contain'
                  />
                </div>
              </div>
              <div className='bg-white rounded-lg shadow-shades border border-gray-100 p-8 hover:shadow-xl transition-all duration-500 hover:scale-105'>
                <div className='flex justify-center items-center h-20'>
                  <img 
                    src='/images/partners/asim.png' 
                    alt='ASIM Consulting' 
                    className='h-16 w-auto object-contain'
                  />
                </div>
              </div>
              <div className='bg-white rounded-lg shadow-shades border border-gray-100 p-8 hover:shadow-xl transition-all duration-500 hover:scale-105'>
                <div className='flex justify-center items-center h-20'>
                  <img 
                    src='/images/partners/sb.jpg' 
                    alt='SB ISO 9001:2015' 
                    className='h-16 w-auto object-contain'
                  />
                </div>
              </div>
              <div className='bg-white rounded-lg shadow-shades border border-gray-100 p-8 hover:shadow-xl transition-all duration-500 hover:scale-105'>
                <div className='flex justify-center items-center h-20'>
                  <img 
                    src='/images/partners/greenhouse.png' 
                    alt='Green House' 
                    className='h-16 w-auto object-contain'
                  />
                </div>
              </div>
              <div className='bg-white rounded-lg shadow-shades border border-gray-100 p-8 hover:shadow-xl transition-all duration-500 hover:scale-105'>
                <div className='flex justify-center items-center h-20'>
                  <img 
                    src='https://www.i-resort.vn/assets/images/brand/i-resort-logo.svg' 
                    alt='I-Resort' 
                    className='h-16 w-auto object-contain'
                  />
                </div>
              </div>
              <div className='bg-white rounded-lg shadow-shades border border-gray-100 p-8 hover:shadow-xl transition-all duration-500 hover:scale-105'>
                <div className='flex justify-center items-center h-20'>
                  <img 
                    src='https://www.finviet.com.vn/wp-content/uploads/2024/08/logo.png' 
                    alt='Finviet' 
                    className='h-16 w-auto object-contain'
                  />
                </div>
              </div>
              <div className='bg-white rounded-lg shadow-shades border border-gray-100 p-8 hover:shadow-xl transition-all duration-500 hover:scale-105'>
                <div className='flex justify-center items-center h-20'>
                  <img 
                    src='/images/partners/phutho.png' 
                    alt='Phu Tho Tourist' 
                    className='h-16 w-auto object-contain'
                  />
                </div>
              </div>
              <div className='bg-white rounded-lg shadow-shades border border-gray-100 p-8 hover:shadow-xl transition-all duration-500 hover:scale-105'>
                <div className='flex justify-center items-center h-20'>
                  <img 
                    src='/images/partners/dha.png' 
                    alt='DHA Corporation' 
                    className='h-16 w-auto object-contain'
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className='bg-white rounded-2xl p-8 shadow-lg'>
            <h2 className='font-FiraSans font-semibold text-3xl text-HeadingColor-0 mb-6 text-center'>
              Thống Kê Khách Hàng
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8 text-center'>
              <div>
                <div className='text-4xl font-FiraSans font-bold text-PrimaryColor-0 mb-2'>500+</div>
                <p className='font-FiraSans text-TextColor2-0'>Khách hàng doanh nghiệp</p>
              </div>
              <div>
                <div className='text-4xl font-FiraSans font-bold text-PrimaryColor-0 mb-2'>50+</div>
                <p className='font-FiraSans text-TextColor2-0'>Ngân hàng và tổ chức tài chính</p>
              </div>
              <div>
                <div className='text-4xl font-FiraSans font-bold text-PrimaryColor-0 mb-2'>100+</div>
                <p className='font-FiraSans text-TextColor2-0'>Cơ quan nhà nước</p>
              </div>
              <div>
                <div className='text-4xl font-FiraSans font-bold text-PrimaryColor-0 mb-2'>98%</div>
                <p className='font-FiraSans text-TextColor2-0'>Độ hài lòng khách hàng</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerInner;