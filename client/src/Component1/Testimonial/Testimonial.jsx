/* eslint-disable no-unused-vars */
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

const testiData = [
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
];

const Testimonial = () => {
  const settings = {
    loop: true,
    spaceBetween: 30,
    speed: 1500,
    autoplay: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 2,
      },
      1400: {
        slidesPerView: 2,
      },
    },
  };
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + ' pagination-bullet"></span>';
    },
  };
  return (
    <section className='testimonial pt-28 pb-[220px] bg-[url(/images/testi_bg.png)] bg-no-repeat bg-cover bg-center relative z-10 overflow-hidden'>
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
          <div className='col-span-6 lg:col-span-5'>
            <h5 className='font-FiraSans font-medium text-sm sm:text-base text-PrimaryColor-0 uppercase mb-3'>
              CHỨNG CHỈ & GIẢI THƯỞNG
            </h5>
            <h1 className='font-FiraSans font-semibold text-HeadingColor-0 text-[16px] leading-[26px] sm:text-[25px] sm:leading-[35px] md:text-[30px] md:leading-[40px] lg:text-[34px] lg:leading-[44px] xl:text-[40px] xl:leading-[50px] 2xl:text-[42px] 2xl:leading-[52px] relative pb-4'>
              Được Công Nhận Bởi <br /> Các Cơ Quan Nhà Nước
              <img
                src={border}
                draggable='false'
                className='absolute bottom-0 left-0'
              />
            </h1>
            <p className='font-FiraSans text-lg text-TextColor2-0 pt-[30px] pb-6'>
              Chứng nhận năng lực công nghệ và bảo vệ sở hữu trí tuệ{' '}
              <br className='hidden sm:block lg:hidden xl:block' />
              phát triển giải pháp thanh toán tiên tiến
            </p>
            <div className='flex items-center gap-[22px] border-y border-BorderColor-0 py-[26px] relative sm:mr-10'>
              <CountUp
                start={0}
                prefix=''
                end={2}
                className='font-FiraSans text-3xl leading-[22px] sm:text-[50px] sm:leading-[42px] xl:text-[56px] xl:leading-[44px] text-PrimaryColor-0 font-medium border-r border-BorderColor-0 pr-[22px]'
              />
              <div>
                <ul className='flex gap-[6px] items-center'>
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
                <p className='font-FiraSans text-lg text-TextColor2-0 pt-1'>
                  Chứng Nhận Chính Thức
                </p>
              </div>
              <div className='absolute -z-10 top-11  right-6 hidden 2xl:block animate-dance3'>
                <img
                  src={serviceShape2}
                  draggable='false'
                />
              </div>
            </div>
            <h6 className='font-FiraSans text-TextColor2-0 flex items-center gap-2 pt-[18px]'>
              <span className='text-PrimaryColor-0'>
                <IoIosCheckmarkCircle size={'22'} />
              </span>
              Được Công Nhận Bởi Nhà Nước
            </h6>
          </div>
          <div className='col-span-6 lg:col-span-7 mt-10 lg:mt-0'>
            <Swiper
              {...settings}
              modules={[]}
              className='testimonial-swiper'
              style={{ '--swiper-wrapper-height': 'auto' }}
            >
              <div>
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
                      <SwiperSlide key={id}>
                        <div className='pb-[52px] h-full'>
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
    </section>
  );
};

export default Testimonial;
