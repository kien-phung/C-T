import { Link } from 'react-router-dom';
import footerShape2 from '/images/footer_shape.png';
import footerLogo from '/images/logo1.png';
import footerShape from '/images/choose_rotete.png';
import footerImg from '/images/blog/blog1.jpg';
import footerImg2 from '/images/blog/blog2.jpg';
import {
  FaAnglesRight,
  FaInstagram,
  FaLinkedinIn,
  FaRegEnvelope,
  FaXTwitter,
} from 'react-icons/fa6';
import { IoPaperPlaneSharp } from 'react-icons/io5';
import { FaCircle } from 'react-icons/fa';
import { ImFacebook2 } from 'react-icons/im';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import { useState } from 'react';
import { submitContact } from '../../api/api';

const Footer = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingNewsletter(true);
    setNewsletterMessage('');

    try {
      const response = await submitContact({
        name: 'Newsletter Subscriber',
        email: newsletterEmail,
        address: 'N/A',
        phone: 'N/A',
        message: currentLanguage === 'VN' ? 'Đăng ký nhận bản tin' : 'Subscribe to newsletter',
        submit_type: 'Newsletter',
        language: currentLanguage
      });

      if (response.data.success) {
        setNewsletterMessage(t('footer.newsletterSuccess'));
        setNewsletterEmail('');
      } else {
        setNewsletterMessage(t('footer.newsletterError'));
      }
    } catch (error) {
      console.error('Error:', error);
      setNewsletterMessage(t('footer.newsletterError'));
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };
  return (
    <>
      <div className='bg-PrimaryColor-0 dark:bg-green-700 py-3'>
        <div className='Container'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-0 lg:grid-cols-3 lg:items-center'>
            <div
              className='flex items-center gap-5 justify-center lg:justify-start'
              data-aos='fade-right'
              data-aos-duration='800'
            >
              <div className='size-[60px] bg-BorderColor2-0 dark:bg-green-800 rounded-full flex items-center justify-center text-white'>
                <FaRegEnvelope size={'22'} />
              </div>
              <div>
                <h6 className='font-FiraSans text-[15px] text-white'>
                  {t('footer.contact')}
                </h6>
                <a href='https://mail.google.com/mail/?view=cm&fs=1&to=stl.solution.co@gmail.com' target='_blank' rel='noopener noreferrer'>
                  <button className='font-FiraSans text-xl text-white font-medium'>
                    stl.solution.co@gmail.com
                  </button>
                </a>
              </div>
            </div>
            <div
              className='flex justify-center md:border-l lg:border-l-0 xl:border-x-2 border-BorderColor2-0 dark:border-green-800 py-2'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='100'
            >
              <Link to={'/'}>
                <img
                  src={footerLogo}
                  draggable='false'
                  className='h-20 w-auto'
                />
              </Link>
            </div>
            <div
              className='flex justify-center lg:justify-end'
              data-aos='fade-left'
              data-aos-duration='800'
              data-aos-delay='200'
            >
              <ul className='flex gap-3 items-center'>
                <li>
                  <Link
                    to={'https://www.facebook.com/profile.php?id=61581551666794'}
                    className='size-[48px] flex justify-center items-center rounded-full bg-BorderColor2-0 dark:bg-green-800 transition-all duration-500 text-white hover:text-PrimaryColor-0 dark:hover:text-green-400 relative z-10 after:absolute after:rounded-full after:top-0 after:left-0 after:bg-white dark:after:bg-gray-800 after:w-full after:h-full after:scale-0 after:-z-10 after:transition-all after:duration-500 hover:after:scale-100'
                  >
                    <ImFacebook2 size={'15'} />
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/'}
                    className='size-[48px] flex justify-center items-center rounded-full bg-BorderColor2-0 dark:bg-green-800 transition-all duration-500 text-white hover:text-PrimaryColor-0 dark:hover:text-green-400 relative z-10 after:absolute after:rounded-full after:top-0 after:left-0 after:bg-white dark:after:bg-gray-800 after:w-full after:h-full after:scale-0 after:-z-10 after:transition-all after:duration-500 hover:after:scale-100'
                  >
                    <FaXTwitter />
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/'}
                    className='size-[48px] flex justify-center items-center rounded-full bg-BorderColor2-0 dark:bg-green-800 transition-all duration-500 text-white hover:text-PrimaryColor-0 dark:hover:text-green-400 relative z-10 after:absolute after:rounded-full after:top-0 after:left-0 after:bg-white dark:after:bg-gray-800 after:w-full after:h-full after:scale-0 after:-z-10 after:transition-all after:duration-500 hover:after:scale-100'
                  >
                    <FaLinkedinIn />
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/'}
                    className='size-[48px] flex justify-center items-center rounded-full bg-BorderColor2-0 dark:bg-green-800 transition-all duration-500 text-white hover:text-PrimaryColor-0 dark:hover:text-green-400 relative z-10 after:absolute after:rounded-full after:top-0 after:left-0 after:bg-white dark:after:bg-gray-800 after:w-full after:h-full after:scale-0 after:-z-10 after:transition-all after:duration-500 hover:after:scale-100'
                  >
                    <FaInstagram />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <footer style={{ backgroundImage: `url(/images/footer_bg.jpg)` }} className="dark:bg-gray-900 bg-no-repeat bg-center bg-cover relative z-10 pt-28 overflow-hidden">
        {/* Dark mode overlay */}
        <div className='absolute inset-0 bg-gray-900 opacity-0 dark:opacity-90 transition-opacity duration-300 -z-20'></div>

        <img
          src={footerShape}
          draggable='false'
          className='absolute -z-10 left-20 bottom-28 animate-rotational'
        />
        <img
          src={footerShape2}
          draggable='false'
          className='absolute -z-10 top-20 right-20 animate-dance2 hidden 2xl::block'
        />
        <div className='Container'>
          <div className='grid grid-cols-12 gap-5 sm:gap-6 lg:gap-0'>
            <div className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 text-center lg:text-left'>
              <h4 className='font-FiraSans text-2xl text-HeadingColor-0 dark:text-white font-medium'>
                {t('footer.aboutUs')}
              </h4>
              <p className='font-FiraSans text-TextColor2-0 dark:text-gray-300 text-[15px] mt-3 sm:mt-5 mb-6 sm:mb-8 max-w-none lg:max-w-[290px] w-full mx-auto lg:mx-0 text-justify leading-relaxed'>
                {t('footer.aboutDescription')}
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className='relative sm:w-8/12'
              >
                <label
                  htmlFor='newsletterEmail'
                  className='relative'
                >
                  <input
                    type='email'
                    name='email'
                    id='newsletterEmail'
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={t('footer.enterEmail')}
                    required
                    className='w-full h-[56px] outline-none font-FiraSans border-b border-HeadingColor-0 dark:border-gray-600 border-opacity-30 bg-transparent px-4 py-4 text-HeadingColor-0 dark:text-white placeholder:text-HeadingColor-0 dark:placeholder:text-gray-400 mb-4'
                  />
                </label>
                {newsletterMessage && (
                  <div className={`text-xs font-FiraSans mb-2 ${newsletterMessage.includes('error') || newsletterMessage.includes('lỗi') ? 'text-red-500' : 'text-green-600'}`}>
                    {newsletterMessage}
                  </div>
                )}
                <div className='absolute top-3 right-0'>
                  <button
                    type='submit'
                    disabled={isSubmittingNewsletter}
                    className='size-9 rounded-full border border-PrimaryColor-0 dark:border-green-600 bg-PrimaryColor-0 dark:bg-green-600 gap-2 text-sm text-white font-FiraSans flex items-center justify-center relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded before:bg-HeadingColor-0 dark:before:bg-gray-700 before:-z-10 before:scale-0 before:transition-all before:duration-500 hover:before:scale-100 disabled:opacity-50'
                  >
                    <IoPaperPlaneSharp size={'20'} />
                  </button>
                </div>
              </form>
            </div>
            <div className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 flex justify-center'>
              <div className='w-full lg:w-auto text-center lg:text-left'>
                <h4 className='font-FiraSans text-2xl text-HeadingColor-0 dark:text-white font-medium mb-5 sm:mb-[30px] text-center lg:text-left animate-fade-in-up'>
                  {t('footer.quickLinks')}
                </h4>
                <ul className='overflow-hidden'>
                  <li className='animate-fade-in-up' style={{ animationDelay: '0.1s' }}>
                    <Link
                      to={'/'}
                      className='inline-block'
                    >
                      <button className='flex items-center gap-2 font-FiraSans -ml-5 hover:ml-0 text-[15px] text-HeadingColor-0 dark:text-gray-300 transition-all duration-500 hover:text-PrimaryColor-0 dark:hover:text-green-400 hover:gap-1 mb-3 relative group hover:scale-105'>
                        <FaAnglesRight className='text-xs text-PrimaryColor-0 dark:text-green-400 transition-transform duration-300 group-hover:rotate-12' />
                        <span className='relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-PrimaryColor-0 dark:after:bg-green-400 after:transition-all after:duration-300 group-hover:after:w-full'>
                          {t('footer.introduction')}
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li className='animate-fade-in-up' style={{ animationDelay: '0.2s' }}>
                    <Link
                      to={'/team'}
                      className='inline-block'
                    >
                      <button className='flex items-center gap-2 font-FiraSans -ml-5 hover:ml-0 text-[15px] text-HeadingColor-0 dark:text-gray-300 transition-all duration-500 hover:text-PrimaryColor-0 dark:hover:text-green-400 hover:gap-1 mb-3 relative group hover:scale-105'>
                        <FaAnglesRight className='text-xs text-PrimaryColor-0 dark:text-green-400 transition-transform duration-300 group-hover:rotate-12' />
                        <span className='relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-PrimaryColor-0 dark:after:bg-green-400 after:transition-all after:duration-300 group-hover:after:w-full'>
                          {t('footer.team')}
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li className='animate-fade-in-up' style={{ animationDelay: '0.3s' }}>
                    <Link
                      to={'/service_details'}
                      className='inline-block'
                    >
                      <button className='flex items-center gap-2 font-FiraSans -ml-5 hover:ml-0 text-[15px] text-HeadingColor-0 dark:text-gray-300 transition-all duration-500 hover:text-PrimaryColor-0 dark:hover:text-green-400 hover:gap-1 mb-3 relative group hover:scale-105'>
                        <FaAnglesRight className='text-xs text-PrimaryColor-0 dark:text-green-400 transition-transform duration-300 group-hover:rotate-12' />
                        <span className='relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-PrimaryColor-0 dark:after:bg-green-400 after:transition-all after:duration-300 group-hover:after:w-full'>
                          {t('footer.products')}
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li className='animate-fade-in-up' style={{ animationDelay: '0.4s' }}>
                    <Link
                      to={'/contact'}
                      className='inline-block'
                    >
                      <button className='flex items-center gap-2 font-FiraSans -ml-5 hover:ml-0 text-[15px] text-HeadingColor-0 dark:text-gray-300 transition-all duration-500 hover:text-PrimaryColor-0 dark:hover:text-green-400 hover:gap-1 mb-3 relative group hover:scale-105'>
                        <FaAnglesRight className='text-xs text-PrimaryColor-0 dark:text-green-400 transition-transform duration-300 group-hover:rotate-12' />
                        <span className='relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-PrimaryColor-0 dark:after:bg-green-400 after:transition-all after:duration-300 group-hover:after:w-full'>
                          {t('footer.contactLink')}
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li className='animate-fade-in-up' style={{ animationDelay: '0.5s' }}>
                    <Link
                      to={'/blog_grid'}
                      className='inline-block'
                    >
                      <button className='flex items-center gap-2 font-FiraSans -ml-5 hover:ml-0 text-[15px] text-HeadingColor-0 dark:text-gray-300 transition-all duration-500 hover:text-PrimaryColor-0 dark:hover:text-green-400 hover:gap-1 relative group hover:scale-105'>
                        <FaAnglesRight className='text-xs text-PrimaryColor-0 dark:text-green-400 transition-transform duration-300 group-hover:rotate-12' />
                        <span className='relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-PrimaryColor-0 dark:after:bg-green-400 after:transition-all after:duration-300 group-hover:after:w-full'>
                          {t('footer.news')}
                        </span>
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 flex justify-center lg:justify-end'>
              <div className='w-full lg:w-auto text-center lg:text-left'>
                <h4 className='font-FiraSans text-2xl text-HeadingColor-0 dark:text-white font-medium mb-5 sm:mb-[36px] text-center lg:text-left'>
                  {t('footer.latestNews')}
                </h4>
                <Link
                  to={'https://www.facebook.com/share/p/1FTQYGGXjg/'}
                  className='flex items-center justify-center lg:justify-start gap-[18px] group'
                >
                  <div className='w-[100px] h-[100px] flex-shrink-0'>
                    <img
                      src={footerImg}
                      className='rounded w-full h-full object-cover'
                    />
                  </div>
                  <div className='flex-1 text-center lg:text-left'>
                    <h6 className='font-FiraSans font-medium text-HeadingColor-0 dark:text-white transition-all duration-500 group-hover:text-PrimaryColor-0 dark:group-hover:text-green-400'>
                      {currentLanguage === 'VN' ? (
                        <>Diễn Đàn Đổi Mới <br className='hidden 2xl:block' /> Sáng Tạo Năng Lượng</>
                      ) : (
                        <>Energy <br className='hidden 2xl:block' /> Innovation Forum</>
                      )}
                    </h6>
                    <p className='font-FiraSans text-sm text-TextColor2-0 dark:text-gray-400 flex items-center gap-2 mt-1'>
                      <span className='text-PrimaryColor-0 dark:text-green-400'>
                        <FaCircle size={'8'} />
                      </span>
                      {currentLanguage === 'VN' ? '16 th11, 2025' : 'Nov 16, 2025'}
                    </p>
                  </div>
                </Link>
                <Link
                  to={'https://www.facebook.com/share/p/16ND4mHNLF/'}
                  className='flex items-center justify-center lg:justify-start gap-[18px] group mt-7'
                >
                  <div className='w-[100px] h-[100px] flex-shrink-0'>
                    <img
                      src={footerImg2}
                      className='rounded w-full h-full object-cover'
                    />
                  </div>
                  <div className='flex-1 text-center lg:text-left'>
                    <h6 className='font-FiraSans font-medium text-HeadingColor-0 dark:text-white transition-all duration-500 group-hover:text-PrimaryColor-0 dark:group-hover:text-green-400'>
                      {currentLanguage === 'VN' ? (
                        <>Giải Pháp Hệ Thống <br className='hidden 2xl:block' /> Camera Giám Sát Tích Hợp AI</>
                      ) : (
                        <>AI-Integrated Camera <br className='hidden 2xl:block' /> Surveillance System</>
                      )}
                    </h6>
                    <p className='font-FiraSans text-sm text-TextColor2-0 dark:text-gray-400 flex items-center gap-2 mt-1'>
                      <span className='text-PrimaryColor-0 dark:text-green-400'>
                        <FaCircle size={'8'} />
                      </span>
                      {currentLanguage === 'VN' ? '16 th11, 2025' : 'Nov 16, 2025'}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='Container flex flex-col gap-5 md:flex-row md:gap-0 justify-between mt-[120px] py-6 border-t border-HeadingColor-0 dark:border-gray-700 border-opacity-20'>
          <p className='font-FiraSans text-HeadingColor-0 dark:text-gray-300 text-[15px]'>
            {t('footer.copyright')}{' '}
            <Link
              to={'/'}
              className='text-PrimaryColor-0 dark:text-green-400'
            >
              STL Solutions
            </Link>{' '}
            {t('footer.designedBy')}
          </p>
          <div>
            <ul className='flex gap-7'>
              <li>
                <Link to={'/'}>
                  <button className='font-FiraSans text-HeadingColor-0 dark:text-gray-300 text-[15px] transition-all duration-500 hover:text-PrimaryColor-0 dark:hover:text-green-400'>
                    {t('footer.privacyTerms')}
                  </button>
                </Link>
              </li>
              <li>
                <Link to={'/'}>
                  <button className='font-FiraSans text-HeadingColor-0 dark:text-gray-300 text-[15px] transition-all duration-500 hover:text-PrimaryColor-0 dark:hover:text-green-400'>
                    {t('footer.faq')}
                  </button>
                </Link>
              </li>
              <li>
                <Link to={'/'}>
                  <button className='font-FiraSans text-HeadingColor-0 dark:text-gray-300 text-[15px] transition-all duration-500 hover:text-PrimaryColor-0 dark:hover:text-green-400'>
                    {t('footer.contactUsFooter')}
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;