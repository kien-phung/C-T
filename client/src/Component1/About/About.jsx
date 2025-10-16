import aboutThumb from '/images/about1.jpg';
import aboutShape2 from '/images/about_shape4.png';
import border from '/images/hero_border.png';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';


const About = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  return (
    <section className='pb-[120px] pt-[170px] lg:pt-28 xl:pt-[170px] relative z-10 bg-BodyBg4-0'>
      <div className='Container'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 lg:gap-10 2xl:gap-16 items-center'>
          <div className='relative z-10'>
            <span className='absolute right-40 top-0 -z-10 h-96 w-52 blur-[150px] bg-PrimaryColor-0 bg-opacity-70 rounded-full'></span>
            <img
              src={aboutThumb}
              draggable='false'
              className='w-full 2xl:w-[inherit] lg:-ml-2 xl:-ml-12'
            />
            <div className='absolute sm:mr-12 -top-8 sm:-top-16 right-6 md:-top-8 lg:-top-14 sm:right-2 md:right-8 lg:right-0 xl:right-8 xl:-top-20 2xl:-top-[70px] 2xl:right-[56px] size-[85px] sm:size-[142px] md:size-[180px] lg:size-[140px] xl:size-[180px] bg-BodyBg-0 dark:bg-gray-800 rounded-full flex items-center justify-center border-2 sm:border-[5px] border-white dark:border-gray-600'>
              <div className='size-16 sm:size-24 md:size-32 lg:size-24 xl:size-[120px] animate-rotational'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 250.5 250.5'
                  className='overflow-visible'
                >
                  <path
                    d='M.25,125.25a125,125,0,1,1,125,125,125,125,0,0,1-125-125'
                    id='e-path-35ee1b2'
                    className='fill-transparent'
                  ></path>
                  <text className='font-FiraSans text-[32px] uppercase fill-HeadingColor-0 dark:fill-green-400'>
                    <textPath
                      id='e-text-path-35ee1b2'
                      href='#e-path-35ee1b2'
                      startOffset='0%'
                    >
                      * C&T. * Electronic Electrical * Company Limited
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                {/* center icon: replace with handshake icon at public/images/handshake.png */}
                <img
                  src={'/images/battay.jpg'}
                  draggable='false'
                  alt='handshake'
                />
              </div>
            </div>
          </div>
          <div className='relative z-10'>
            <h5 className='font-FiraSans font-medium text-sm sm:text-base text-PrimaryColor-0 uppercase mb-3'>
               {t('about.subtitle')}
            </h5>
            <h1 className='font-FiraSans font-semibold text-HeadingColor-0 text-[16px] leading-[26px] sm:text-[25px] sm:leading-[35px] md:text-[30px] md:leading-[40px] lg:text-[34px] lg:leading-[44px] xl:text-[40px] xl:leading-[50px] 2xl:text-[42px] 2xl:leading-[52px] relative pb-4'>
              {t('about.title')}
              <img
                src={border}
                draggable='false'
                className='absolute bottom-0 left-0'
              />
            </h1>
            <p className='font-FiraSans text-TextColor2-0 pt-6'>
              <strong className='text-PrimaryColor-0 block mb-2'>{t('about.companyName')}</strong>
              {t('about.description')}
            </p>

            
            </div>
        </div>
      </div>
      <img
        src={aboutShape2}
        draggable='false'
        className='absolute -z-10 bottom-14 right-5 animate-wiggle hidden 2xl:block'
      />
    </section>
  );
};

export default About;
