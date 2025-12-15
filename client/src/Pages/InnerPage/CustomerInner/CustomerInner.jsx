import { FaArrowRightLong } from 'react-icons/fa6';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getTranslation } from '../../../utils/translations';
import { useEffect, useMemo, useState } from 'react';
import { getPublicCustomers } from '../../../api/api';
import { socket } from '../../../api/socket';

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

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const sortedCustomers = useMemo(() => {
    return [...customers].sort((a, b) => {
      const ao = Number(a.display_order ?? 0);
      const bo = Number(b.display_order ?? 0);
      if (ao !== bo) return ao - bo;
      const at = new Date(a.createdAt ?? 0).getTime();
      const bt = new Date(b.createdAt ?? 0).getTime();
      return bt - at;
    });
  }, [customers]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await getPublicCustomers();
      const list = res?.data?.customers ?? [];
      setCustomers(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Failed to load customers', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();

    const handler = () => fetchCustomers();
    socket.on('customers.changed', handler);
    return () => {
      socket.off('customers.changed', handler);
    };
  }, []);

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

          {/* Customer logos section (dynamic, realtime) */}
          <div
            className='bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-16'
            data-aos='fade-up'
            data-aos-duration='800'
            data-aos-delay='200'
          >
            <h2 className='font-FiraSans font-semibold text-3xl text-HeadingColor-0 dark:text-white mb-8 text-center'>
              {customerData.partnersTitle}
            </h2>
            {loading ? (
              <div className='text-center py-6'>
                <span className='text-gray-800 dark:text-white'>Loading...</span>
              </div>
            ) : sortedCustomers.length === 0 ? (
              <div className='text-center py-6'>
                <span className='text-gray-800 dark:text-white'>Không có dữ liệu</span>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {sortedCustomers.map((c) => (
                  <a
                    key={c._id}
                    href={c.website_url || '#'}
                    target={c.website_url ? '_blank' : undefined}
                    rel={c.website_url ? 'noopener noreferrer' : undefined}
                    className='bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600 p-8 hover:shadow-xl transition-all duration-300 group'
                  >
                    <div className='flex justify-center items-center h-20'>
                      <img
                        src={c.logo}
                        alt={c.name || 'Customer logo'}
                        className='h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105'
                      />
                    </div>
                  </a>
                ))}
              </div>
            )}
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
