import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaEnvelope, FaUsers, FaBlog, FaProjectDiagram, FaShoppingCart, FaCogs, FaFileAlt, FaHandshake, FaSignOutAlt, FaBars, FaTimes, FaEdit, FaTrash, FaPlus, FaSearch, FaSync } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import { useAdminTheme } from '../../contexts/AdminThemeContext';
import { socket } from '../../api/socket';
import { getAdminCustomers, createAdminCustomer, updateAdminCustomer, deleteAdminCustomer } from '../../api/api';

const AdminCustomers = () => {
  const navigate = useNavigate();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const { adminTheme, toggleAdminTheme } = useAdminTheme();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', logo: '', website_url: '', display_order: 0 });
  const [showEdit, setShowEdit] = useState(false);
  const [editCustomer, setEditCustomer] = useState({ id: null, name: '', logo: '', website_url: '', display_order: 0 });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');
    if (!token) { navigate('/admin/login'); return; }
    setAdminEmail(email || 'Admin');
    fetchCustomers();
  }, [navigate]);

  // Realtime updates via Socket.IO
  useEffect(() => {
    const onChange = (payload) => {
      // Simple strategy: refetch list when any change happens
      fetchCustomers();
    };
    socket.on('customers.changed', onChange);
    return () => {
      socket.off('customers.changed', onChange);
    };
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await getAdminCustomers({ search: searchTerm });
      setCustomers(res?.data?.data || []);
    } catch (e) {
      console.error('Fetch customers failed', e);
    } finally {
      setLoading(false);
    }
  };

  // Derived data: filter by search term
  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return customers;
    return customers.filter(c => (
      (c.name || '').toLowerCase().includes(term) ||
      (c.website_url || '').toLowerCase().includes(term)
    ));
  }, [customers, searchTerm]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  return (
    <div className='flex h-screen bg-gradient-to-br from-green-50 via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800'>
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-green-600 via-blue-600 to-blue-700 dark:from-green-900 dark:via-blue-900 dark:to-blue-950 text-white transition-all duration-300 flex flex-col shadow-2xl animate-admin-slide-in-left`}>
        <div className='p-4 flex items-center justify-between border-b border-white/20'>
          {sidebarOpen && <h1 className='text-xl font-bold'>{t('admin.stlAdmin')}</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className='p-2 rounded hover:bg-white/20 transition-colors'>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <nav className='flex-1 p-4 space-y-2'>
          <Link to='/admin/dashboard' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors shadow-md'>
            <FaHome size={20} />{sidebarOpen && <span>{t('admin.dashboard')}</span>}
          </Link>
          <Link to='/admin/contacts' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaEnvelope size={20} />{sidebarOpen && <span>{t('admin.contacts')}</span>}
          </Link>
          <Link to='/admin/users' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaUsers size={20} />{sidebarOpen && <span>{t('admin.users')}</span>}
          </Link>
          <Link to='/admin/blogs' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaBlog size={20} />{sidebarOpen && <span>{t('admin.blogs')}</span>}
          </Link>
          <Link to='/admin/projects' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaProjectDiagram size={20} />{sidebarOpen && <span>{t('admin.projects')}</span>}
          </Link>
          <Link to='/admin/products' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaShoppingCart size={20} />{sidebarOpen && <span>{t('admin.products')}</span>}
          </Link>
          <Link to='/admin/solutions' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaCogs size={20} />{sidebarOpen && <span>{t('admin.solutions')}</span>}
          </Link>
          <Link to='/admin/policies' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaFileAlt size={20} />{sidebarOpen && <span>{t('admin.policies')}</span>}
          </Link>
          <Link to='/admin/customers' className='flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'>
            <FaHandshake size={20} />{sidebarOpen && <span>{t('admin.customers')}</span>}
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
            <FaSignOutAlt size={20} />{sidebarOpen && <span>{t('admin.logout')}</span>}
          </button>
        </div>
      </aside>

      <div className='flex-1 flex flex-col overflow-hidden'>
        <header className='bg-white dark:bg-gray-800 shadow-sm p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>{t('admin.customers')}</h2>
            <div className='flex items-center gap-4'>
              <button onClick={() => setShowCreate(true)} className='flex items-center gap-2 px-4 py-2 bg-PrimaryColor-0 dark:bg-green-600 text-white rounded-md'>
                <FaPlus /> {t('admin.createNewCustomer')}
              </button>
              <button onClick={toggleLanguage} className='px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white'>🌐</button>
              <button onClick={toggleAdminTheme} className='px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white' title={adminTheme === 'dark' ? 'Light mode' : 'Dark mode'}>
                {adminTheme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </header>

        <main className='flex-1 p-6 overflow-auto'>
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'>
            {/* Toolbar */}
            <div className='p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700'>
              <div className='relative w-full md:w-1/2'>
                <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400' />
                <input
                  type='text'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('admin.searchPlaceholder') || 'Tìm kiếm theo tên hoặc website'}
                  className='w-full pl-10 pr-3 py-2 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white outline-none border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition'
                />
              </div>
              <button
                onClick={fetchCustomers}
                className='ml-4 px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400 transition flex items-center gap-2'
                title='Refresh'
              >
                <FaSync />
                <span>Refresh</span>
              </button>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                <thead className='bg-gray-50 dark:bg-gray-800 sticky top-0 z-10 shadow-sm'>
                  <tr>
                    <th className='p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200'>{t('admin.logo')}</th>
                    <th className='p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200'>{t('admin.name')}</th>
                    <th className='p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200'>{t('admin.website')}</th>
                    <th className='p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200'>{t('admin.order')}</th>
                    <th className='p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200'>{t('admin.action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td className='p-4 text-center text-gray-800 dark:text-white' colSpan={5}>{t('admin.loading')}</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td className='p-4 text-center text-gray-800 dark:text-white' colSpan={5}>{t('admin.noData')}</td></tr>
                  ) : (
                    filtered.map((c) => (
                      <tr key={c._id} className='odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
                        <td className='p-3'>
                          {c.logo ? (
                            <img src={c.logo} alt={c.name} className='h-10 w-10 object-contain rounded border border-gray-200 dark:border-gray-600' />
                          ) : (
                            <div className='h-10 w-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded text-gray-500'>N/A</div>
                          )}
                        </td>
                        <td className='p-3 text-gray-800 dark:text-gray-200'>{c.name || '-'}</td>
                        <td className='p-3'>
                          {c.website_url ? (
                            <a href={c.website_url} target='_blank' rel='noreferrer' className='text-blue-600 dark:text-blue-400 hover:underline'>{c.website_url}</a>
                          ) : (
                            <span className='text-gray-500'>-</span>
                          )}
                        </td>
                        <td className='p-3 text-gray-800 dark:text-gray-200'>{typeof c.display_order !== 'undefined' ? c.display_order : '-'}</td>
                        <td className='p-3'>
                          <div className='flex items-center gap-2'>
                            <button
                              onClick={() => {
                                setEditCustomer({ id: c._id, name: c.name || '', logo: c.logo || '', website_url: c.website_url || '', display_order: c.display_order || 0 });
                                setShowEdit(true);
                              }}
                              className='px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2 text-xs'
                            >
                              <FaEdit /> {t('admin.edit')}
                            </button>
                            <button
                              onClick={async () => {
                                if (!window.confirm(t('admin.deleteConfirm'))) return;
                                try {
                                  await deleteAdminCustomer(c._id);
                                  await fetchCustomers();
                                  try { socket.emit('customers.changed', { type: 'deleted', id: c._id }); } catch {}
                                } catch (e) {
                                  console.error('Delete customer failed', e);
                                  alert('Xóa thất bại');
                                }
                              }}
                              className='px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded flex items-center gap-2 text-xs'
                            >
                              <FaTrash /> {t('admin.delete')}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Create Modal */}
          {showCreate && (
            <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
              <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6'>
                <h3 className='text-xl font-semibold mb-4 text-gray-800 dark:text-white'>{t('admin.customersCreateTitle')}</h3>
                <div className='space-y-3'>
                  <input value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} placeholder={t('admin.customerNamePlaceholder')} className='w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white' />
                  <input value={newCustomer.logo} onChange={(e) => setNewCustomer({ ...newCustomer, logo: e.target.value })} placeholder={t('admin.logoUrlPlaceholder')} className='w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white' />
                  <input value={newCustomer.website_url} onChange={(e) => setNewCustomer({ ...newCustomer, website_url: e.target.value })} placeholder={t('admin.websiteUrlPlaceholder')} className='w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white' />
                  <input type='number' value={newCustomer.display_order} onChange={(e) => setNewCustomer({ ...newCustomer, display_order: Number(e.target.value) })} placeholder={t('admin.displayOrderPlaceholder')} className='w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white' />
                </div>
                <div className='mt-4 flex justify-end gap-2'>
                  <button onClick={() => setShowCreate(false)} className='px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'>{t('admin.cancel')}</button>
                  <button
                    onClick={async () => {
                      try {
                        const payload = { ...newCustomer };
                        const res = await createAdminCustomer(payload);
                        setShowCreate(false);
                        setNewCustomer({ name: '', logo: '', website_url: '', display_order: 0 });
                        await fetchCustomers();
                        try { socket.emit('customers.changed', { type: 'created', data: res?.data?.data }); } catch {}
                      } catch (e) {
                        console.error('Create customer failed', e);
                        alert('Tạo thất bại');
                      }
                    }}
                    className='px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white'
                  >
                    {t('admin.save')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {showEdit && (
            <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
              <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6'>
                <h3 className='text-xl font-semibold mb-4 text-gray-800 dark:text-white'>{t('admin.customersEditTitle')}</h3>
                <div className='space-y-3'>
                  <input value={editCustomer.name} onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })} placeholder={t('admin.customerNamePlaceholder')} className='w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white' />
                  <input value={editCustomer.logo} onChange={(e) => setEditCustomer({ ...editCustomer, logo: e.target.value })} placeholder={t('admin.logoUrlPlaceholder')} className='w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white' />
                  <input value={editCustomer.website_url} onChange={(e) => setEditCustomer({ ...editCustomer, website_url: e.target.value })} placeholder={t('admin.websiteUrlPlaceholder')} className='w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white' />
                  <input type='number' value={editCustomer.display_order} onChange={(e) => setEditCustomer({ ...editCustomer, display_order: Number(e.target.value) })} placeholder={t('admin.displayOrderPlaceholder')} className='w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white' />
                </div>
                <div className='mt-4 flex justify-end gap-2'>
                  <button onClick={() => setShowEdit(false)} className='px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'>{t('admin.cancel')}</button>
                  <button
                    onClick={async () => {
                      try {
                        const payload = { name: editCustomer.name, logo: editCustomer.logo, website_url: editCustomer.website_url, display_order: editCustomer.display_order };
                        const res = await updateAdminCustomer(editCustomer.id, payload);
                        setShowEdit(false);
                        setEditCustomer({ id: null, name: '', logo: '', website_url: '', display_order: 0 });
                        await fetchCustomers();
                        try { socket.emit('customers.changed', { type: 'updated', data: res?.data?.data }); } catch {}
                      } catch (e) {
                        console.error('Update customer failed', e);
                        alert('Cập nhật thất bại');
                      }
                    }}
                    className='px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white'
                  >
                    {t('admin.save')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminCustomers;