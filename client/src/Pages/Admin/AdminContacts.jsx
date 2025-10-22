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
  FaTrash,
  FaEye,
  FaSearch,
  FaFilter,
  FaGlobe
} from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import { getAdminContacts, deleteAdminContact, deleteAdminContacts } from '../../api/api';

const AdminContacts = () => {
  const navigate = useNavigate();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');

    if (!token) {
      navigate('/admin/login');
      return;
    }

    setAdminEmail(email || 'Admin');
    fetchContacts();
  }, [navigate, pagination.page, filterType]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit
      };

      if (filterType !== 'all') {
        params.submit_type = filterType;
      }
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await getAdminContacts(params);

      if (response.data.success) {
        setContacts(response.data.data.contacts);
        setPagination(prev => ({
          ...prev,
          ...response.data.data.pagination
        }));
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const deleteMessage = currentLanguage === 'VN' ? 'Bạn có chắc muốn xóa liên hệ này?' : 'Are you sure you want to delete this contact?';
    if (!confirm(deleteMessage)) return;

    try {
      await deleteAdminContact(id);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchContacts();
  };

  const toggleSelectContact = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(contacts.map(contact => contact._id));
  };

  const deselectAll = () => {
    setSelectedIds([]);
  };

  const handleDeleteSelected = async () => {
    const selectMessage = currentLanguage === 'VN' ? 'Vui lòng chọn ít nhất một liên hệ' : 'Please select at least one contact';
    if (selectedIds.length === 0) {
      alert(selectMessage);
      return;
    }

    const confirmMessage = currentLanguage === 'VN'
      ? `Bạn có chắc muốn xóa ${selectedIds.length} liên hệ này?`
      : `Are you sure you want to delete ${selectedIds.length} contacts?`;
    if (!confirm(confirmMessage)) return;

    setIsDeleting(true);

    try {
      await deleteAdminContacts(selectedIds);

      setSelectedIds([]);
      await fetchContacts();
      const successMessage = currentLanguage === 'VN' ? '✅ Xóa thành công!' : '✅ Deleted successfully!';
      alert(successMessage);
    } catch (error) {
      console.error('Error deleting contacts:', error);
      const errorMessage = currentLanguage === 'VN' ? '❌ Có lỗi xảy ra khi xóa liên hệ' : '❌ Error deleting contacts';
      alert(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='flex h-screen bg-gradient-to-br from-green-50 via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800'>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-green-600 via-blue-600 to-blue-700 dark:from-green-900 dark:via-blue-900 dark:to-blue-950 text-white transition-all duration-300 flex flex-col shadow-2xl animate-admin-slide-in-left`}>
        <div className='p-4 flex items-center justify-between border-b border-white/20'>
          {sidebarOpen && <h1 className='text-xl font-bold'>{t('admin.stlAdmin')}</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className='p-2 rounded hover:bg-white/20 transition-colors'>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className='flex-1 p-4 space-y-2'>
          <Link to='/admin/dashboard' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaHome size={20} />
            {sidebarOpen && <span>{t('admin.dashboard')}</span>}
          </Link>

          <Link to='/admin/contacts' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 bg-white/30 transition-colors shadow-md'>
            <FaEnvelope size={20} />
            {sidebarOpen && <span>{t('admin.contacts')}</span>}
          </Link>

          <Link to='/admin/users' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 opacity-50 cursor-not-allowed'>
            <FaUsers size={20} />
            {sidebarOpen && <span>{t('admin.users')}</span>}
          </Link>

          <Link to='/admin/blogs' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 opacity-50 cursor-not-allowed'>
            <FaBlog size={20} />
            {sidebarOpen && <span>{t('admin.blogs')}</span>}
          </Link>

          <Link to='/admin/projects' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 opacity-50 cursor-not-allowed'>
            <FaProjectDiagram size={20} />
            {sidebarOpen && <span>{t('admin.projects')}</span>}
          </Link>
        </nav>

        <div className='p-4 border-t border-white/20'>
          {sidebarOpen && (
            <div className='mb-3 text-sm'>
              <p className='text-white/70'>{t('admin.loggedInAs')}</p>
              <p className='font-semibold truncate'>{adminEmail}</p>
            </div>
          )}
          <button onClick={handleLogout} className='flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 bg-gradient-to-r from-red-500 to-red-600 w-full transition-all shadow-md'>
            <FaSignOutAlt size={20} />
            {sidebarOpen && <span>{t('admin.logout')}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        <header className='bg-white dark:bg-gray-800 shadow-sm p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>{t('admin.contacts')}</h2>
            <button
              onClick={toggleLanguage}
              className='flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors shadow-sm font-medium'
            >
              <FaGlobe size={14} />
              <span className='text-sm'>{currentLanguage === 'VN' ? 'EN' : 'VN'}</span>
            </button>
          </div>
        </header>

        <main className='flex-1 overflow-y-auto p-6'>
          {/* Filters */}
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 animate-admin-fade-in'>
            <div className='flex flex-col md:flex-row gap-4 mb-4'>
              {/* Search */}
              <form onSubmit={handleSearch} className='flex-1'>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder={currentLanguage === 'VN' ? 'Tìm theo tên, email, số điện thoại...' : 'Search by name, email, phone...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  />
                  <FaSearch className='absolute left-3 top-3 text-gray-400' />
                </div>
              </form>

              {/* Filter by type */}
              <div className='flex items-center gap-2'>
                <FaFilter className='text-gray-400' />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className='px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                >
                  <option value='all'>{currentLanguage === 'VN' ? 'Tất cả' : 'All'}</option>
                  <option value='Contact Form'>{currentLanguage === 'VN' ? 'Biểu Mẫu Liên Hệ' : 'Contact Form'}</option>
                  <option value='Appointment Form'>{currentLanguage === 'VN' ? 'Biểu Mẫu Đặt Lịch' : 'Appointment Form'}</option>
                  <option value='Newsletter'>{currentLanguage === 'VN' ? 'Tin Tức' : 'Newsletter'}</option>
                </select>
              </div>
            </div>

            {/* Bulk Actions */}
            {contacts.length > 0 && (
              <div className='flex flex-col sm:flex-row gap-2 items-center'>
                <div className='flex gap-2'>
                  <button
                    onClick={selectAll}
                    className='px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors admin-btn-hover'
                  >
                    {t('admin.selectAll')}
                  </button>
                  <button
                    onClick={deselectAll}
                    className='px-3 py-2 bg-gray-400 hover:bg-gray-500 text-white text-sm rounded-lg transition-colors admin-btn-hover'
                  >
                    {t('admin.deselectAll')}
                  </button>
                </div>

                {selectedIds.length > 0 && (
                  <>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      {currentLanguage === 'VN' ? 'Đã chọn:' : 'Selected:'} <span className='font-semibold'>{selectedIds.length}</span>
                    </span>
                    <button
                      onClick={handleDeleteSelected}
                      disabled={isDeleting}
                      className='px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white text-sm rounded-lg transition-colors flex items-center gap-2 admin-btn-hover'
                    >
                      {isDeleting ? (
                        <>
                          <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                          {currentLanguage === 'VN' ? 'Đang xóa...' : 'Deleting...'}
                        </>
                      ) : (
                        <>
                          <FaTrash size={14} />
                          {t('admin.deleteSelected')} ({selectedIds.length})
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Table */}
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'>
            {loading ? (
              <div className='flex items-center justify-center h-64'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
              </div>
            ) : contacts.length === 0 ? (
              <div className='text-center py-12'>
                <FaEnvelope className='mx-auto text-gray-400 mb-4' size={48} />
                <p className='text-gray-600 dark:text-gray-400'>{t('admin.noData')}</p>
              </div>
            ) : (
              <>
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                    <thead className='bg-gray-50 dark:bg-gray-900'>
                      <tr>
                        <th className='px-4 py-3 text-left'>
                          <input
                            type='checkbox'
                            checked={selectedIds.length === contacts.length && contacts.length > 0}
                            onChange={(e) => e.target.checked ? selectAll() : deselectAll()}
                            className='w-4 h-4 rounded cursor-pointer'
                          />
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>{t('admin.name')}</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>{t('admin.email')}</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>{t('admin.phone')}</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>{t('admin.type')}</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>{t('admin.date')}</th>
                        <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>{t('admin.action')}</th>
                      </tr>
                    </thead>
                    <tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
                      {contacts.map((contact) => (
                        <tr
                          key={contact._id}
                          className={`admin-table-row ${selectedIds.includes(contact._id) ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}
                        >
                          <td className='px-4 py-4 whitespace-nowrap'>
                            <input
                              type='checkbox'
                              checked={selectedIds.includes(contact._id)}
                              onChange={() => toggleSelectContact(contact._id)}
                              className='w-4 h-4 rounded cursor-pointer'
                            />
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>{contact.name}</td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400'>{contact.email}</td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400'>{contact.phone}</td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'>
                              {contact.submit_type || 'N/A'}
                            </span>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400'>
                            {new Date(contact.createdAt).toLocaleDateString(currentLanguage === 'VN' ? 'vi-VN' : 'en-US')}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                            <button
                              onClick={() => handleView(contact)}
                              className='text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4'
                            >
                              <FaEye size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(contact._id)}
                              className='text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300'
                            >
                              <FaTrash size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className='bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6'>
                  <div className='text-sm text-gray-700 dark:text-gray-300'>
                    {currentLanguage === 'VN' ? 'Hiển thị' : 'Showing'} <span className='font-medium'>{contacts.length}</span> / <span className='font-medium'>{pagination.total}</span> {currentLanguage === 'VN' ? 'liên hệ' : 'contacts'}
                  </div>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                      disabled={pagination.page === 1}
                      className='px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {currentLanguage === 'VN' ? 'Trước' : 'Previous'}
                    </button>
                    <span className='px-4 py-2 text-sm text-gray-700 dark:text-gray-300'>
                      {currentLanguage === 'VN' ? 'Trang' : 'Page'} {pagination.page} / {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                      disabled={pagination.page === pagination.totalPages}
                      className='px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {currentLanguage === 'VN' ? 'Sau' : 'Next'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      {showModal && selectedContact && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-admin-fade-in'>
          <div className='bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-appear'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white'>{currentLanguage === 'VN' ? 'Chi tiết liên hệ' : 'Contact Details'}</h3>
                <button onClick={() => setShowModal(false)} className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'>
                  <FaTimes size={24} />
                </button>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='text-sm font-medium text-gray-600 dark:text-gray-400'>{t('admin.name')}:</label>
                  <p className='text-gray-900 dark:text-white'>{selectedContact.name}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600 dark:text-gray-400'>{t('admin.email')}:</label>
                  <p className='text-gray-900 dark:text-white'>{selectedContact.email}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600 dark:text-gray-400'>{t('admin.phone')}:</label>
                  <p className='text-gray-900 dark:text-white'>{selectedContact.phone}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600 dark:text-gray-400'>{t('admin.address')}:</label>
                  <p className='text-gray-900 dark:text-white'>{selectedContact.address}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600 dark:text-gray-400'>{t('admin.type')}:</label>
                  <p className='text-gray-900 dark:text-white'>{selectedContact.submit_type}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600 dark:text-gray-400'>{t('admin.message')}:</label>
                  <p className='text-gray-900 dark:text-white whitespace-pre-wrap'>{selectedContact.message}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600 dark:text-gray-400'>{t('admin.date')}:</label>
                  <p className='text-gray-900 dark:text-white'>
                    {new Date(selectedContact.createdAt).toLocaleString(currentLanguage === 'VN' ? 'vi-VN' : 'en-US')}
                  </p>
                </div>
              </div>

              <div className='mt-6 flex justify-end gap-3'>
                <button
                  onClick={() => handleDelete(selectedContact._id)}
                  className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 admin-btn-hover'
                >
                  {t('admin.delete')}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className='px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500 admin-btn-hover'
                >
                  {currentLanguage === 'VN' ? 'Đóng' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
