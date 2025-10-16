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
    <section className='pb-[120px] pt-20 sm:pt-0 lg:pt-[170px] bg-[url(/images/choose_bg.jpg)] bg-no-repeat bg-cover bg-center relative z-20'>
      <div className='Container'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 lg:gap-10 2xl:gap-16 items-center'>
          <div className='relative z-10'>
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
          <div className='relative z-10'>
            <span className='absolute -left-32 -bottom-32 -z-10 h-96 w-96 blur-3xl bg-[#e9f8f5] dark:bg-gray-800 rounded-full'></span>
            <h5 className='font-FiraSans font-medium text-sm sm:text-base text-PrimaryColor-0 uppercase mb-3'>
              {t('whyChoose.sectionTitle')}
            </h5>
            <h1 className='font-FiraSans font-semibold text-HeadingColor-0 text-[16px] leading-[26px] sm:text-[25px] sm:leading-[35px] md:text-[30px] md:leading-[40px] lg:text-[34px] lg:leading-[44px] xl:text-[38px] xl:leading-[50px] 2xl:text-[42px] 2xl:leading-[52px] relative pb-4'>
             {t('whyChoose.title')}
              <img
                src={border}
                draggable='false'
                className='absolute bottom-0 left-0'
              />
            </h1>
            <p className='font-FiraSans text-TextColor2-0 pt-5'>
              {t('whyChoose.subtitle')}
            </p>
            <ul className='grid items-center grid-cols-1 gap-x-7 gap-y-5 sm:grid-cols-2 mt-9 pb-10'>
              <li className='font-FiraSans text-HeadingColor-0 dark:text-white bg-white dark:bg-gray-800 py-5 px-8 w-full rounded-md flex items-center gap-2 shadow-cases'>
                <span className='text-PrimaryColor-0 dark:text-green-400 text-2xl'>
                  <IoIosCheckmarkCircleOutline />
                </span>
                {t('whyChoose.automaticTransaction')}
              </li>
              <li className='font-FiraSans text-HeadingColor-0 dark:text-white bg-white dark:bg-gray-800 py-5 px-8 w-full rounded-md flex items-center gap-2 shadow-cases'>
                <span className='text-PrimaryColor-0 dark:text-green-400 text-2xl'>
                  <IoIosCheckmarkCircleOutline />
                </span>
                {t('whyChoose.comprehensiveSolution')}
              </li>
              <li className='font-FiraSans text-HeadingColor-0 dark:text-white bg-white dark:bg-gray-800 py-5 px-8 w-full rounded-md flex items-center gap-2 shadow-cases'>
                <span className='text-PrimaryColor-0 dark:text-green-400 text-2xl'>
                  <IoIosCheckmarkCircleOutline />
                </span>
                {t('whyChoose.smartConnect')}
              </li>
              <li className='font-FiraSans text-HeadingColor-0 dark:text-white bg-white dark:bg-gray-800 py-5 px-8 w-full rounded-md flex items-center gap-2 shadow-cases'>
                <span className='text-PrimaryColor-0 dark:text-green-400 text-2xl'>
                  <IoIosCheckmarkCircleOutline />
                </span>
                {t('whyChoose.professionalTeam')}
              </li>
            </ul>
            <div className='inline-block relative z-50'>
              <div
                className='flex items-center gap-7'
                onClick={() => setToggler(!toggler)}
              >
                <FsLightbox
                  toggler={toggler}
                  sources={[
                    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  ]}
                />
              </div>
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
