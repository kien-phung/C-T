import { FaPhoneAlt, FaRegThumbsUp, FaUser } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { MdCall } from 'react-icons/md';
import border from '/images/hero_border.png';
import appoinmentShape from '/images/contact_shape.png';
import serviceShape3 from '/images/service_shpe2.png';
import { Link } from 'react-router-dom';
import { FaRegEnvelopeOpen } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getTranslation } from '../../../utils/translations';
import { useState } from 'react';
import { submitContact } from '../../../api/api';

const Contact = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    message: '',
    terms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      setSubmitMessage(t('contact.termsError'));
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await submitContact({
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        message: formData.message,
        submit_type: 'Contact Form',
        language: currentLanguage
      });

      if (response.data.success) {
        setSubmitMessage(t('contact.successMessage'));
        setFormData({
          name: '',
          email: '',
          address: '',
          phone: '',
          message: '',
          terms: false
        });
      } else {
        setSubmitMessage(t('contact.errorMessage'));
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage(t('contact.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='py-28 relative'>
      <div className='absolute -z-10 right-48 bottom-10 hidden 2xl:block animate-rotate'>
        <img
          src={serviceShape3}
          draggable='false'
        />
      </div>
      <div className='Container'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-7 items-center'>
          <div>
            <div>
              <h5
                className='font-FiraSans font-medium text-sm sm:text-base text-PrimaryColor-0 uppercase flex items-center gap-2 mb-3 pt-4'
                data-aos='fade-up'
                data-aos-duration='800'
              >
                {t('contact.sectionTitle')}
              </h5>
              <h1
                className='font-FiraSans font-semibold text-HeadingColor-0 text-[22px] leading-[32px] sm:text-[32px] sm:leading-[42px] md:text-[40px] md:leading-[50px] lg:text-[48px] lg:leading-[58px] xl:text-[56px] xl:leading-[66px]'
                data-aos='fade-up'
                data-aos-duration='800'
                data-aos-delay='100'
              >
                {t('contact.contactWithUs')}
              </h1>
              <p
                className='font-FiraSans text-TextColor2-0 pt-4'
                data-aos='fade-up'
                data-aos-duration='800'
                data-aos-delay='200'
              >
                {t('contact.contactDescription')}
              </p>
            </div>
            <div
              className='bg-BodyBg4-0 rounded-xl p-10 mt-11'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='300'
            >
              <div className='flex items-center gap-5 group border-b border-dashed border-HeadingColor-0 border-opacity-40 pb-5'>
                <div className='size-[70px] bg-white rounded-full flex items-center justify-center text-PrimaryColor-0 transition-all duration-500 group-hover:text-white relative z-10 before:absolute before:left-0 before:top-0 before:size-full before:bg-PrimaryColor-0 before:transition-all before:duration-500 before:scale-0 before:-z-10 before:rounded-full group-hover:before:scale-100'>
                  <FaPhoneAlt size={'20'} />
                </div>
                <div>
                  <h6 className='font-FiraSans text-TextColor2-0'>
                    {t('contact.callUs')}
                  </h6>
                  <a href='https://zalo.me/84822191605' target='_blank' rel='noopener noreferrer'>
                    <button className='font-FiraSans text-xl text-HeadingColor-0 font-medium mt-1'>
                      0822191605
                    </button>
                  </a>
                </div>
              </div>
              <div className='flex items-center gap-5 group border-b border-dashed border-HeadingColor-0 border-opacity-40 py-5'>
                <div className='size-[70px] bg-white rounded-full flex items-center justify-center text-PrimaryColor-0 transition-all duration-500 group-hover:text-white relative z-10 before:absolute before:left-0 before:top-0 before:size-full before:bg-PrimaryColor-0 before:transition-all before:duration-500 before:scale-0 before:-z-10 before:rounded-full group-hover:before:scale-100'>
                  <FaRegEnvelopeOpen size={'20'} />
                </div>
                <div>
                  <h6 className='font-FiraSans text-TextColor2-0'>{t('contact.emailUs')}</h6>
                  <a href='https://mail.google.com/mail/?view=cm&fs=1&to=stl.solution.co@gmail.com' target='_blank' rel='noopener noreferrer'>
                    <button className='font-FiraSans text-xl text-HeadingColor-0 font-medium mt-1'>
                      stl.solution.co@gmail.com
                    </button>
                  </a>
                </div>
              </div>
              <div className='flex items-center gap-5 group pt-5 pb-2'>
                <div className='size-[70px] bg-white rounded-full flex items-center justify-center text-PrimaryColor-0 transition-all duration-500 group-hover:text-white relative z-10 before:absolute before:left-0 before:top-0 before:size-full before:bg-PrimaryColor-0 before:transition-all before:duration-500 before:scale-0 before:-z-10 before:rounded-full group-hover:before:scale-100'>
                  <IoLocationOutline size={'24'} />
                </div>
                <div>
                  <h6 className='font-FiraSans text-TextColor2-0'>
                    {t('contact.ourAddress')}
                  </h6>
                  <p className='font-FiraSans text-xl text-HeadingColor-0 font-medium mt-1'>
                    24/22 Đường số 23, phường Hiệp Bình Chánh <br /> TP.Thủ Đức, TP.HCM
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className='relative'
            data-aos='fade-up'
            data-aos-duration='800'
            data-aos-delay='400'
          >
            <img
              src={appoinmentShape}
              draggable='false'
              className='absolute top-0 right-6 animate-movebtn'
            />
            <div className='relative z-20 bg-white shadow-shades pt-16 px-4 sm:px-6 md:px-[50px] lg:px-4 xl:px-10 2xl:px-[50px] rounded-md'>
              <div className='text-center'>
                <h5 className='font-FiraSans font-medium text-sm sm:text-base text-PrimaryColor-0 uppercase mb-3'>
                  {t('contact.sectionTitle')}
                </h5>
                <h1 className='font-FiraSans font-semibold text-HeadingColor-0 inline-block text-[16px] leading-[26px] sm:text-[25px] sm:leading-[35px] md:text-[30px] md:leading-[40px] lg:text-[30px] lg:leading-[44px] xl:text-[32px] xl:leading-[44px] 2xl:text-[34px] 2xl:leading-[44px] relative pb-4'>
                  {t('contact.formTitle')}
                  <img
                    src={border}
                    draggable='false'
                    className='absolute bottom-0 left-1/2 -translate-x-1/2'
                  />
                </h1>
              </div>
              <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-y-5 pt-11 pb-[60px]'
              >
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                  <div className='relative inline-block'>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('contact.namePlaceholder')}
                      required
                      className='font-FiraSans text-HeadingColor-0 placeholder:text-TextColor-0 text-xs sm:text-sm bg-transparent border border-Secondarycolor-0 border-opacity-20 rounded py-2 px-3 sm:px-6 h-12 sm:h-[54px] w-full focus:outline-PrimaryColor-0'
                    />
                    <FaUser
                      size={'14'}
                      className='absolute text-PrimaryColor-0 top-1/2 -translate-y-1/2 right-5'
                    />
                  </div>
                  <div className='relative inline-block'>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('contact.emailPlaceholder')}
                      required
                      className='font-FiraSans text-HeadingColor-0 placeholder:text-TextColor-0 text-xs sm:text-sm bg-transparent border border-Secondarycolor-0 border-opacity-20 rounded py-2 px-3 sm:px-6 h-12 sm:h-[54px] w-full focus:outline-PrimaryColor-0'
                    />
                    <HiOutlineMailOpen
                      size={'16'}
                      className='absolute text-PrimaryColor-0 top-1/2 -translate-y-1/2 right-5'
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                  <div className='relative inline-block'>
                    <input
                      type='text'
                      name='address'
                      id='address'
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder={t('contact.addressPlaceholder')}
                      required
                      className='font-FiraSans text-HeadingColor-0 placeholder:text-TextColor-0 text-xs sm:text-sm bg-transparent border border-Secondarycolor-0 border-opacity-20 rounded py-2 px-3 sm:px-6 h-12 sm:h-[54px] w-full focus:outline-PrimaryColor-0'
                    />
                    <FaHouse
                      size={'16'}
                      className='absolute text-PrimaryColor-0 top-1/2 -translate-y-1/2 right-5'
                    />
                  </div>
                  <div className='relative inline-block'>
                    <input
                      type='text'
                      name='phone'
                      id='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t('contact.phonePlaceholder')}
                      required
                      className='font-FiraSans text-HeadingColor-0 placeholder:text-TextColor-0 text-xs sm:text-sm bg-transparent border border-Secondarycolor-0 border-opacity-20 rounded py-2 px-3 sm:px-6 h-12 sm:h-[54px] w-full focus:outline-PrimaryColor-0'
                    />
                    <MdCall
                      size={'16'}
                      className='absolute text-PrimaryColor-0 top-1/2 -translate-y-1/2 right-5'
                    />
                  </div>
                </div>
                <textarea
                  name='message'
                  id='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('contact.messagePlaceholder')}
                  className='font-FiraSans text-HeadingColor-0 placeholder:text-TextColor-0 text-sm bg-transparent border border-Secondarycolor-0 border-opacity-20 rounded py-2 px-6 h-[120px] w-full focus:outline-PrimaryColor-0 resize-none'
                ></textarea>
                <label
                  htmlFor='terms'
                  className='font-FiraSans text-TextColor-0 text-sm flex items-center gap-2 cursor-pointer'
                >
                  <input
                    type='checkbox'
                    name='terms'
                    id='terms'
                    checked={formData.terms}
                    onChange={handleInputChange}
                  />
                  {t('contact.agreeTerms')}
                </label>
                {submitMessage && (
                  <div className={`text-sm font-FiraSans ${submitMessage.includes('error') || submitMessage.includes('lỗi') || submitMessage.includes('vui lòng') ? 'text-red-500' : 'text-green-600'}`}>
                    {submitMessage}
                  </div>
                )}
                <div className='inline-block mt-2'>
                  <button
                    type='submit'
                    className='primary-btn2 !py-[15px]'
                    disabled={isSubmitting}
                  >
                    <FaRegThumbsUp />
                    {isSubmitting ? t('contact.submitting') : t('contact.submitButton')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
