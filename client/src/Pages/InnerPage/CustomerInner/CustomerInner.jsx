import { FaArrowRightLong } from 'react-icons/fa6';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getTranslation } from '../../../utils/translations';

const getCustomerData = (language) => {
  const data = {
    VN: {
      pageTitle: 'Khách Hàng Của Chúng Tôi',
      pageDescription: 'Những đối tác và khách hàng tin tưởng sử dụng sản phẩm, dịch vụ của chúng tôi.',
      partnersTitle: 'Đối Tác Của Chúng Tôi',
      statisticsTitle: 'Thống Kê Khách Hàng',
      stats: {
        businesses: 'Khách hàng doanh nghiệp',
        banks: 'Ngân hàng và tổ chức tài chính',
        government: 'Cơ quan nhà nước',
        satisfaction: 'Độ hài lòng khách hàng'
      }
    },
    EN: {
      pageTitle: 'Our Customers',
      pageDescription: 'Trusted partners and customers using our products and services.',
      partnersTitle: 'Our Partners',
      statisticsTitle: 'Customer Statistics',
      stats: {
        businesses: 'Business customers',
        banks: 'Banks and financial institutions',
        government: 'Government agencies',
        satisfaction: 'Customer satisfaction'
      }
    }
  };
  return data[language] || data.VN;
};

const CustomerInner = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const customerData = getCustomerData(currentLanguage);

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={t('nav.customers')}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={t('nav.customers')}
        bgImage={'/images/solutions/customer1.jpg'}
      />
      <section className='py-[120px] bg-BodyBg4-0 dark:bg-gray-900'>
        <div className='Container'>
          <div className='text-center mb-16'>
            <h1
              className='font-FiraSans font-semibold text-4xl sm:text-5xl text-HeadingColor-0 dark:text-white mb-6'
              data-aos='fade-up'
              data-aos-duration='800'
            >
              {customerData.pageTitle}
            </h1>
            <p
              className='font-FiraSans text-TextColor2-0 dark:text-gray-300 text-lg max-w-3xl mx-auto'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='100'
            >
              {customerData.pageDescription}
            </p>
          </div>

          {/* Customer logos section */}
          <div
            className='bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-16'
            data-aos='fade-up'
            data-aos-duration='800'
            data-aos-delay='200'
          >
            <h2 className='font-FiraSans font-semibold text-3xl text-HeadingColor-0 dark:text-white mb-8 text-center'>
              {customerData.partnersTitle}
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              <div className='bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600 p-8 hover:shadow-xl transition-all duration-300 group'>
                <div className='flex justify-center items-center h-20'>
                  <img
                    src='/images/partners/thegioididong.png'
                    alt='Thế Giới Di Động'
                    className='h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
              </div>
              <div className='bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600 p-8 hover:shadow-xl transition-all duration-300 group'>
                <div className='flex justify-center items-center h-20'>
                  <img
                    src='/images/partners/asim.png'
                    alt='ASIM Consulting'
                    className='h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
              </div>
              <div className='bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600 p-8 hover:shadow-xl transition-all duration-300 group'>
                <div className='flex justify-center items-center h-20'>
                  <img
                    src='/images/partners/sb.jpg'
                    alt='SB ISO 9001:2015'
                    className='h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
              </div>
              <div className='bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600 p-8 hover:shadow-xl transition-all duration-300 group'>
                <div className='flex justify-center items-center h-20'>
                  <img
                    src='/images/partners/greenhouse.png'
                    alt='Green House'
                    className='h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
              </div>
              <div className='bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600 p-8 hover:shadow-xl transition-all duration-300 group'>
                <div className='flex justify-center items-center h-20'>
                  <img
                    src='https://www.i-resort.vn/assets/images/brand/i-resort-logo.svg'
                    alt='I-Resort'
                    className='h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
              </div>
              <div className='bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600 p-8 hover:shadow-xl transition-all duration-300 group'>
                <div className='flex justify-center items-center h-20'>
                  <img
                    src='https://www.finviet.com.vn/wp-content/uploads/2024/08/logo.png'
                    alt='Finviet'
                    className='h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
              </div>
              <div className='bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600 p-8 hover:shadow-xl transition-all duration-300 group'>
                <div className='flex justify-center items-center h-20'>
                  <img
                    src='/images/partners/phutho.png'
                    alt='Phu Tho Tourist'
                    className='h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
              </div>
              <div className='bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600 p-8 hover:shadow-xl transition-all duration-300 group'>
                <div className='flex justify-center items-center h-20'>
                  <img
                    src='/images/partners/dha.png'
                    alt='DHA Corporation'
                    className='h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className='bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg'
            data-aos='fade-up'
            data-aos-duration='800'
            data-aos-delay='300'
          >
            <h2 className='font-FiraSans font-semibold text-3xl text-HeadingColor-0 dark:text-white mb-6 text-center'>
              {customerData.statisticsTitle}
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8 text-center'>
              <div>
                <div className='text-4xl font-FiraSans font-bold text-PrimaryColor-0 dark:text-green-400 mb-2'>500+</div>
                <p className='font-FiraSans text-TextColor2-0 dark:text-gray-300'>{customerData.stats.businesses}</p>
              </div>
              <div>
                <div className='text-4xl font-FiraSans font-bold text-PrimaryColor-0 dark:text-green-400 mb-2'>50+</div>
                <p className='font-FiraSans text-TextColor2-0 dark:text-gray-300'>{customerData.stats.banks}</p>
              </div>
              <div>
                <div className='text-4xl font-FiraSans font-bold text-PrimaryColor-0 dark:text-green-400 mb-2'>100+</div>
                <p className='font-FiraSans text-TextColor2-0 dark:text-gray-300'>{customerData.stats.government}</p>
              </div>
              <div>
                <div className='text-4xl font-FiraSans font-bold text-PrimaryColor-0 dark:text-green-400 mb-2'>98%</div>
                <p className='font-FiraSans text-TextColor2-0 dark:text-gray-300'>{customerData.stats.satisfaction}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerInner;
