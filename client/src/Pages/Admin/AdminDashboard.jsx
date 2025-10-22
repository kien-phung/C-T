import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaHome,
  FaEnvelope,
  FaUsers,
  FaBlog,
  FaProjectDiagram,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartLine,
  FaGlobe
} from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import { getAdminStats } from '../../api/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [stats, setStats] = useState({
    totalContacts: 0,
    recentContacts: 0,
    totalUsers: 0,
    totalBlogs: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');

    if (!token) {
      navigate('/admin/login');
      return;
    }

    setAdminEmail(email || 'Admin');

    // Fetch dashboard stats
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const response = await getAdminStats();

      if (response.data.success) {
        setStats({
          totalContacts: response.data.data.total || 0,
          recentContacts: response.data.data.recentCount || 0,
          totalUsers: 0,
          totalBlogs: 0
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  return (
    <div className='flex h-screen bg-gradient-to-br from-green-50 via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800'>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-green-600 via-blue-600 to-blue-700 dark:from-green-900 dark:via-blue-900 dark:to-blue-950 text-white transition-all duration-300 flex flex-col shadow-2xl animate-admin-slide-in-left`}>
        {/* Sidebar Header */}
        <div className='p-4 flex items-center justify-between border-b border-white/20'>
          {sidebarOpen && <h1 className='text-xl font-bold'>{t('admin.stlAdmin')}</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='p-2 rounded hover:bg-white/20 transition-colors'
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 p-4 space-y-2'>
          <Link
            to='/admin/dashboard'
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 bg-white/30 transition-colors shadow-md admin-btn-hover'
          >
            <FaHome size={20} />
            {sidebarOpen && <span>{t('admin.dashboard')}</span>}
          </Link>

          <Link
            to='/admin/contacts'
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors admin-btn-hover'
          >
            <FaEnvelope size={20} />
            {sidebarOpen && <span>{t('admin.contacts')}</span>}
          </Link>

          <Link
            to='/admin/users'
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 opacity-50 cursor-not-allowed'
          >
            <FaUsers size={20} />
            {sidebarOpen && <span>{t('admin.users')}</span>}
          </Link>

          <Link
            to='/admin/blogs'
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 opacity-50 cursor-not-allowed'
          >
            <FaBlog size={20} />
            {sidebarOpen && <span>{t('admin.blogs')}</span>}
          </Link>

          <Link
            to='/admin/projects'
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 opacity-50 cursor-not-allowed'
          >
            <FaProjectDiagram size={20} />
            {sidebarOpen && <span>{t('admin.projects')}</span>}
          </Link>
        </nav>

        {/* User Info & Logout */}
        <div className='p-4 border-t border-white/20'>
          {sidebarOpen && (
            <div className='mb-3 text-sm'>
              <p className='text-white/70'>{t('admin.loggedInAs')}</p>
              <p className='font-semibold truncate'>{adminEmail}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 bg-gradient-to-r from-red-500 to-red-600 w-full transition-all shadow-md'
          >
            <FaSignOutAlt size={20} />
            {sidebarOpen && <span>{t('admin.logout')}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Header */}
        <header className='bg-white dark:bg-gray-800 shadow-sm p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>{t('admin.dashboard')}</h2>
            <div className='flex items-center gap-4'>
              <button
                onClick={toggleLanguage}
                className='flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors shadow-sm font-medium'
              >
                <FaGlobe size={14} />
                <span className='text-sm'>{currentLanguage === 'VN' ? 'EN' : 'VN'}</span>
              </button>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                {new Date().toLocaleDateString(currentLanguage === 'VN' ? 'vi-VN' : 'en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className='flex-1 overflow-y-auto p-6'>
          {loading ? (
            <div className='flex items-center justify-center h-64'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 admin-stagger'>
                {/* Total Contacts */}
                <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md admin-transition admin-btn-hover'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>{t('admin.totalContacts')}</p>
                      <p className='text-3xl font-bold text-gray-800 dark:text-white'>{stats.totalContacts}</p>
                    </div>
                    <div className='p-3 bg-blue-100 dark:bg-blue-900 rounded-full'>
                      <FaEnvelope className='text-blue-600 dark:text-blue-300' size={24} />
                    </div>
                  </div>
                </div>

                {/* Recent Contacts */}
                <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md admin-transition admin-btn-hover'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>{t('admin.recentContacts')}</p>
                      <p className='text-3xl font-bold text-gray-800 dark:text-white'>{stats.recentContacts}</p>
                    </div>
                    <div className='p-3 bg-green-100 dark:bg-green-900 rounded-full animate-admin-pulse'>
                      <FaChartLine className='text-green-600 dark:text-green-300' size={24} />
                    </div>
                  </div>
                </div>

                {/* Total Users */}
                <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md admin-transition admin-btn-hover'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>{t('admin.totalUsers')}</p>
                      <p className='text-3xl font-bold text-gray-800 dark:text-white'>{stats.totalUsers}</p>
                    </div>
                    <div className='p-3 bg-purple-100 dark:bg-purple-900 rounded-full'>
                      <FaUsers className='text-purple-600 dark:text-purple-300' size={24} />
                    </div>
                  </div>
                </div>

                {/* Total Blogs */}
                <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md admin-transition admin-btn-hover'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>{t('admin.totalBlogs')}</p>
                      <p className='text-3xl font-bold text-gray-800 dark:text-white'>{stats.totalBlogs}</p>
                    </div>
                    <div className='p-3 bg-orange-100 dark:bg-orange-900 rounded-full'>
                      <FaBlog className='text-orange-600 dark:text-orange-300' size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Welcome Card */}
              <div className='bg-gradient-to-r from-green-500 via-blue-500 to-blue-600 rounded-lg shadow-xl p-8 text-white mb-6 animate-admin-scale-up hover:shadow-2xl transition-shadow duration-300'>
                <h3 className='text-3xl font-bold mb-2 animate-admin-slide-down' style={{ animationDelay: '0.1s' }}>{t('admin.welcomeBack')} 👋</h3>
                <p className='text-white/90 text-lg animate-admin-slide-down' style={{ animationDelay: '0.2s' }}>
                  {t('admin.managingSystem')}
                </p>
              </div>

              {/* Quick Actions */}
              <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-admin-fade-in'>
                <h3 className='text-xl font-bold text-gray-800 dark:text-white mb-4'>{t('admin.quickActions')}</h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 admin-stagger'>
                  <Link
                    to='/admin/contacts'
                    className='p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors admin-btn-hover'
                  >
                    <FaEnvelope className='text-blue-600 dark:text-blue-400 mb-2' size={24} />
                    <h4 className='font-semibold text-gray-800 dark:text-white'>{t('admin.viewContacts')}</h4>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>{t('admin.manageMessages')}</p>
                  </Link>

                  <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-50 cursor-not-allowed admin-transition'>
                    <FaUsers className='text-gray-400 mb-2' size={24} />
                    <h4 className='font-semibold text-gray-800 dark:text-white'>{t('admin.manageUsers')}</h4>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>{t('admin.comingSoon')}</p>
                  </div>

                  <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-50 cursor-not-allowed admin-transition'>
                    <FaBlog className='text-gray-400 mb-2' size={24} />
                    <h4 className='font-semibold text-gray-800 dark:text-white'>{t('admin.writeNewBlog')}</h4>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>{t('admin.comingSoon')}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
