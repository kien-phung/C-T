import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGlobe, FaMoon, FaSun } from 'react-icons/fa';
import stlLogo from '/images/logo1.png';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import { adminLogin, adminForgotSendOtp, adminForgotResetPassword } from '../../api/api';
import { useAdminTheme } from '../../contexts/AdminThemeContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const { adminTheme, toggleAdminTheme } = useAdminTheme();

  // Translate Vietnamese error messages to English
  const translateErrorMessage = (message) => {
    if (!message) return message;

    console.log('[DEBUG] Original error message:', message);
    console.log('[DEBUG] Current language:', currentLanguage);

    if (currentLanguage === 'VN') return message;

    const errorMap = {
      'Email không tồn tại': t('admin.emailNotFound'),
      'Mật khẩu không đúng': t('admin.wrongPassword'),
      'Email không hợp lệ': t('admin.invalidEmail'),
      'Xác thực thất bại': t('admin.authenticationFailed'),
      'Đăng nhập thất bại': t('admin.loginFailed'),
      'Quản trị viên không tồn tại': t('admin.adminNotFound'),
    };

    const translated = errorMap[message] || message;
    console.log('[DEBUG] Translated message:', translated);
    return translated;
  };

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // Forgot password states
  const [showForgot, setShowForgot] = useState(false);
  const [fpStep, setFpStep] = useState('REQUEST'); // REQUEST -> RESET
  const [fpEmail, setFpEmail] = useState('');
  const [fpOtp, setFpOtp] = useState('');
  const [fpNewPwd, setFpNewPwd] = useState('');
  const [fpLoading, setFpLoading] = useState(false);
  const [fpMessage, setFpMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(() => {
    try {
      return localStorage.getItem('adminRememberMe') === 'true';
    } catch (_) {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (localStorage.getItem('adminRememberMe') === 'true') {
        const savedEmail = localStorage.getItem('adminRememberEmail') || '';
        if (savedEmail) {
          setFormData(prev => ({ ...prev, email: savedEmail }));
        }
      }
    } catch (_) {}
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await adminLogin(formData.email, formData.password);

      if (response.data.success) {
        // Save token to localStorage
        localStorage.setItem('adminToken', response.data.data.token);
        localStorage.setItem('adminEmail', response.data.data.admin.email);

        // Remember email if opted in
        try {
          if (rememberMe) {
            localStorage.setItem('adminRememberMe', 'true');
            localStorage.setItem('adminRememberEmail', formData.email);
          } else {
            localStorage.setItem('adminRememberMe', 'false');
            localStorage.removeItem('adminRememberEmail');
          }
        } catch (_) {}

        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        let errorMessage = response.data.message || '';
        const translatedError = translateErrorMessage(errorMessage) || t('admin.loginFailed');
        setError(translatedError);
      }
    } catch (err) {
      console.error('Login error:', err);
      let errorMessage = err.response?.data?.message || '';

      if (err.response?.status === 401) {
        errorMessage = errorMessage || (currentLanguage === 'VN' ? 'Email hoặc mật khẩu không đúng' : 'Invalid email or password');
      }

      const translatedError = translateErrorMessage(errorMessage) || t('admin.connectionError');
      setError(translatedError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotRequest = async (e) => {
    e.preventDefault();
    setFpMessage('');
    if (!fpEmail) {
      setFpMessage(currentLanguage === 'VN' ? 'Vui lòng nhập email' : 'Please enter email');
      return;
    }
    try {
      setFpLoading(true);
      const res = await adminForgotSendOtp(fpEmail);
      if (res?.data?.success) {
        setFpMessage(t('admin.otpSent'));
        setFpStep('RESET');
      } else {
        setFpMessage(res?.data?.message || (currentLanguage === 'VN' ? 'Không thể gửi OTP' : 'Could not send OTP'));
      }
    } catch (err) {
      setFpMessage(err.response?.data?.message || (currentLanguage === 'VN' ? 'Không thể gửi OTP' : 'Could not send OTP'));
    } finally {
      setFpLoading(false);
    }
  };

  const handleForgotReset = async (e) => {
    e.preventDefault();
    setFpMessage('');
    if (!fpEmail || !fpOtp || !fpNewPwd) {
      setFpMessage(currentLanguage === 'VN' ? 'Vui lòng nhập đủ thông tin' : 'Please fill all fields');
      return;
    }
    try {
      setFpLoading(true);
      const res = await adminForgotResetPassword(fpEmail, fpOtp, fpNewPwd);
      if (res?.data?.success) {
        setFpMessage(t('admin.resetSuccess'));
        // Clear states and hide panel after short delay
        setTimeout(() => {
          setShowForgot(false);
          setFpStep('REQUEST');
          setFpEmail('');
          setFpOtp('');
          setFpNewPwd('');
        }, 1200);
      } else {
        setFpMessage(res?.data?.message || t('admin.resetFailed'));
      }
    } catch (err) {
      setFpMessage(err.response?.data?.message || t('admin.resetFailed'));
    } finally {
      setFpLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-blue-600 dark:from-green-900 dark:via-blue-900 dark:to-blue-950 py-12 px-4 sm:px-6 lg:px-8'>
      {/* Language & Theme Toggle */}
      <div className='absolute top-6 right-6 flex items-center gap-2'>
        <button
          onClick={toggleLanguage}
          className='flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors shadow-lg backdrop-blur-sm font-medium'
        >
          <FaGlobe size={16} />
          <span>{currentLanguage === 'VN' ? 'EN' : 'VN'}</span>
        </button>
        <button
          onClick={toggleAdminTheme}
          className='flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors shadow-lg backdrop-blur-sm font-medium'
          title={adminTheme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {adminTheme === 'dark' ? <FaSun size={14} /> : <FaMoon size={14} />}
          <span className='text-sm'>{adminTheme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>

      <div className='max-w-md w-full space-y-8'>
        {/* Header */}
        <div className='text-center animate-admin-fade-in'>
          <img
            src={stlLogo}
            alt='STL Solution Logo'
            className='mx-auto h-32 w-auto drop-shadow-lg hover:scale-110 transition-transform duration-300'
          />
          <h2 className='mt-6 text-4xl font-extrabold text-white drop-shadow-lg animate-admin-slide-down' style={{ animationDelay: '0.1s' }}>
            {t('admin.login')}
          </h2>
          <p className='mt-2 text-sm text-white/80 animate-admin-slide-down' style={{ animationDelay: '0.2s' }}>
            STL Solution - {t('admin.adminPanel')}
          </p>
        </div>

        {/* Login Form */}
        <form className='mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl animate-admin-scale-up' onSubmit={handleSubmit}>
          {error && (
            <div className='bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded relative' role='alert'>
              <span className='block sm:inline'>{error}</span>
            </div>
          )}

          <div className='space-y-4'>
            {/* Email Input */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                {t('admin.email')}
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FaEnvelope className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className='appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='admin@stlsolution.com'
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                {t('admin.password')}
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FaLock className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='current-password'
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className='appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-md placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='••••••••'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  aria-label={showPassword ? (currentLanguage === 'VN' ? 'Ẩn mật khẩu' : 'Hide password') : (currentLanguage === 'VN' ? 'Hiện mật khẩu' : 'Show password')}
                >
                  {showPassword ? <FaEyeSlash className='h-5 w-5' /> : <FaEye className='h-5 w-5' />}
                </button>
              </div>
            </div>
          </div>

          {/* Remember Me */}
          <div className='flex items-center justify-between'>
            <label className='flex items-center text-sm text-gray-700 dark:text-gray-300'>
              <input
                type='checkbox'
                className='rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500'
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className='ml-2'>{t('admin.rememberMe')}</span>
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              disabled={isLoading}
              className='group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg'
            >
              {isLoading ? (
                <span className='flex items-center'>
                  <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  {currentLanguage === 'VN' ? 'Đang đăng nhập...' : 'Logging in...'}
                </span>
              ) : (
                t('admin.login')
              )}
            </button>
          </div>

        </form>
        {/* Forgot Password Toggle */}
        <div className='mt-4 max-w-md w-full'>
          <button
            type='button'
            className='text-white/90 underline hover:text-white text-sm'
            onClick={() => { setShowForgot(true); setFpStep('REQUEST'); setFpEmail(''); setFpOtp(''); setFpNewPwd(''); setFpMessage(''); }}
          >
            {t('admin.forgotPassword')}
          </button>
        </div>

        {/* Forgot Password Modal Overlay */}
        {showForgot && (
          <div className='fixed inset-0 z-[1000] flex items-center justify-center bg-black/50'>
            <div className='w-[92%] max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl relative'>
              <button
                type='button'
                className='absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                onClick={() => { setShowForgot(false); setFpMessage(''); }}
                aria-label='Close'
              >
                ✕
              </button>
              {fpStep === 'REQUEST' ? (
                <form onSubmit={handleForgotRequest} className='space-y-3'>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                    {t('admin.forgotEnterEmail')}
                  </label>
                  <input
                    type='email'
                    value={fpEmail}
                    onChange={(e) => setFpEmail(e.target.value)}
                    className='w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                    placeholder='admin@example.com'
                    autoComplete='email'
                    required
                  />
                  {fpMessage && (
                    <p className='text-sm text-gray-700 dark:text-gray-300'>{fpMessage}</p>
                  )}
                  <button
                    type='submit'
                    disabled={fpLoading}
                    className='w-full py-2 px-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm disabled:opacity-50'
                  >
                    {fpLoading ? (currentLanguage === 'VN' ? 'Đang gửi...' : 'Sending...') : t('admin.sendOtp')}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleForgotReset} className='space-y-3'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                      {t('admin.enterOtp')}
                    </label>
                    <input
                      type='text'
                      value={fpOtp}
                      onChange={(e) => setFpOtp(e.target.value)}
                      className='w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                      placeholder='123456'
                      autoComplete='one-time-code'
                      autoFocus
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                      {t('admin.newPasswordLabel')}
                    </label>
                    <input
                      type='password'
                      value={fpNewPwd}
                      onChange={(e) => setFpNewPwd(e.target.value)}
                      className='w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                      placeholder='••••••••'
                      autoComplete='new-password'
                      required
                    />
                  </div>
                  {fpMessage && (
                    <p className='text-sm text-gray-700 dark:text-gray-300'>{fpMessage}</p>
                  )}
                  <button
                    type='submit'
                    disabled={fpLoading}
                    className='w-full py-2 px-3 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm disabled:opacity-50'
                  >
                    {fpLoading ? t('admin.resetting') : t('admin.resetPassword')}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
