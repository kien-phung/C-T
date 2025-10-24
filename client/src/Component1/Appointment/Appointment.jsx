import { FaRegThumbsUp, FaUser } from 'react-icons/fa';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { MdCall, MdLocalPhone } from 'react-icons/md';
import appoinmentThumb from '/images/contact1.jpg';
import border from '/images/hero_border.png';
import appoinmentShape from '/images/contact_shape.png';
import appoinmentThumbShape from '/images/contact_shapes.png';
import serviceShape3 from '/images/service_shpe2.png';
import { Link } from 'react-router-dom';
import { FaHouse } from 'react-icons/fa6';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import { useState } from 'react';
import { submitContact } from '../../api/api';

const Appointment = () => {
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
        submit_type: 'Appointment Form',
        language: currentLanguage
      });

      if (response.data.success) {
        setSubmitMessage('✅ ' + t('contact.successMessage'));
        setFormData({
          name: '',
          email: '',
          address: '',
          phone: '',
          message: '',
          terms: false
        });
      } else {
        setSubmitMessage('❌ ' + t('contact.errorMessage'));
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('❌ ' + t('contact.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className='pt-10 pb-10 sm:pt-20 sm:pb-20 relative bg-BodyBg4-0'>
      <div className='absolute -z-10 right-48 bottom-10 hidden 2xl:block animate-rotate'>
        <img
          src={serviceShape3}
          draggable='false'
        />
      </div>
      <div className='Container'>
        <div className='grid grid-cols-6 lg:grid-cols-12 items-start'>
          <div className='col-span-6 lg:col-span-7'>
            <div className='relative z-10'>
              <img
                src={appoinmentThumb}
                draggable='false'
                className='w-full lg:w-[inherit] max-w-[inherit] rounded-md'
              />
              <img
                src={appoinmentThumbShape}
                draggable='false'
                className='absolute top-[58%] sm:top-1/3 md:top-[58%] left-14 animate-swing'
              />
              <div className='hidden absolute bottom-[65px] left-[55px] bg-white bg-opacity-10 rounded-full pr-10 border-2 border-white border-opacity-40 backdrop-filter backdrop-blur-md sm:flex items-center gap-7'>
                <div className='size-[78px] rounded-full bg-PrimaryColor-0 flex items-center justify-center relative z-10 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:size-[81px] after:rounded-full after:bg-PrimaryColor-0 after:-z-10 before:absolute before:-top-3 before:-left-3 before:size-[102px] before:rounded-full before:border-2 before:border-PrimaryColor-0'>
                  <span className='size-9 flex items-center justify-center rounded-full text-white border-2 border-white'>
                    <MdLocalPhone size={'20'} />
                  </span>
                </div>
              <a
                href="https://zalo.me/84912345678" // Sử dụng mailto: + địa chỉ email
                className='font-FiraSans font-medium text-2xl text-white'
                >
                +84 908 229 309
              </a>
              </div>
            </div>
          </div>
          <div className='col-span-6 lg:col-span-5 relative'>
            <img
              src={appoinmentShape}
              draggable='false'
              className='absolute top-0 right-6 animate-movebtn'
            />
            <div className='relative z-20 bg-white dark:bg-gray-800 shadow-shades pt-8 sm:pt-11 mt-8 sm:mt-[100px] px-4 sm:px-6 md:px-[50px] lg:px-4 xl:px-10 2xl:px-[50px] rounded-md'>
              <div className='text-center'>
                <h5 className='font-FiraSans font-medium text-sm sm:text-base text-PrimaryColor-0 uppercase mb-3'>
                  {t('contact.sectionTitle')}
                </h5>
                <h1 className='font-FiraSans font-semibold text-HeadingColor-0 inline-block text-[20px] leading-[30px] sm:text-[25px] sm:leading-[35px] md:text-[30px] md:leading-[40px] lg:text-[34px] lg:leading-[44px] xl:text-[40px] xl:leading-[50px] 2xl:text-[42px] 2xl:leading-[52px] relative pb-4'>
                  {t('contact.title')}
                  <img
                    src={border}
                    draggable='false'
                    className='absolute bottom-0 left-1/2 -translate-x-1/2'
                  />
                </h1>
              </div>
              <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-y-5 pt-8 sm:pt-11 pb-8 sm:pb-[60px]'
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
                      className='font-FiraSans text-HeadingColor-0 placeholder:text-TextColor-0 text-sm bg-transparent border border-Secondarycolor-0 border-opacity-20 rounded py-2 px-6 h-12 sm:h-[54px] w-full focus:outline-PrimaryColor-0'
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
                      className='font-FiraSans text-HeadingColor-0 placeholder:text-TextColor-0 text-sm bg-transparent border border-Secondarycolor-0 border-opacity-20 rounded py-2 px-6 h-12 sm:h-[54px] w-full focus:outline-PrimaryColor-0'
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
                      className='font-FiraSans text-HeadingColor-0 placeholder:text-TextColor-0 text-sm bg-transparent border border-Secondarycolor-0 border-opacity-20 rounded py-2 px-6 h-12 sm:h-[54px] w-full focus:outline-PrimaryColor-0'
                    />
                    <FaHouse
                      size={'14'}
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
                      className='font-FiraSans text-HeadingColor-0 placeholder:text-TextColor-0 text-sm bg-transparent border border-Secondarycolor-0 border-opacity-20 rounded py-2 px-6 h-12 sm:h-[54px] w-full focus:outline-PrimaryColor-0'
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
                  className='font-FiraSans text-HeadingColor-0 placeholder:text-TextColor-0 text-sm bg-transparent border border-Secondarycolor-0 border-opacity-20 rounded py-2 px-6 h-[100px] sm:h-[120px] w-full focus:outline-PrimaryColor-0 resize-none'
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
                    className='primary-btn3'
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

export default Appointment;
