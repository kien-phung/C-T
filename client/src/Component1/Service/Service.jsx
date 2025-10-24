import serviceThumb from "/images/projects/resort.jpg";
import serviceThumb2 from "/images/projects/greenhouse.jpg";
import serviceThumb3 from "/images/projects/kumho.jpg";
import thumbIcon from '/images/service_icon.png';
import serviceThumbShape from '/images/service_shpe.png';
import serviceShape from '/images/box.png';
import serviceShape2 from '/images/service_shape.png';
import serviceShape3 from '/images/service_shpe2.png';
import contentShape from '/images/service_dot2.png';
import serviceShape4 from '/images/tir.png';
import border from '/images/hero_border.png';
import ServiceCard from "./ServiceCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import "swiper/css";
import "swiper/css/pagination";

const getServiceData = (language) => {
  const services = {
    VN: [
      {
        id: 1,
        serviceTitle: 'I-Resort Nha Trang',
        serviceDesc: 'Hệ thống thanh toán tự động',
        serviceThumb: serviceThumb,
        serviceThumbShape: serviceThumbShape,
        thumbIcon: thumbIcon,
        contentShape: contentShape,
      },
      {
        id: 2,
        serviceTitle: 'Green House Cultural JSC',
        serviceDesc: 'Hệ thống căn tin tự động',
        serviceThumb: serviceThumb2,
        serviceThumbShape: serviceThumbShape,
        thumbIcon: thumbIcon,
        contentShape: contentShape,
      },
      {
        id: 3,
        serviceTitle: 'Kumho Samco Buslines',
        serviceDesc: 'Hệ thống thanh toán tự động',
        serviceThumb: serviceThumb3,
        serviceThumbShape: serviceThumbShape,
        thumbIcon: thumbIcon,
        contentShape: contentShape,
      },
    ],
    EN: [
      {
        id: 1,
        serviceTitle: 'I-Resort Nha Trang',
        serviceDesc: 'Automatic payment system',
        serviceThumb: serviceThumb,
        serviceThumbShape: serviceThumbShape,
        thumbIcon: thumbIcon,
        contentShape: contentShape,
      },
      {
        id: 2,
        serviceTitle: 'Green House Cultural JSC',
        serviceDesc: 'Automatic canteen system',
        serviceThumb: serviceThumb2,
        serviceThumbShape: serviceThumbShape,
        thumbIcon: thumbIcon,
        contentShape: contentShape,
      },
      {
        id: 3,
        serviceTitle: 'Kumho Samco Buslines',
        serviceDesc: 'Automatic payment system',
        serviceThumb: serviceThumb3,
        serviceThumbShape: serviceThumbShape,
        thumbIcon: thumbIcon,
        contentShape: contentShape,
      },
    ]
  };
  return services[language] || services.VN;
};

const Service = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const ServiceData = getServiceData(currentLanguage);

  const settings = {
    loop: false,
    spaceBetween: 30,
    speed: 1000,
    initialSlide: 0,
    centeredSlides: false,
    autoplay: false,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 3,
      },
    },
  };

    // pagination removed to avoid dots that change slides

  return (
    <section className='Service relative z-10 pt-10 pb-20 bg-gradient-to-t to-BodyBg-0 dark:to-gray-900 from-transparent'>
      <div className='absolute -z-10 top-28 left-[22%] hidden 2xl:block animate-rotate'>
        <img
          src={serviceShape}
          draggable='false'
        />
      </div>
      <div className='absolute -z-10 top-40 right-[11rem] hidden 2xl:block animate-rotate'>
        <img
          src={serviceShape3}
          draggable='false'
        />
      </div>
      <div className='absolute -z-10 bottom-52 left-32 hidden 2xl:block animate-wiggle'>
        <img
          src={serviceShape2}
          draggable='false'
        />
      </div>
      <div className='absolute -z-10 top-36 right-[22%] hidden 2xl:block animate-rotate'>
        <img
          src={serviceShape4}
          draggable='false'
        />
      </div>
      <div className='Container'>
        <div className='text-center'>
          <h5
            className='font-FiraSans font-medium text-sm sm:text-base text-PrimaryColor-0 uppercase mb-3'
            data-aos='fade-up'
            data-aos-duration='800'
          >
            {t('portfolio.sectionTitle')}
          </h5>
          <h1
            className='font-FiraSans font-semibold text-HeadingColor-0 inline-block text-[20px] leading-[30px] sm:text-[25px] sm:leading-[35px] md:text-[30px] md:leading-[40px] lg:text-[34px] lg:leading-[44px] xl:text-[40px] xl:leading-[50px] 2xl:text-[42px] 2xl:leading-[52px] relative pb-4'
            data-aos='fade-up'
            data-aos-duration='800'
            data-aos-delay='100'
          >
            {t('portfolio.title')}
            <img
              src={border}
              draggable='false'
              className='absolute bottom-0 left-1/2 -translate-x-1/2'
            />
          </h1>
        </div>
        <div
          className='mt-[66px]'
          data-aos='fade-up'
          data-aos-duration='1000'
          data-aos-delay='200'
        >
          <Swiper
            {...settings}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className='service-swiper'
          >
            {ServiceData.map(({
              id,
              serviceIcon,
              serviceSubTitle,
              serviceTitle,
              serviceDesc,
              btnContent,
              contentShape,
              serviceUrl,
              btnIcon,
              serviceThumbShape,
              serviceThumb,
              thumbIcon,
            }) => (
              <SwiperSlide key={id} className='pb-[70px]' style={{ height: 'auto', display: 'flex' }}>
                <ServiceCard
                  serviceIcon={serviceIcon}
                  serviceSubTilte={serviceSubTitle}
                  serviceTitle={serviceTitle}
                  serviceDesc={serviceDesc}
                  btnContent={btnContent}
                  serviceUrl={serviceUrl}
                  btnIcon={btnIcon}
                  contentShape={contentShape}
                  serviceThumbShape={serviceThumbShape}
                  serviceThumb={serviceThumb}
                  thumbIcon={thumbIcon}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Service;
