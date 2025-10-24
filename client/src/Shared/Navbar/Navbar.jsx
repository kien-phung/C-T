import { Link, useLocation } from 'react-router-dom';
import Logo from '/images/logo1.png';
import Logo2 from '/images/logo1.png';
import './navbar.css';
import { useEffect, useRef, useState } from 'react';
import {
  FaArrowUp,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaXTwitter,
} from 'react-icons/fa6';
import { FaPhoneAlt, FaTimes } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { IoMdPaperPlane } from 'react-icons/io';
import { ImFacebook2 } from 'react-icons/im';
import { HiOutlineMail } from 'react-icons/hi';
import { GiPhone } from 'react-icons/gi';
import { LiaTimesSolid } from 'react-icons/lia';
import { IoSearch } from 'react-icons/io5';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import { submitContact } from '../../api/api';


const Navbar = () => {
  // Language context
  const { currentLanguage, toggleLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const location = useLocation();

  //sticky

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  });

  /* Method that will fix header after a specific scrollable */
  const isSticky = () => {
    const header = document.querySelector('.header-sticky');
    const scrollTop = window.scrollY;
    scrollTop >= 250
      ? header.classList.add('is-sticky')
      : header.classList.remove('is-sticky');
  };

  // Newsletter Form State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus('');

    if (!newsletterEmail) {
      setNewsletterStatus('❌ Vui lòng nhập email');
      return;
    }

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
        setNewsletterStatus('✅ Cảm ơn bạn đã đăng ký!');
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('❌ Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error:', error);
      setNewsletterStatus('❌ Lỗi kết nối');
    }
  };

  //Menu Sidebar

  const menuSideBarRef = useRef(null);
  const sidebarContentRef = useRef(null);
  const bodyOverlay2Ref = useRef(null);
  const closeBtn2Ref = useRef(null);

  useEffect(() => {
    const menuSideBar = menuSideBarRef.current;
    const sidebarContent = sidebarContentRef.current;
    const bodyOverlay2 = bodyOverlay2Ref.current;
    const closeBtn2 = closeBtn2Ref.current;

    const addClasses = () => {
      sidebarContent.classList.add('opened');
      bodyOverlay2.classList.add('apply');
    };

    const removeClasses = () => {
      sidebarContent.classList.remove('opened');
      bodyOverlay2.classList.remove('apply');
    };

    if (menuSideBar && sidebarContent && bodyOverlay2 && closeBtn2) {
      menuSideBar.addEventListener('click', addClasses);
      closeBtn2.addEventListener('click', removeClasses);
      bodyOverlay2.addEventListener('click', removeClasses);
    }

    return () => {
      if (menuSideBar && sidebarContent && bodyOverlay2 && closeBtn2) {
        menuSideBar.removeEventListener('click', addClasses);
        closeBtn2.removeEventListener('click', removeClasses);
        bodyOverlay2.removeEventListener('click', removeClasses);
      }
    };
  }, []);

  const menuBarRef = useRef(null);
  const offcanvasRef = useRef(null);
  const bodyOverlayRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const menuBar = menuBarRef.current;
    const offcanvas = offcanvasRef.current;
    const bodyOverlay = bodyOverlayRef.current;
    const closeBtn = closeBtnRef.current;

    const addClasses = () => {
      offcanvas.classList.add('opened');
      bodyOverlay.classList.add('apply');
    };

    const removeClasses = () => {
      offcanvas.classList.remove('opened');
      bodyOverlay.classList.remove('apply');
    };

    if (menuBar && offcanvas && bodyOverlay && closeBtn) {
      menuBar.addEventListener('click', addClasses);
      closeBtn.addEventListener('click', removeClasses);
      bodyOverlay.addEventListener('click', removeClasses);
    }

    return () => {
      if (menuBar && offcanvas && bodyOverlay && closeBtn) {
        menuBar.removeEventListener('click', addClasses);
        closeBtn.removeEventListener('click', removeClasses);
        bodyOverlay.removeEventListener('click', removeClasses);
      }
    };
  }, []);

  let headerIcon = `  
  <span class="header-icon">  
    <svg fill="currentColor" viewBox="0 0 320 512" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg">
      <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
    </svg>
  </span>  
`;

  useEffect(() => {
    const mainMenuContent = document.querySelector('.main-menu-content');
    const mainMenuMobile = document.querySelector('.main-menu-mobile');

    if (mainMenuContent && mainMenuMobile) {
      const navContent = mainMenuContent.outerHTML;
      mainMenuMobile.innerHTML = navContent;

      const arrows = document.querySelectorAll(
        '.main-menu-mobile .has-dropdown > a'
      );

      arrows.forEach((arrow) => {
        const arrowBtn = document.createElement('BUTTON');
        arrowBtn.classList.add('dropdown-toggle-btn');
        arrowBtn.innerHTML = headerIcon;

        arrow.appendChild(arrowBtn);

        arrowBtn.addEventListener('click', (e) => {
          e.preventDefault();
          arrowBtn.classList.toggle('dropdown-opened');
          arrow.parentElement.classList.toggle('expanded');
          arrow.parentElement.parentElement.classList.add('dropdown-opened');
          arrow.parentElement.parentElement
            .querySelectorAll('.submenu')
            .forEach((submenu) => {
              submenu.style.display =
                submenu.style.display === 'block' ? 'none' : 'block';
            });
          arrow.parentElement.parentElement
            .querySelectorAll('.has-dropdown')
            .forEach((sibling) => {
              if (sibling !== arrow.parentElement) {
                sibling.classList.remove('dropdown-opened');
                sibling.querySelectorAll('.submenu').forEach((submenu) => {
                  submenu.style.display = 'none';
                });
              }
            });
        });
      });
    }
  }, [headerIcon]);

  //Menu Search
  const handleMenuSearchClick = () => {
    document.body.classList.add('search-active');
  };

  const handleCloseSearchClick = () => {
    document.body.classList.remove('search-active');
  };

  const searchContentRef = useRef(null);
  const bodyOverlay3Ref = useRef(null);
  const searchInputRef = useRef(null); // Reference for the search input
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    setIsSubmitting(true); // Set submitting state

    // Simulate a submission with a timeout (replace with your actual submission logic)
    setTimeout(() => {
      setIsSubmitting(false); // Reset submitting state
      // Optionally clear the input field or close the overlay
      if (searchInputRef.current) {
        searchInputRef.current.value = ''; // Clear the input
      }
      bodyOverlay3Ref.current.classList.remove('apply'); // Close overlay on submit (optional)
      searchContentRef.current.classList.remove('opened'); // Close search content (optional)
    }, 2000); // Simulate a delay of 2 seconds
  };

  return (
    <div data-lenis-prevent>
      <div className='offcanvas-area'>
        <div
          ref={offcanvasRef}
          className='offcanvas'
        >
          <div className='offcanvas_close-btn'>
            <button
              ref={closeBtnRef}
              className='close-btn'
            >
              <FaTimes />
            </button>
          </div>
          <div className='offcanvas_logo'>
            <Link to={'/'}>
              <img
                src={Logo2}
                draggable='false'
                style={{ margin: '0 auto', display: 'block' }}
              />
            </Link>
          </div>
          <div className='offcanvas_title'>
            <p>
              {currentLanguage === 'VN'
                ? 'C&T Electronics - Giải pháp công nghệ toàn diện cho doanh nghiệp'
                : 'C&T Electronics - Comprehensive technology solutions for businesses'}
            </p>
          </div>

          {/* Mobile Theme and Language Toggle */}
          <div className='flex items-center gap-4 mb-6 px-6'>
            <ThemeToggle />
            <button
              type='button'
              onClick={toggleLanguage}
              className='flex-1 px-5 py-3 bg-PrimaryColor-0 dark:bg-green-600 text-white font-FiraSans font-medium text-sm rounded transition-all duration-300 hover:bg-opacity-90 cursor-pointer'
            >
              {currentLanguage === 'VN' ? 'VN' : 'EN'}
            </button>
          </div>

          <div className='main-menu-mobile lg:none'></div>
          <div className='offcanvas_contact-info'>
            <div className='offcanvas_contact-title'>
              <h5>{t('footer.contactUsFooter')}</h5>
            </div>
            <ul>
              <li>
                <MdLocationPin />
                <a href="https://maps.google.com/maps/search/TP+Ho+Chi+Minh" target="_blank" rel="noopener noreferrer">TP Ho Chi Minh</a>
              </li>
              <li>
                <FaEnvelope />
                <a
                  href='https://mail.google.com/mail/?view=cm&fs=1&to=stl.solution.co@gmail.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={() => {
                    offcanvasRef.current?.classList.remove('opened');
                    bodyOverlayRef.current?.classList.remove('apply');
                  }}
                >
                  stl.solution.co@gmail.com
                </a>
              </li>
              <li>
                <FaPhoneAlt />
                <a href="tel:+84908229309">+84 908 229 309</a>
              </li>
            </ul>
          </div>
          <div className='offcanvas_input'>
            <div className='offcanvas_input-title'>
              <h4>{currentLanguage === 'VN' ? 'Nhận Cập Nhật' : 'Get Update'}</h4>
            </div>
            <form onSubmit={handleNewsletterSubmit}>
              <div className='relative'>
                <input
                  type='email'
                  name='email'
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={currentLanguage === 'VN' ? 'Nhập E-Mail' : 'Enter E-Mail'}
                  required
                />
                <button type='submit'>
                  <IoMdPaperPlane />
                </button>
              </div>
            </form>
            <div className='status' style={{ marginTop: '8px', fontSize: '12px', textAlign: 'center' }}>
              {newsletterStatus}
            </div>
          </div>
          <div className='offcanvas_social'>
            <div className='social-icon'>
              <Link to={'https://www.facebook.com/profile.php?id=61581551666794'}>
                <FaFacebookF />
              </Link>
              <Link to={'/'}>
                <FaXTwitter />
              </Link>
              <Link to={'/'}>
                <FaPinterestP />
              </Link>
              <Link to={'/'}>
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={bodyOverlayRef}
        className='body-overlay'
      ></div>
      <header className='bg-BodyBg2-0 relative z-10 before:absolute before:top-0 before:-left-[10%] before:w-3/5 before:h-full before:bg-PrimaryColor-0 before:-skew-x-[30deg] before:-z-10 after:absolute after:top-0 after:left-1/2 after:translate-x-[5px] after:w-1 after:h-full after:bg-PrimaryColor-0 after:-skew-x-[30deg] after:-z-10'>
        <div className='Container flex items-center justify-between h-[50px]'>
          <div className='flex items-center gap-8'>
            <div className=' sm:flex items-center gap-2 hidden'>
              <h6 className='text-lg text-white'>
                <HiOutlineMail />
              </h6>
              <a
                href='https://mail.google.com/mail/?view=cm&fs=1&to=stl.solution.co@gmail.com'
                target='_blank'
                rel='noopener noreferrer'
                className='font-FiraSans text-[15px] text-white'
              >
                stl.solution.co@gmail.com
              </a>
            </div>
            <div className=' md:flex items-center gap-2 hidden'>
              <h6 className='text-white [transform:rotateX(180deg)]'>
                <GiPhone />
              </h6>
              <a
                href="https://zalo.me/84912345678" // Sử dụng mailto: + địa chỉ email
                className='font-FiraSans text-[15px] text-white transition-all duration-500 hover:text-white'
                >
                +84 908 229 309
              </a>
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <h5 className='font-FiraSans font-medium text-sm uppercase text-white'>
              {t('nav.followUs')}
            </h5>
            <ul className='flex gap-5 items-center'>
              <li>
                <Link
                  to={'https://www.facebook.com/profile.php?id=61581551666794'}
                  className='transition-all duration-500 text-white hover:text-PrimaryColor-0'
                >
                  <ImFacebook2 size={'14'} />
                </Link>
              </li>
              <li>
                <Link
                  to={'/'}
                  className='transition-all duration-500 text-white hover:text-PrimaryColor-0'
                >
                  <FaXTwitter />
                </Link>
              </li>
              <li>
                <Link
                  to={'/'}
                  className='transition-all duration-500 text-white hover:text-PrimaryColor-0'
                >
                  <FaLinkedinIn />
                </Link>
              </li>
              <li>
                <Link
                  to={'/'}
                  className='transition-all duration-500 text-white hover:text-PrimaryColor-0'
                >
                  <FaInstagram />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div
        id='header-sticky'
        className='header-area header-sticky style-three'
      >
        <div className='Container'>
          <div className='bg-transparent rounded-md flex items-center justify-center lg:justify-between lg:grid lg:grid-cols-12 lg:gap-4 py-2 lg:py-0'>
            <div className='col-span-2 w-full lg:w-auto lg:flex'>
              <div className='header-logo pl-0 lg:pl-4 flex-1 lg:flex-none'>
                <Link to={'/'} className='inline-block p-4 -m-4'>
                  <img
                    src={Logo}
                    draggable='false'
                    className='h-12 lg:h-16'
                  />
                </Link>
              </div>
            </div>
            <div className='col-span-7 hidden lg:block'>
              <div className='header-main-menu text-center flex justify-center'>
                <nav className='main-menu-content'>
                  <ul>
                    <li>
                      <Link to={'/'} className={location.pathname === '/' ? 'active' : ''}>
                        {t('nav.home')}
                      </Link>
                    </li>

                    <li>
                      <Link to={'/service_details'} className={location.pathname === '/service_details' ? 'active' : ''}>{t('nav.products')}</Link>
                    </li>

                    <li>
                      <Link to={'/about'} className={location.pathname === '/about' ? 'active' : ''}>{t('nav.solutions')}</Link>
                    </li>

                    <li>
                      <Link to={'/policy'} className={location.pathname === '/policy' ? 'active' : ''}>
                        {t('nav.policy')}
                      </Link>
                    </li>
                    <li>
                      <Link to={'/customer'} className={location.pathname === '/customer' ? 'active' : ''}>
                        {t('nav.customers')}
                      </Link>
                    </li>
                    <li>
                      <Link to={'/blog_grid'} className={location.pathname === '/blog_grid' ? 'active' : ''}>
                        {t('nav.news')}
                      </Link>
                    </li>
                    <li>
                      <Link to={'/contact'} className={location.pathname === '/contact' ? 'active' : ''}>{t('nav.contact')}</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className='col-span-3'>
              <div className='header-right-box flex items-center gap-3 lg:gap-5 justify-end pr-2 lg:pr-0'>
                {/* Mobile Menu Toggle - Hamburger Icon */}
                <button
                  ref={menuBarRef}
                  className='lg:hidden flex flex-col gap-[5px] w-7 h-7 justify-center items-center group p-1'
                  aria-label='Toggle menu'
                >
                  <span className='w-full h-[2.5px] bg-HeadingColor-0 dark:bg-white rounded-full transition-all duration-300 group-hover:bg-PrimaryColor-0 dark:group-hover:bg-green-400 group-active:bg-PrimaryColor-0'></span>
                  <span className='w-full h-[2.5px] bg-HeadingColor-0 dark:bg-white rounded-full transition-all duration-300 group-hover:bg-PrimaryColor-0 dark:group-hover:bg-green-400 group-active:bg-PrimaryColor-0'></span>
                  <span className='w-full h-[2.5px] bg-HeadingColor-0 dark:bg-white rounded-full transition-all duration-300 group-hover:bg-PrimaryColor-0 dark:group-hover:bg-green-400 group-active:bg-PrimaryColor-0'></span>
                </button>

                {/* Desktop Theme Toggle */}
                <div className='hidden lg:block'>
                  <ThemeToggle />
                </div>

                {/* Desktop Language Toggle */}
                <div className='hidden lg:block relative before:absolute before:top-1/2 before:-translate-y-1/2 before:-right-[27px] before:h-20 before:w-[1px] before:bg-white before:opacity-20'>
                  <button
                    onClick={toggleLanguage}
                    className='px-5 py-[20px] bg-PrimaryColor-0 dark:bg-green-600 text-white font-FiraSans font-medium text-sm rounded transition-all duration-300 hover:bg-opacity-90 relative overflow-hidden group'
                  >
                    <span
                      key={currentLanguage}
                      className='inline-block animate-[slideIn_0.3s_ease-out]'
                    >
                      {currentLanguage === 'VN' ? 'VN' : 'EN'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='sidebar-content'>
        <div
          ref={sidebarContentRef}
          className='sidebar'
        >
          <div className='sidebar_close-btn'>
            <button
              ref={closeBtn2Ref}
              className='close-btn2'
            >
              <FaTimes />
            </button>
          </div>
          <div className='sidebar_logo'>
            <Link to={'/'}>
              <img
                src={Logo2}
                draggable='false'
              />
            </Link>
          </div>
          <div className='sidebar_title'>
            <p>
              Business consultation provides expert advice to improve
              performance.
            </p>
          </div>
          <div className='sidebar_contact-info'>
            <ul>
              <li>
                <MdLocationPin />
                <Link to={'/'}>24/22 Đường số 23, phường Hiệp Bình Chánh, TP.Thủ Đức</Link>
              </li>
              <li>
                <FaEnvelope />
                <a
                  href='https://mail.google.com/mail/?view=cm&fs=1&to=stl.solution.co@gmail.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  stl.solution.co@gmail.com
                </a>
              </li>
              <li>
                <FaPhoneAlt />
                <Link to={'/'}>+84 908 229 309</Link>
              </li>
            </ul>
          </div>
          <div className='sidebar_input'>
            <div className='offcanvas_input-title'>
              <h4>Get Update</h4>
            </div>
            <form
              action='#'
              method='post'
            >
              <div className='relative'>
                <input
                  type='email'
                  name='email'
                  placeholder='Enter E-Mail'
                  required
                />
                <button type='submit'>
                  <IoMdPaperPlane />
                </button>
              </div>
            </form>
          </div>
          <ul className='sidebar-social-icon'>
            <li>
              <Link to={'/'}>
                <FaFacebookF />
              </Link>
            </li>
            <li>
              <Link to={'/'}>
                <FaXTwitter />
              </Link>
            </li>
            <li>
              <Link to={'/'}>
                <FaPinterestP />
              </Link>
            </li>
            <li>
              <Link to={'/'}>
                <FaLinkedinIn />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        ref={bodyOverlay2Ref}
        className='body-overlay2'
      ></div>
      <div className='search-popup'>
        <button
          className='close-search'
          onClick={handleCloseSearchClick}
        >
          <LiaTimesSolid />
        </button>
        <button
          className='close-search2'
          onClick={handleCloseSearchClick}
        >
          <FaArrowUp />
        </button>
        <form
          method='post'
          onSubmit={handleSubmit}
        >
          <div className='form-group'>
            <input
              type='search'
              name='search-field'
              placeholder='Search Here'
              required
              className='font-FiraSans placeholder:font-FiraSans'
              ref={searchInputRef}
            />
            <button
              type='submit'
              disabled={isSubmitting} // Disable button if submitting
            >
              {isSubmitting ? (
                <span>Loading...</span> // Show loading text
              ) : (
                <IoSearch />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
