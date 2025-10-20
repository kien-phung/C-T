import { Link } from 'react-router-dom';
import { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import bannerThumb from '/images/hero_thumb3.png';
import border from '/images/hero_border.png';
import box from '/images/box.png';
import thumbDot from '/images/hero3_dot_shape.png';
import { FaPhone, FaDownload } from 'react-icons/fa';
import { LuSquarePlay } from 'react-icons/lu';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';

const Banner = () => {
  const [toggler, setToggler] = useState(false);
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  return (
    <section className="bg-[url('/images/bg1.jpg')] bg-cover bg-center bg-no-repeat h-[850px] sm:h-[1000px] md:h-[1180px] lg:h-[660px] xl:h-[750px] flex items-center relative z-10 overflow-hidden before:absolute before:inset-0 before:bg-gray-900 before:opacity-0 dark:before:opacity-80 before:transition-opacity before:duration-300 before:-z-10">
      <div className='Container relative z-10'>
        <div className='grid lg:grid-cols-2 items-center gap-16 lg:gap-0'>
          <div className='relative'>
            <img
              src={box}
              draggable='false'
              className='absolute -top-20 right-14 animate-rotational'
            />
            <h6
              className='font-FiraSans font-medium text-red-500 dark:text-red-400 mb-3'
              data-aos='fade-up'
              data-aos-duration='600'
            >
              {t('banner.tagline')}
            </h6>
            <h1
              className='font-FiraSans font-semibold text-blue-600 dark:text-blue-400 text-[26px] leading-[32px] sm:text-[46px] sm:leading-[52px] md:text-[68x] lg:text-[46px] xl:text-[54px] xl:leading-[68px] 2xl:text-[56px] 2xl:leading-[70px] relative z-10 pb-4'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='100'
            >
              {t('banner.companyName')}
              <img
                src={border}
                draggable='false'
                className='absolute bottom-0 left-0'
              />
            </h1>
            <p
              className='font-FiraSans text-green-500 dark:text-green-400 font-semibold mb-[38px] mt-6'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='200'
            >
              {t('banner.slogan')}{' '}
              <br className='hidden xl:block 2xl:hidden' />
              <br className='hidden md:block lg:hidden 2xl:block' />{' '}
              {t('banner.description')}
            </p>
            <div className='flex flex-col gap-6'>
              <div
                className='flex flex-col sm:flex-row sm:items-center gap-8'
                data-aos='fade-up'
                data-aos-duration='800'
                data-aos-delay='300'
              >
                <Link to={'/contact'}>
                  <button className='primary-btn3'>
                    {t('banner.contactUs')}
                    <FaPhone />
                  </button>
                </Link>
                <div className='relative z-50'>
                  <button
                    className='flex items-center gap-3 text-white dark:text-gray-200 font-FiraSans font-medium'
                    onClick={() => setToggler(!toggler)}
                  >
                    <LuSquarePlay
                      size={'24'}
                      className='text-white dark:text-gray-200'
                    />
                    {t('banner.aboutUs')}
                  </button>
                  <FsLightbox
                    toggler={toggler}
                    sources={[
                      'https://www.youtube.com/embed/ksf5BMLhRE0?autoplay=1',
                    ]}

                  />
                </div>
              </div>
              <a
                href={currentLanguage === 'VN' ? '/profile/VI.pdf' : '/profile/EN.pdf'}
                download={currentLanguage === 'VN' ? 'VI.pdf' : 'EN.pdf'}
                className='inline-flex items-center justify-center gap-2 py-3 px-5 text-sm w-fit bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white font-FiraSans font-medium rounded transition-all duration-300 hover:bg-gray-400 dark:hover:bg-gray-500'
                data-aos='fade-up'
                data-aos-duration='800'
                data-aos-delay='300'
              >
                {currentLanguage === 'VN' ? 'Tải Profile' : 'Download Profile'}
                <FaDownload className='text-xs' />
              </a>
            </div>
          </div>
          <div
            className='flex justify-center lg:justify-end relative'
            data-aos='fade-left'
            data-aos-duration='1000'
            data-aos-delay='200'
          >
            {/* Video instead of static hero image. Place your file at public/videos/hero_right.mp4 or use an external URL. */}
            <video
              className='w-full max-w-[700px] object-cover -mb-12 sm:-mt-8 2xl:-mt-16 rounded-lg'
              poster={'/images/Intro2.mp4'}
              autoPlay
              muted
              loop
              playsInline
              // controls // uncomment if you want playback controls for testing
            >
              <source src={'/images/Intro2.mp4'} type='video/mp4' />
              {/* fallback to external URL example:
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              */}
              Your browser does not support the video tag.
            </video>

            <img
              src={thumbDot}
              draggable='false'
              className='absolute left-1/2 -translate-x-1/2 top-24 -z-10'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
