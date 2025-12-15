import whyChooseThumb from '/images/phone1.jpg';
import whyChooseShape from '/images/box.png';
import whyChooseShape2 from '/images/choose_rotete.png';
import whyChooseShape3 from '/images/choose_dot2.png';
import border from '/images/hero_border.png';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import FsLightbox from 'fslightbox-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';

const WhyChoose = () => {
  const [toggler, setToggler] = useState(false);
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  return (
    <section className='pb-20 pt-20 sm:pt-0 lg:pt-20 bg-[url(/images/choose_bg.jpg)] bg-no-repeat bg-cover bg-center relative z-20'>
      <div className='Container'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 lg:gap-10 2xl:gap-16 items-center'>
          <div
            className='relative z-10'
            data-aos='fade-right'
            data-aos-duration='1000'
          >
            <img
              src={whyChooseShape3}
              draggable='false'
              className='absolute -z-10 top-0 right-14 animate-dance3 hidden 2xl:block'
            />
            <img
              src={whyChooseShape3}
              draggable='false'
              className='absolute -z-10 -bottom-6 left-0 animate-wiggle hidden 2xl:block'
            />
            <img
              src={whyChooseThumb}
              draggable='false'
              className='w-full 2xl:w-[inherit] lg:-ml-5 xl:-ml-12'
            />
          </div>
          <div className='relative z-10 text-center lg:text-left'>
            <span className='absolute -left-32 -bottom-32 -z-10 h-96 w-96 blur-3xl bg-[#e9f8f5] dark:bg-gray-800 rounded-full'></span>
            <h5
              className='font-FiraSans font-medium text-sm sm:text-base text-PrimaryColor-0 uppercase mb-3'
              data-aos='fade-up'
              data-aos-duration='800'
            >
              {t('whyChoose.sectionTitle')}
            </h5>
            <h1
              className='font-FiraSans font-semibold text-HeadingColor-0 text-[20px] leading-[30px] sm:text-[25px] sm:leading-[35px] md:text-[30px] md:leading-[40px] lg:text-[34px] lg:leading-[44px] xl:text-[38px] xl:leading-[50px] 2xl:text-[42px] 2xl:leading-[52px] relative pb-4'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='100'
            >
             {t('whyChoose.title')}
              <img
                src={border}
                draggable='false'
                className='absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0'
              />
            </h1>
            <p
              className='font-FiraSans text-TextColor2-0 pt-5'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='200'
            >
              {t('whyChoose.subtitle')}
            </p>
            <ul
              className='grid grid-cols-1 gap-x-7 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 mt-9 pb-10 justify-items-center w-fit mx-auto'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='300'
            >
              <li className='font-FiraSans text-HeadingColor-0 dark:text-white bg-white dark:bg-gray-800 py-4 px-3 w-full h-full rounded-md flex items-center justify-center gap-2 shadow-cases text-center'>
                <span className='text-PrimaryColor-0 dark:text-green-400 text-2xl flex-shrink-0'>
                  <IoIosCheckmarkCircleOutline />
                </span>
                {t('whyChoose.automaticTransaction')}
              </li>
              <li className='font-FiraSans text-HeadingColor-0 dark:text-white bg-white dark:bg-gray-800 py-4 px-3 w-full h-full rounded-md flex items-center justify-center gap-2 shadow-cases text-center'>
                <span className='text-PrimaryColor-0 dark:text-green-400 text-2xl flex-shrink-0'>
                  <IoIosCheckmarkCircleOutline />
                </span>
                {t('whyChoose.comprehensiveSolution')}
              </li>
              <li className='font-FiraSans text-HeadingColor-0 dark:text-white bg-white dark:bg-gray-800 py-4 px-3 w-full h-full rounded-md flex items-center justify-center gap-2 shadow-cases text-center'>
                <span className='text-PrimaryColor-0 dark:text-green-400 text-2xl flex-shrink-0'>
                  <IoIosCheckmarkCircleOutline />
                </span>
                {t('whyChoose.smartConnect')}
              </li>
              <li className='font-FiraSans text-HeadingColor-0 dark:text-white bg-white dark:bg-gray-800 py-4 px-3 w-full h-full rounded-md flex items-center justify-center gap-2 shadow-cases text-center col-span-1'>
                <span className='text-PrimaryColor-0 dark:text-green-400 text-2xl flex-shrink-0'>
                  <IoIosCheckmarkCircleOutline />
                </span>
                {t('whyChoose.iotBreakthrough')}
              </li>
              <li className='font-FiraSans text-HeadingColor-0 dark:text-white bg-white dark:bg-gray-800 py-4 px-3 w-full h-full rounded-md flex items-center justify-center gap-2 shadow-cases text-center col-span-1'>
                <span className='text-PrimaryColor-0 dark:text-green-400 text-2xl flex-shrink-0'>
                  <IoIosCheckmarkCircleOutline />
                </span>
                {t('whyChoose.professionalTeam')}
              </li>
              <li className='font-FiraSans text-HeadingColor-0 dark:text-white bg-white dark:bg-gray-800 py-4 px-3 w-full h-full rounded-md flex items-center justify-center gap-2 shadow-cases text-center col-span-1'>
                <span className='text-PrimaryColor-0 dark:text-green-400 text-2xl flex-shrink-0'>
                  <IoIosCheckmarkCircleOutline />
                </span>
                {t('whyChoose.identitySolutions')}
              </li>
            </ul>
            <div className='inline-block relative z-50'>
              <button
                className='flex items-center gap-2 font-FiraSans font-medium text-HeadingColor-0 dark:text-white hover:text-PrimaryColor-0 dark:hover:text-green-400 transition-all duration-300'
                onClick={() => setToggler(!toggler)}
              >
                <div className='size-8 rounded-md bg-white dark:bg-gray-600 flex items-center justify-center shadow-md border-2 border-PrimaryColor-0 dark:border-green-400'>
                  <svg className='w-3 h-3 ml-0.5 text-PrimaryColor-0 dark:text-green-400' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M8 5v14l11-7z' />
                  </svg>
                </div>
                <span className='font-semibold text-sm'>
                  {currentLanguage === 'VN' ? 'Về Chúng Tôi' : 'About Us'}
                </span>
              </button>
              <FsLightbox
                toggler={toggler}
                sources={[
                  '/images/video/intro.mp4',
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <img
        src={whyChooseShape}
        draggable='false'
        className='absolute -z-10 top-48 right-[13%] animate-rotate hidden 2xl:block'
      />
      <img
        src={whyChooseShape2}
        draggable='false'
        className='absolute -z-10 bottom-40 right-[11%] animate-rotate hidden 2xl:block'
      />
    </section>
  );
};

export default WhyChoose;
