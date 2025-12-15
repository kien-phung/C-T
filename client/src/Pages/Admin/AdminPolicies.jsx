import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaEnvelope, FaUsers, FaBlog, FaProjectDiagram, FaShoppingCart, FaCogs, FaFileAlt, FaHandshake, FaSignOutAlt, FaBars, FaTimes, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import { useAdminTheme } from '../../contexts/AdminThemeContext';
import { socket } from '../../api/socket';
import { getAdminPolicies, createAdminPolicy, updateAdminPolicy, deleteAdminPolicy } from '../../api/api';

const AdminPolicies = () => {
  const navigate = useNavigate();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const { adminTheme, toggleAdminTheme } = useAdminTheme();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newPolicy, setNewPolicy] = useState({
    title_vn: '',
    title_en: '',
    slug: '',
    description_vn: '',
    description_en: '',
    points_vn: '',
    points_en: '',
    display_order: 0,
    status: 'published'
  });
  const [showEdit, setShowEdit] = useState(false);
  const [editPolicy, setEditPolicy] = useState({
    id: null,
    title_vn: '',
    title_en: '',
    slug: '',
    description_vn: '',
    description_en: '',
    points_vn: '',
    points_en: '',
    display_order: 0,
    status: 'published'
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');
    if (!token) { navigate('/admin/login'); return; }
    setAdminEmail(email || 'Admin');
    fetchPolicies();
  }, [navigate]);

  // Realtime updates
  useEffect(() => {
    const onChange = (payload) => {
      if (!payload) return;
      if (payload.type === 'created' && payload.data) {
        setPolicies(prev => [payload.data, ...prev]);
      } else if (payload.type === 'updated' && payload.data) {
        const id = payload.data._id || payload.data.id;
        setPolicies(prev => prev.map(p => (p._id === id ? { ...p, ...payload.data } : p)));
      } else if (payload.type === 'deleted') {
        const id = payload.id;
        setPolicies(prev => prev.filter(p => p._id !== id));
      }
    };
    socket.on('policies.changed', onChange);
    return () => socket.off('policies.changed', onChange);
  }, []);

  const fetchPolicies = async () => {
    try {
      const res = await getAdminPolicies({ search: searchTerm });
      setPolicies(res?.data?.data || []);
    } catch (e) { console.error('Fetch policies failed', e); }
    finally { setLoading(false); }
  };

  const resolveName = (p) => {
    return currentLanguage === 'EN'
      ? (p?.title_en || p?.title_vn || '')
      : (p?.title_vn || p?.title_en || '');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const filtered = policies.filter(p => (
    resolveName(p).toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.slug || '').toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const submitNewPolicy = (e) => {
    e.preventDefault();
    const payload = {
      title_vn: newPolicy.title_vn,
      title_en: newPolicy.title_en,
      slug: newPolicy.slug,
      description_vn: newPolicy.description_vn,
      description_en: newPolicy.description_en,
      points_vn: newPolicy.points_vn,
      points_en: newPolicy.points_en,
      display_order: Number(newPolicy.display_order) || 0,
      is_published: newPolicy.status === 'published',
    };
    createAdminPolicy(payload).then(res => {
      const item = res.data.data;
      setPolicies([item, ...policies]);
      try { socket.emit('policies.changed', { type: 'created', data: item }); } catch {}
    });
    setShowCreate(false);
    setNewPolicy({ title_vn: '', title_en: '', slug: '', description_vn: '', description_en: '', points_vn: '', points_en: '', display_order: 0, status: 'published' });
  };

  const startEdit = (p) => {
    setEditPolicy({
      id: p._id,
      title_vn: p.title_vn || '',
      title_en: p.title_en || '',
      slug: p.slug || '',
      description_vn: p.description_vn || '',
      description_en: p.description_en || '',
      points_vn: (p.points_vn || []).join('\n'),
      points_en: (p.points_en || []).join('\n'),
      display_order: p.display_order || 0,
      status: p.is_published ? 'published' : 'draft'
    });
    setShowEdit(true);
  };

  const submitEditPolicy = (e) => {
    e.preventDefault();
    if (!editPolicy.id) return;
    const payload = {
      title_vn: editPolicy.title_vn,
      title_en: editPolicy.title_en,
      slug: editPolicy.slug,
      description_vn: editPolicy.description_vn,
      description_en: editPolicy.description_en,
      points_vn: editPolicy.points_vn,
      points_en: editPolicy.points_en,
      display_order: Number(editPolicy.display_order) || 0,
      is_published: editPolicy.status === 'published',
    };
    updateAdminPolicy(editPolicy.id, payload).then(res => {
      const updated = res.data.data;
      setPolicies(policies.map(p => (p._id === editPolicy.id ? { ...p, ...updated } : p)));
      setShowEdit(false);
      try { socket.emit('policies.changed', { type: 'updated', data: updated }); } catch {}
    });
  };

  const deletePolicy = (id) => {
    deleteAdminPolicy(id).then(() => {
      setPolicies(policies.filter(p => p._id !== id));
      try { socket.emit('policies.changed', { type: 'deleted', id }); } catch {}
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => { fetchPolicies(); }, 5000);
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
          <Link to='/admin/solutions' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaCogs size={20} />{sidebarOpen && <span>{t('admin.solutions')}</span>}
          </Link>
          <Link to='/admin/policies' className='flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'>
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
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>{t('admin.policies')}</h2>
            <div className='flex items-center gap-4'>
              <button onClick={()=>setShowCreate(true)} className='px-4 py-2 bg-PrimaryColor-0 dark:bg-green-600 text-white rounded-md'>{t('admin.createNewPolicy')}</button>
              <button onClick={toggleLanguage} className='px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white'>🌐</button>
              <button onClick={toggleAdminTheme} className='px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white' title={adminTheme === 'dark' ? 'Light mode' : 'Dark mode'}>
                {adminTheme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </header>

        <main className='flex-1 p-6 overflow-auto'>
          <form onSubmit={(e)=>{e.preventDefault(); setLoading(true); fetchPolicies();}} className='mb-4 flex gap-3 items-center'>
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
                  <th className='p-3'>Thứ tự</th>
                  <th className='p-3'>{t('admin.status')}</th>
                  <th className='p-3'>{t('admin.action')}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td className='p-4 text-center text-gray-800 dark:text-white' colSpan={6}>Loading...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td className='p-4 text-center text-gray-800 dark:text-white' colSpan={6}>Không có dữ liệu</td></tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p._id} className='odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 border-t border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
                      <td className='p-3 text-sm text-gray-600 dark:text-gray-300'>{p._id}</td>
                      <td className='p-3 font-medium'>{resolveName(p)}</td>
                      <td className='p-3'>{p.slug}</td>
                      <td className='p-3'>{p.display_order || 0}</td>
                      <td className='p-3'>
                        <span className={`px-2 py-1 rounded text-xs ${p.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {p.is_published ? t('admin.published') : t('admin.draft')}
                        </span>
                      </td>
                      <td className='p-3'>
                        <div className='flex gap-2'>
                          <button onClick={()=>startEdit(p)} className='px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 text-sm'>
                            <FaEdit /> {t('admin.edit')}
                          </button>
                          <button onClick={()=>deletePolicy(p._id)} className='px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-2 text-sm'>
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
            <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
              <div className='bg-white dark:bg-gray-800 rounded-lg p-6 w-[800px]'>
                <h3 className='text-xl font-semibold mb-4 dark:text-white'>Tạo chính sách</h3>
                <form onSubmit={submitNewPolicy} className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Tiêu đề (VN)</label>
                      <input value={newPolicy.title_vn} onChange={e=>setNewPolicy({...newPolicy, title_vn: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'/>
                    </div>
                    <div>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Title (EN)</label>
                      <input value={newPolicy.title_en} onChange={e=>setNewPolicy({...newPolicy, title_en: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'/>
                    </div>
                    <div>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Slug</label>
                      <input value={newPolicy.slug} onChange={e=>setNewPolicy({...newPolicy, slug: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'/>
                    </div>
                    <div>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Thứ tự hiển thị</label>
                      <input type='number' value={newPolicy.display_order} onChange={e=>setNewPolicy({...newPolicy, display_order: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'/>
                    </div>
                    <div className='col-span-2 md:col-span-1'>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Mô tả (VN)</label>
                      <textarea value={newPolicy.description_vn} onChange={e=>setNewPolicy({...newPolicy, description_vn: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' rows={3}/>
                    </div>
                    <div className='col-span-2 md:col-span-1'>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Description (EN)</label>
                      <textarea value={newPolicy.description_en} onChange={e=>setNewPolicy({...newPolicy, description_en: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' rows={3}/>
                    </div>
                    <div className='col-span-2 md:col-span-1'>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Điểm nổi bật (VN) - mỗi dòng một điểm</label>
                      <textarea value={newPolicy.points_vn} onChange={e=>setNewPolicy({...newPolicy, points_vn: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' rows={4}/>
                    </div>
                    <div className='col-span-2 md:col-span-1'>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Highlights (EN) - one line per item</label>
                      <textarea value={newPolicy.points_en} onChange={e=>setNewPolicy({...newPolicy, points_en: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' rows={4}/>
                    </div>
                    <div className='col-span-2'>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Trạng thái</label>
                      <select value={newPolicy.status} onChange={e=>setNewPolicy({...newPolicy, status: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'>
                        <option value='published'>Published</option>
                        <option value='draft'>Draft</option>
                      </select>
                    </div>
                  </div>
                  <div className='flex justify-end gap-2 mt-4'>
                    <button type='button' onClick={()=>setShowCreate(false)} className='px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded-md'>Hủy</button>
                    <button className='px-4 py-2 bg-PrimaryColor-0 dark:bg-green-600 text-white rounded-md'>Tạo</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {showEdit && (
            <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
              <div className='bg-white dark:bg-gray-800 rounded-lg p-6 w-[800px]'>
                <h3 className='text-xl font-semibold mb-4 dark:text-white'>Sửa chính sách</h3>
                <form onSubmit={submitEditPolicy} className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Tiêu đề (VN)</label>
                      <input value={editPolicy.title_vn} onChange={e=>setEditPolicy({...editPolicy, title_vn: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'/>
                    </div>
                    <div>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Title (EN)</label>
                      <input value={editPolicy.title_en} onChange={e=>setEditPolicy({...editPolicy, title_en: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'/>
                    </div>
                    <div>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Slug</label>
                      <input value={editPolicy.slug} onChange={e=>setEditPolicy({...editPolicy, slug: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'/>
                    </div>
                    <div>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Thứ tự hiển thị</label>
                      <input type='number' value={editPolicy.display_order} onChange={e=>setEditPolicy({...editPolicy, display_order: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'/>
                    </div>
                    <div className='col-span-2 md:col-span-1'>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Mô tả (VN)</label>
                      <textarea value={editPolicy.description_vn} onChange={e=>setEditPolicy({...editPolicy, description_vn: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' rows={3}/>
                    </div>
                    <div className='col-span-2 md:col-span-1'>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Description (EN)</label>
                      <textarea value={editPolicy.description_en} onChange={e=>setEditPolicy({...editPolicy, description_en: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' rows={3}/>
                    </div>
                    <div className='col-span-2 md:col-span-1'>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Điểm nổi bật (VN) - mỗi dòng một điểm</label>
                      <textarea value={editPolicy.points_vn} onChange={e=>setEditPolicy({...editPolicy, points_vn: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' rows={4}/>
                    </div>
                    <div className='col-span-2 md:col-span-1'>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Highlights (EN) - one line per item</label>
                      <textarea value={editPolicy.points_en} onChange={e=>setEditPolicy({...editPolicy, points_en: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' rows={4}/>
                    </div>
                    <div className='col-span-2'>
                      <label className='block mb-1 font-medium text-HeadingColor-0 dark:text-white'>Trạng thái</label>
                      <select value={editPolicy.status} onChange={e=>setEditPolicy({...editPolicy, status: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'>
                        <option value='published'>Published</option>
                        <option value='draft'>Draft</option>
                      </select>
                    </div>
                  </div>
                  <div className='flex justify-end gap-2 mt-4'>
                    <button type='button' onClick={()=>setShowEdit(false)} className='px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded-md'>Đóng</button>
                    <button className='px-4 py-2 bg-PrimaryColor-0 dark:bg-green-600 text-white rounded-md'>Lưu</button>
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

export default AdminPolicies;