import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaEnvelope, FaUsers, FaBlog, FaProjectDiagram, FaShoppingCart, FaCogs, FaFileAlt, FaHandshake, FaSignOutAlt, FaBars, FaTimes, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import { useAdminTheme } from '../../contexts/AdminThemeContext';
import { socket } from '../../api/socket';
import { getAdminSolutions, createAdminSolution, updateAdminSolution, deleteAdminSolution } from '../../api/api';

const AdminSolutions = () => {
  const navigate = useNavigate();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const { adminTheme, toggleAdminTheme } = useAdminTheme();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newSolution, setNewSolution] = useState({
    title_vn: '',
    title_en: '',
    slug: '',
    image: '',
    status: 'draft'
  });
  const [showEdit, setShowEdit] = useState(false);
  const [editSolution, setEditSolution] = useState({
    id: null,
    title_vn: '',
    title_en: '',
    slug: '',
    image: '',
    status: 'draft'
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');
    if (!token) { navigate('/admin/login'); return; }
    setAdminEmail(email || 'Admin');
    fetchSolutions();
  }, [navigate]);

  // Realtime updates via Socket.IO (future-proof if backend emits events)
  useEffect(() => {
    const onChange = (payload) => {
      if (!payload) return;
      if (payload.type === 'created' && payload.data) {
        setSolutions(prev => [payload.data, ...prev]);
      } else if (payload.type === 'updated' && payload.data) {
        const id = payload.data._id || payload.data.id;
        setSolutions(prev => prev.map(s => (s._id === id ? { ...s, ...payload.data } : s)));
      } else if (payload.type === 'deleted') {
        const id = payload.id;
        setSolutions(prev => prev.filter(s => s._id !== id));
      }
    };
    socket.on('solutions.changed', onChange);
    return () => {
      socket.off('solutions.changed', onChange);
    };
  }, []);

  const fetchSolutions = async () => {
    try {
      const res = await getAdminSolutions({ search: searchTerm });
      setSolutions(res?.data?.data || []);
    } catch (e) {
      console.error('Fetch solutions failed', e);
    } finally { setLoading(false); }
  };

  const resolveName = (s) => {
    return currentLanguage === 'EN'
      ? (s?.title_en || s?.title_vn || '')
      : (s?.title_vn || s?.title_en || '');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const filtered = solutions.filter(s => (
    resolveName(s).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.slug || '').toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const submitNewSolution = (e) => {
    e.preventDefault();
    if (!newSolution.title_vn.trim() && !newSolution.title_en.trim()) return;
    const payload = {
      title_vn: newSolution.title_vn,
      title_en: newSolution.title_en,
      slug: newSolution.slug,
      image: newSolution.image,
      is_published: newSolution.status === 'published',
    };
    createAdminSolution(payload).then(res => {
      const item = res.data.data;
      setSolutions([item, ...solutions]);
      // Emit realtime event for other clients (if server relays/accepts)
      try { socket.emit('solutions.changed', { type: 'created', data: item }); } catch (err) { /* noop */ }
    });
    setShowCreate(false);
    setNewSolution({ title_vn: '', title_en: '', slug: '', image: '', status: 'draft' });
  };

  const startEdit = (s) => {
    setEditSolution({
      id: s._id,
      title_vn: s.title_vn || '',
      title_en: s.title_en || '',
      slug: s.slug || '',
      image: s.image || '',
      status: s.is_published ? 'published' : 'draft'
    });
    setShowEdit(true);
  };

  const submitEditSolution = (e) => {
    e.preventDefault();
    if (!editSolution.id) return;
    const payload = {
      title_vn: editSolution.title_vn,
      title_en: editSolution.title_en,
      slug: editSolution.slug,
      image: editSolution.image,
      is_published: editSolution.status === 'published',
    };
    updateAdminSolution(editSolution.id, payload).then(res => {
      const updated = res.data.data;
      setSolutions(solutions.map(s => (s._id === editSolution.id ? { ...s, ...updated } : s)));
      setShowEdit(false);
      // Emit realtime event for other clients
      try { socket.emit('solutions.changed', { type: 'updated', data: updated }); } catch (err) { /* noop */ }
    });
  };

  const deleteSolution = (id) => {
    deleteAdminSolution(id).then(() => {
      setSolutions(solutions.filter(s => s._id !== id));
      // Emit realtime event for other clients
      try { socket.emit('solutions.changed', { type: 'deleted', id }); } catch (err) { /* noop */ }
    });
  };

  // Polling fallback: refresh solutions every 5s
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchSolutions();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

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
          <Link to='/admin/solutions' className='flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'>
            <FaCogs size={20} />{sidebarOpen && <span>{t('admin.solutions')}</span>}
          </Link>
          <Link to='/admin/policies' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaFileAlt size={20} />{sidebarOpen && <span>{t('admin.policies')}</span>}
          </Link>
          <Link to='/admin/customers' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
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
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>{t('admin.solutions')}</h2>
            <div className='flex items-center gap-4'>
              <button onClick={()=>setShowCreate(true)} className='px-4 py-2 bg-PrimaryColor-0 dark:bg-green-600 text-white rounded-md'>{t('admin.createNewSolution')}</button>
              <button onClick={toggleLanguage} className='px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white'>🌐</button>
              <button onClick={toggleAdminTheme} className='px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white' title={adminTheme === 'dark' ? 'Light mode' : 'Dark mode'}>
                {adminTheme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </header>

        <main className='flex-1 p-6 overflow-auto'>
          <form onSubmit={(e)=>{e.preventDefault(); setLoading(true); fetchSolutions();}} className='mb-4 flex gap-3 items-center'>
            <div className='relative'>
              <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400' />
              <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder={t('admin.search')} className='pl-10 pr-3 py-2 border rounded-md w-64 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 outline-none' />
            </div>
            <button className='px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-md shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400 transition'> {t('admin.search')} </button>
          </form>

          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'>
            <table className='min-w-full text-gray-800 dark:text-gray-100'>
              <thead className='bg-gray-100 dark:bg-gray-700 text-left sticky top-0 z-10 shadow-sm'>
                <tr>
                  <th className='p-3'>ID</th>
                  <th className='p-3'>Tiêu đề</th>
                  <th className='p-3'>Slug</th>
                  <th className='p-3'>Ảnh</th>
                  <th className='p-3'>{t('admin.status')}</th>
                  <th className='p-3'>{t('admin.action')}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td className='p-4 text-center' colSpan={6}>Loading...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td className='p-4 text-center' colSpan={6}>Không có dữ liệu</td></tr>
                ) : (
                  filtered.map((s) => (
                    <tr key={s._id} className='odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 border-t border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
                      <td className='p-3'>{s._id}</td>
                      <td className='p-3'>{resolveName(s)}</td>
                      <td className='p-3'>{s.slug}</td>
                      <td className='p-3'>
                        {s.image ? (
                          <img src={s.image} alt={resolveName(s)} className='w-16 h-16 object-cover rounded-md' />
                        ) : (
                          <span className='text-gray-400'>N/A</span>
                        )}
                      </td>
                      <td className='p-3'>
                        <span className={`px-2 py-1 rounded text-sm ${s.is_published ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}>
                          {s.is_published ? 'published' : 'draft'}
                        </span>
                      </td>
                      <td className='p-3'>
                        <div className='flex gap-2'>
                          <button onClick={()=>startEdit(s)} className='px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2 text-sm'>
                            <FaEdit /> {t('admin.edit')}
                          </button>
                          <button onClick={()=>deleteSolution(s._id)} className='px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded flex items-center gap-2 text-sm'>
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

          {/* Create Modal */}
          {showCreate && (
            <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl'>
                <h3 className='text-xl font-bold mb-4 text-HeadingColor-0 dark:text-white'>Tạo Giải Pháp</h3>
                <form onSubmit={submitNewSolution} className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block mb-1 text-sm text-HeadingColor-0 dark:text-white'>Tiêu đề (VN)</label>
                      <input value={newSolution.title_vn} onChange={(e)=>setNewSolution({...newSolution, title_vn: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                    </div>
                    <div>
                      <label className='block mb-1 text-sm text-HeadingColor-0 dark:text-white'>Title (EN)</label>
                      <input value={newSolution.title_en} onChange={(e)=>setNewSolution({...newSolution, title_en: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block mb-1 text-sm text-HeadingColor-0 dark:text-white'>Slug</label>
                      <input value={newSolution.slug} onChange={(e)=>setNewSolution({...newSolution, slug: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                    </div>
                    <div>
                      <label className='block mb-1 text-sm text-HeadingColor-0 dark:text-white'>Ảnh (URL)</label>
                      <input value={newSolution.image} onChange={(e)=>setNewSolution({...newSolution, image: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                    </div>
                  </div>
                  <div>
                    <label className='block mb-1 text-sm text-HeadingColor-0 dark:text-white'>{t('admin.status')}</label>
                    <select value={newSolution.status} onChange={(e)=>setNewSolution({...newSolution, status: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'>
                      <option value='draft'>draft</option>
                      <option value='published'>published</option>
                    </select>
                  </div>
                  <div className='flex justify-end gap-2'>
                    <button type='button' onClick={()=>setShowCreate(false)} className='px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded-md'>Hủy</button>
                    <button type='submit' className='px-4 py-2 bg-PrimaryColor-0 dark:bg-green-600 text-white rounded-md'>Tạo</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {showEdit && (
            <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl'>
                <h3 className='text-xl font-bold mb-4 text-HeadingColor-0 dark:text-white'>Sửa Giải Pháp</h3>
                <form onSubmit={submitEditSolution} className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block mb-1 text-sm text-HeadingColor-0 dark:text-white'>Tiêu đề (VN)</label>
                      <input value={editSolution.title_vn} onChange={(e)=>setEditSolution({...editSolution, title_vn: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                    </div>
                    <div>
                      <label className='block mb-1 text-sm text-HeadingColor-0 dark:text-white'>Title (EN)</label>
                      <input value={editSolution.title_en} onChange={(e)=>setEditSolution({...editSolution, title_en: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block mb-1 text-sm text-HeadingColor-0 dark:text-white'>Slug</label>
                      <input value={editSolution.slug} onChange={(e)=>setEditSolution({...editSolution, slug: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                    </div>
                    <div>
                      <label className='block mb-1 text-sm text-HeadingColor-0 dark:text-white'>Ảnh (URL)</label>
                      <input value={editSolution.image} onChange={(e)=>setEditSolution({...editSolution, image: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                    </div>
                  </div>
                  <div>
                    <label className='block mb-1 text-sm text-HeadingColor-0 dark:text-white'>{t('admin.status')}</label>
                    <select value={editSolution.status} onChange={(e)=>setEditSolution({...editSolution, status: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'>
                      <option value='draft'>draft</option>
                      <option value='published'>published</option>
                    </select>
                  </div>
                  <div className='flex justify-end gap-2'>
                    <button type='button' onClick={()=>setShowEdit(false)} className='px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded-md'>Hủy</button>
                    <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded-md'>Lưu</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminSolutions;