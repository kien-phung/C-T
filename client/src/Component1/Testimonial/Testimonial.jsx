import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import TestimonialCard from './TestimonialCard';
import border from '/images/hero_border.png';
import certificate1 from '/images/certificate1.jpg';
import certificate2 from '/images/certificate2.jpg';
import testiQuote from '/images/quote.png';
import CountUp from 'react-countup';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import serviceShape2 from '/images/about_shape_3.png';
import serviceShape3 from '/images/service_shpe2.png';
import serviceShape4 from '/images/tir.png';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';

const getCertificateData = (language) => {
  const certificates = {
    VN: [
      {
        id: 1,
        testiThumb: certificate1,
        testiQuote: testiQuote,
        testiDesc: `Giấy chứng nhận doanh nghiệp khoa học và công nghệ được cấp bởi Sở Khoa học và Công nghệ TP.HCM.`,
        testiRatingIcon: <MdOutlineStarPurple500 />,
        testiName: 'Giấy Chứng Nhận DNCNTT',
        testiDesignation: 'Số: 45/ĐK-DNKHCN - Năm 2018',
      },
      {
        id: 2,
        testiThumb: certificate2,
        testiQuote: testiQuote,
        testiDesc: `Bằng độc quyền giải pháp hữu ích số 2845 về "Phương pháp thanh toán linh hoạt được thực hiện tại thiết bị thanh toán tự động" được cấp bởi Cục Sở hữu trí tuệ.`,
        testiRatingIcon: <MdOutlineStarPurple500 />,
        testiName: 'Bằng Độc Quyền Giải Pháp',
        testiDesignation: 'Số: 2845 - Năm 2020',
      },
    ],
    EN: [
      {
        id: 1,
        testiThumb: certificate1,
        testiQuote: testiQuote,
        testiDesc: `Science and technology enterprise certificate issued by the Department of Science and Technology of Ho Chi Minh City.`,
        testiRatingIcon: <MdOutlineStarPurple500 />,
        testiName: 'Science & Technology Enterprise Certificate',
        testiDesignation: 'No: 45/ĐK-DNKHCN - Year 2018',
      },
      {
        id: 2,
        testiThumb: certificate2,
        testiQuote: testiQuote,
        testiDesc: `Utility solution patent No. 2845 for "Flexible payment method implemented at automatic payment device" issued by the Intellectual Property Office.`,
        testiRatingIcon: <MdOutlineStarPurple500 />,
        testiName: 'Utility Solution Patent',
        testiDesignation: 'No: 2845 - Year 2020',
      },
    ],
  };
  return certificates[language] || certificates.VN;
};

const Testimonial = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const testiData = getCertificateData(currentLanguage);

  const settings = {
    loop: false,
    spaceBetween: 30,
    speed: 1500,
    autoplay: false,
    pagination: {
      clickable: true,
      el: '.testimonial-pagination',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        pagination: false,
      },
      992: {
        slidesPerView: 2,
        pagination: false,
      },
      1400: {
        slidesPerView: 2,
        pagination: false,
      },
    },
  };

  return (
    <section style={{ backgroundImage: `url(/images/testi_bg.png)` }} className='testimonial pt-20 pb-20 bg-no-repeat bg-cover bg-center relative z-10 overflow-hidden'>
      <div className='absolute -z-10 top-24 right-[35%] hidden 2xl:block animate-rotate'>
        <img
          src={serviceShape4}
          draggable='false'
        />
      </div>
      <div className='absolute -z-10 top-1/4 -left-40 hidden 2xl:block animate-rotate'>
        <img
          src={serviceShape3}
          draggable='false'
        />
      </div>
      <div className='absolute -z-10 right-10 bottom-10 hidden 2xl:block animate-rotate'>
        <img
          src={serviceShape3}
          draggable='false'
        />
      </div>
      <div className='Container'>
        <div className='grid grid-cols-6 lg:grid-cols-12'>
          <div className='col-span-6 lg:col-span-5 text-center lg:text-left'>
            <h5
              className='font-FiraSans font-medium text-sm sm:text-base text-PrimaryColor-0 dark:text-green-400 uppercase mb-3'
              data-aos='fade-right'
              data-aos-duration='800'
            >
              {t('testimonial.sectionTitle')}
            </h5>
            <h1
              className='font-FiraSans font-semibold text-HeadingColor-0 dark:text-white text-[20px] leading-[30px] sm:text-[25px] sm:leading-[35px] md:text-[30px] md:leading-[40px] lg:text-[34px] lg:leading-[44px] xl:text-[40px] xl:leading-[50px] 2xl:text-[42px] 2xl:leading-[52px] relative pb-4'
              data-aos='fade-right'
              data-aos-duration='800'
              data-aos-delay='100'
            >
              {t('testimonial.title')}
              <img
                src={border}
                draggable='false'
                className='absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0'
              />
            </h1>
            <p
              className='font-FiraSans text-lg text-TextColor2-0 dark:text-gray-300 pt-[30px] pb-6 mx-auto lg:mx-0'
              data-aos='fade-right'
              data-aos-duration='800'
              data-aos-delay='200'
            >
              {t('testimonial.subtitle')}
            </p>
            <div className='flex items-center justify-center lg:justify-start gap-[12px] sm:gap-[22px] border-y border-BorderColor-0 dark:border-gray-600 py-[16px] sm:py-[26px] relative sm:mr-10 mb-8 lg:mb-0'>
              <CountUp
                start={0}
                prefix=''
                end={2}
                className='font-FiraSans text-2xl leading-[20px] sm:text-[50px] sm:leading-[42px] xl:text-[56px] xl:leading-[44px] text-PrimaryColor-0 dark:text-green-400 font-medium border-r border-BorderColor-0 dark:border-gray-600 pr-[12px] sm:pr-[22px]'
              />
              <div>
                <ul className='flex gap-[4px] sm:gap-[6px] items-center'>
                  <li className='text-[#ffb609] text-xl'>
                    <MdOutlineStarPurple500 />
                  </li>
                  <li className='text-[#ffb609] text-xl'>
                    <MdOutlineStarPurple500 />
                  </li>
                  <li className='text-[#ffb609] text-xl'>
                    <MdOutlineStarPurple500 />
                  </li>
                  <li className='text-[#ffb609] text-xl'>
                    <MdOutlineStarPurple500 />
                  </li>
                  <li className='text-[#ffb609] text-xl'>
                    <MdOutlineStarPurple500 />
                  </li>
                </ul>
                <p className='font-FiraSans text-sm sm:text-lg text-TextColor2-0 dark:text-gray-300 pt-1'>
                  {t('testimonial.governmentCertified')}
                </p>
              </div>
              <div className='absolute -z-10 top-11  right-6 hidden 2xl:block animate-dance3'>
                <img
                  src={serviceShape2}
                  draggable='false'
                />
              </div>
            </div>
            <h6 className='font-FiraSans text-TextColor2-0 dark:text-gray-300 flex items-center gap-2 pt-[18px] mb-4 lg:mb-0'>
              <span className='text-PrimaryColor-0 dark:text-green-400'>
                <IoIosCheckmarkCircle size={'22'} />
              </span>
              {t('testimonial.governmentCertificate')}
            </h6>
          </div>
          <div
            className='col-span-6 lg:col-span-7 mt-10 lg:mt-0 w-full lg:w-auto'
            data-aos='fade-left'
            data-aos-duration='1000'
            data-aos-delay='200'
          >
            <div className='relative flex flex-col items-center lg:items-start'>
              <Swiper
                {...settings}
                modules={[Pagination]}
                className='testimonial-swiper w-full'
              >
                <div className='swiper-wrapper' style={{ alignItems: 'stretch' }}>
                  {testiData.map(
                    ({
                      id,
                      testiThumb,
                      testiQuote,
                      testiRatingIcon,
                      testiName,
                      testiDesignation,
                      testiDesc,
                    }) => {
                      return (
                        <SwiperSlide key={id} style={{ height: 'auto', display: 'flex' }}>
                          <div className='pb-[52px] w-full flex'>
                            <TestimonialCard
                              testiThumb={testiThumb}
                              testiQuote={testiQuote}
                              testiRatingIcon={testiRatingIcon}
                              testiName={testiName}
                              testiDesignation={testiDesignation}
                              testiDesc={testiDesc}
                            />
                          </div>
                        </SwiperSlide>
                      );
                    }
                  )}
                </div>
              </Swiper>
            </div>
          </div>
        </div>
        {/* Mobile Pagination Dots - Outside Grid for Full Width */}
        <div className='lg:hidden w-full flex justify-center mt-4 mb-4'>
          <div className='testimonial-pagination'></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
