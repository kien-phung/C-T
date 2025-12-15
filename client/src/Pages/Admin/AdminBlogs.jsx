import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaEnvelope, FaUsers, FaBlog, FaProjectDiagram, FaShoppingCart, FaCogs, FaFileAlt, FaHandshake, FaSignOutAlt, FaBars, FaTimes, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { socket } from '../../api/socket';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import { useAdminTheme } from '../../contexts/AdminThemeContext';
import { getAdminBlogs, createAdminBlog, updateAdminBlog, deleteAdminBlog } from '../../api/api';

const AdminBlogs = () => {
  const navigate = useNavigate();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const { adminTheme, toggleAdminTheme } = useAdminTheme();

  // Helper: format today as YYYY-MM-DD (local time)
  const getTodayString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title_vn: '',
    title_en: '',
    description_vn: '',
    description_en: '',
    category_vn: '',
    category_en: '',
    thumbnail: '',
    is_external: false,
    external_url: '',
    published_date: '',
    status: 'draft',
  });
  const [showEdit, setShowEdit] = useState(false);
  const [editBlog, setEditBlog] = useState({
    id: null,
    title_vn: '',
    title_en: '',
    description_vn: '',
    description_en: '',
    category_vn: '',
    category_en: '',
    thumbnail: '',
    is_external: false,
    external_url: '',
    published_date: '',
    status: 'draft',
  });

  const readFileAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');
    if (!token) { navigate('/admin/login'); return; }
    setAdminEmail(email || 'Admin');
    fetchBlogs();
  }, [navigate]);

  // Realtime updates via Socket.IO
  useEffect(() => {
    const onChange = (payload) => {
      if (!payload) return;
      if (payload.type === 'created' && payload.data) {
        setBlogs(prev => [payload.data, ...prev]);
      } else if (payload.type === 'updated' && payload.data) {
        const id = payload.data._id || payload.data.id;
        setBlogs(prev => prev.map(b => (b._id === id ? { ...b, ...payload.data } : b)));
      } else if (payload.type === 'deleted') {
        const id = payload.id;
        setBlogs(prev => prev.filter(b => b._id !== id));
      }
    };
    socket.on('blogs.changed', onChange);
    return () => {
      socket.off('blogs.changed', onChange);
    };
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await getAdminBlogs({ search: searchTerm });
      setBlogs(res.data.data || []);
    } catch (e) {
      console.error('Fetch blogs failed', e);
    } finally { setLoading(false); }
  };

  // Build and sanitize payload for create/update blog
  const sanitizePayload = (obj) => {
    const copy = { ...obj };
    Object.keys(copy).forEach((k) => {
      if (copy[k] === '' || copy[k] === undefined || copy[k] === null) {
        delete copy[k];
      }
    });
    return copy;
  };

  const buildBlogPayload = (state) => {
    const isExternalOrData = (v = '') => /^https?:\/\//i.test(v) || /^data:image\//i.test(v);
    const normalizeAssetPath = (v = '') => {
      if (!v) return v;
      if (isExternalOrData(v)) return v;
      const cleaned = v.replace(/^\.\/+/, '').replace(/^public\/+/i, '');
      return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
    };
    const payload = {
      title_vn: state.title_vn,
      title_en: state.title_en,
      description_vn: state.description_vn,
      description_en: state.description_en,
      category_vn: state.category_vn,
      category_en: state.category_en,
      thumbnail: normalizeAssetPath(state.thumbnail),
      is_external: Boolean(state.is_external),
      external_url: state.is_external ? state.external_url : undefined,
      published_date: state.status === 'published' ? (state.published_date || getTodayString()) : undefined,
      is_published: state.status === 'published',
    };
    return sanitizePayload(payload);
  };

  // Toggle publish/unpublish for a blog item
  const togglePublish = async (blogItem) => {
    try {
      const willPublish = !blogItem.is_published;
      const payload = {
        is_published: willPublish,
        // If publishing and no date set, default to today (YYYY-MM-DD)
        published_date: willPublish ? (blogItem.published_date ? new Date(blogItem.published_date).toISOString().slice(0,10) : getTodayString()) : undefined,
      };
      const res = await updateAdminBlog(blogItem._id, payload);
      const updated = res.data.data;
      setBlogs(blogs.map(b => (b._id === blogItem._id ? { ...b, ...updated } : b)));
    } catch (e) {
      console.error('Toggle publish failed', e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const filtered = blogs.filter(b => (
    ((b.title_vn || b.title_en || '').toLowerCase().includes(searchTerm.toLowerCase())) ||
    ((b.category_vn || b.category_en || '').toLowerCase().includes(searchTerm.toLowerCase()))
  ));

  const submitNewBlog = (e) => {
    e.preventDefault();
    if (!newBlog.title_vn.trim() && !newBlog.title_en.trim()) return;
    const payload = buildBlogPayload(newBlog);
    createAdminBlog(payload).then(res => {
      const item = res.data.data;
      setBlogs([item, ...blogs]);
    });
    setShowCreate(false);
    setNewBlog({ title_vn: '', title_en: '', description_vn: '', description_en: '', category_vn: '', category_en: '', thumbnail: '', is_external: false, external_url: '', published_date: '', status: 'draft' });
  };

  const startEdit = (b) => {
    setEditBlog({
      id: b._id,
      title_vn: b.title_vn || '',
      title_en: b.title_en || '',
      description_vn: b.description_vn || '',
      description_en: b.description_en || '',
      category_vn: b.category_vn || '',
      category_en: b.category_en || '',
      thumbnail: b.thumbnail || '',
      is_external: Boolean(b.is_external),
      external_url: b.external_url || '',
      published_date: b.published_date ? new Date(b.published_date).toISOString().slice(0,10) : '',
      status: b.is_published ? 'published' : 'draft',
    });
    setShowEdit(true);
  };

  const submitEditBlog = (e) => {
    e.preventDefault();
    if (!editBlog.id) return;
    const payload = buildBlogPayload(editBlog);
    updateAdminBlog(editBlog.id, payload).then(res => {
      const updated = res.data.data;
      setBlogs(blogs.map(b => (b._id === editBlog.id ? { ...b, ...updated } : b)));
      setShowEdit(false);
    });
  };

  const deleteBlog = (id) => {
    deleteAdminBlog(id).then(() => setBlogs(blogs.filter(b => b._id !== id)));
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
          <Link to='/admin/dashboard' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 bg-white/30 transition-colors shadow-md'>
            <FaHome size={20} />{sidebarOpen && <span>{t('admin.dashboard')}</span>}
          </Link>
          <Link to='/admin/contacts' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaEnvelope size={20} />{sidebarOpen && <span>{t('admin.contacts')}</span>}
          </Link>
          <Link to='/admin/users' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaUsers size={20} />{sidebarOpen && <span>{t('admin.users')}</span>}
          </Link>
          <Link to='/admin/blogs' className='flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'>
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
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>{t('admin.blogs')}</h2>
            <div className='flex items-center gap-4'>
              <button onClick={()=>setShowCreate(true)} className='px-4 py-2 bg-PrimaryColor-0 dark:bg-green-600 text-white rounded-md'>{t('admin.writeNewBlog')}</button>
              <button onClick={toggleLanguage} className='px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white'>🌐</button>
              <button onClick={toggleAdminTheme} className='px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white' title={adminTheme === 'dark' ? 'Light mode' : 'Dark mode'}>
                {adminTheme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </header>

        <main className='flex-1 p-6 overflow-auto'>
          <form onSubmit={(e)=>{e.preventDefault(); setLoading(true); fetchBlogs();}} className='mb-4 flex gap-3 items-center'>
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
                  <th className='p-3'>{t('admin.title')}</th>
                  <th className='p-3'>{t('admin.author')}</th>
                  <th className='p-3'>{t('admin.date')}</th>
                  <th className='p-3'>{t('admin.status')}</th>
                  <th className='p-3'>{t('admin.action')}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className='p-6 text-center'>{t('admin.loading')}</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={5} className='p-6 text-center'>{t('admin.noData')}</td></tr>
                ) : (
                  filtered.map(b => (
                    <tr key={b._id} className='odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 border-t border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
                      <td className='p-3'>{b._id}</td>
                      <td className='p-3'>{currentLanguage === 'VN' ? (b.title_vn || b.title_en || '(no title)') : (b.title_en || b.title_vn || '(no title)')}</td>
                      <td className='p-3'>{currentLanguage === 'VN' ? (b.category_vn || b.category_en || '—') : (b.category_en || b.category_vn || '—')}</td>
                      <td className='p-3'>
                        {new Date(b.published_date || b.createdAt).toLocaleDateString(
                          currentLanguage === 'VN' ? 'vi-VN' : 'en-US',
                          { year: 'numeric', month: '2-digit', day: '2-digit' }
                        )}
                      </td>
                      <td className='p-3'><span className={`px-2 py-1 rounded text-xs ${(b.is_published ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300')}`}>{b.is_published ? t('admin.published') : t('admin.draft')}</span></td>
                      <td className='p-3'>
                        <div className='flex gap-2'>
                          <button onClick={()=>togglePublish(b)} className={`px-3 py-1 rounded text-white text-xs ${b.is_published ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'} transition`}>
                            {b.is_published ? t('admin.unpublish') : t('admin.publish')}
                          </button>
                          <button onClick={()=>startEdit(b)} className='px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs flex items-center gap-2'>
                            <FaEdit /> {t('admin.edit')}
                          </button>
                          <button onClick={()=>deleteBlog(b._id)} className='px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs flex items-center gap-2'>
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

          {showCreate && (
            <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
              <form onSubmit={submitNewBlog} className='bg-white dark:bg-gray-800 p-6 rounded-lg w-[840px]'>
                <h3 className='text-lg font-semibold mb-4'>{t('admin.writeNewBlog')}</h3>
                <div className='grid grid-cols-2 gap-3'>
                  <input value={newBlog.title_vn} onChange={(e)=>setNewBlog({...newBlog, title_vn: e.target.value})} placeholder='Tiêu đề (VN)' className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                  <input value={newBlog.title_en} onChange={(e)=>setNewBlog({...newBlog, title_en: e.target.value})} placeholder='Title (EN)' className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                  <textarea value={newBlog.description_vn} onChange={(e)=>setNewBlog({...newBlog, description_vn: e.target.value})} placeholder='Mô tả (VN)' className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' rows={4} />
                  <textarea value={newBlog.description_en} onChange={(e)=>setNewBlog({...newBlog, description_en: e.target.value})} placeholder='Description (EN)' className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' rows={4} />
                  <input value={newBlog.category_vn} onChange={(e)=>setNewBlog({...newBlog, category_vn: e.target.value})} placeholder='Danh mục (VN)' className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                  <input value={newBlog.category_en} onChange={(e)=>setNewBlog({...newBlog, category_en: e.target.value})} placeholder='Category (EN)' className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                  <div className='col-span-2 flex items-center gap-2'>
                    <input type='checkbox' id='is_external_new' checked={newBlog.is_external} onChange={(e)=>setNewBlog({...newBlog, is_external: e.target.checked})} />
                    <label htmlFor='is_external_new' className='text-sm dark:text-white'>Liên kết ngoài</label>
                  </div>
                  {newBlog.is_external && (
                    <input type='url' value={newBlog.external_url} onChange={(e)=>setNewBlog({...newBlog, external_url: e.target.value})} placeholder='URL ngoài (https://...)' className='col-span-2 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                  )}
                  <input type='date' value={newBlog.published_date} onChange={(e)=>setNewBlog({...newBlog, published_date: e.target.value})} placeholder='Ngày xuất bản' className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                <select
                  value={newBlog.status}
                  onChange={(e)=>{
                    const status = e.target.value;
                    setNewBlog({
                      ...newBlog,
                      status,
                      published_date: status === 'published' ? (newBlog.published_date || getTodayString()) : newBlog.published_date
                    });
                  }}
                  className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'
                >
                  <option value='draft'>{t('admin.draft')}</option>
                  <option value='published'>{t('admin.published')}</option>
                </select>
                  <input
                    type='text'
                    value={newBlog.thumbnail}
                    onChange={(e)=>{
                      const val = e.target.value;
                      const isExternal = /^https?:\/\//i.test(val) || /^data:image\//i.test(val);
                      const normalized = isExternal ? val : (val ? (val.startsWith('/') ? val : `/${val.replace(/^public\/+/i,'')}`) : val);
                      setNewBlog({...newBlog, thumbnail: normalized});
                    }}
                    onPaste={async (e)=>{
                      const items = e.clipboardData?.items || [];
                      const imageItem = Array.from(items).find(i=>i.type.startsWith('image/'));
                      if (imageItem) {
                        e.preventDefault();
                        const file = imageItem.getAsFile();
                        if (file) {
                          const dataUrl = await readFileAsDataURL(file);
                          setNewBlog({...newBlog, thumbnail: dataUrl});
                        }
                      }
                    }}
                    placeholder='URL/đường dẫn hoặc dán ảnh'
                    className='col-span-2 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'
                  />
                  <div className='col-span-2'>
                    <input
                      id='thumbnail_file_new'
                      type='file'
                      accept='image/*'
                      onChange={async (e)=>{
                        const file = e.target.files?.[0];
                        if (file) {
                          const dataUrl = await readFileAsDataURL(file);
                          setNewBlog({...newBlog, thumbnail: dataUrl});
                        }
                      }}
                      className='hidden'
                    />
                    <label
                      htmlFor='thumbnail_file_new'
                      className='inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white cursor-pointer'
                    >
                      Chọn ảnh từ máy
                    </label>
                  </div>
                  {newBlog.thumbnail && (
                    <img src={newBlog.thumbnail} alt='Thumbnail preview' className='col-span-2 w-full h-40 object-cover rounded-md border' />
                  )}
                  <div className='col-span-2 flex justify-end gap-3 pt-2'>
                    <button type='button' onClick={()=>setShowCreate(false)} className='px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white'>Cancel</button>
                    <button type='submit' className='px-4 py-2 rounded-md bg-PrimaryColor-0 dark:bg-green-600 text-white'>Save</button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {showEdit && (
            <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
              <form onSubmit={submitEditBlog} className='bg-white dark:bg-gray-800 p-6 rounded-lg w-[840px]'>
                <h3 className='text-lg font-semibold mb-4'>Sửa Bài Viết</h3>
                <div className='grid grid-cols-2 gap-3'>
                  <input value={editBlog.title_vn} onChange={(e)=>setEditBlog({...editBlog, title_vn: e.target.value})} placeholder='Tiêu đề (VN)' className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                  <input value={editBlog.title_en} onChange={(e)=>setEditBlog({...editBlog, title_en: e.target.value})} placeholder='Title (EN)' className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                  <textarea value={editBlog.description_vn} onChange={(e)=>setEditBlog({...editBlog, description_vn: e.target.value})} placeholder='Mô tả (VN)' className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' rows={4} />
                  <textarea value={editBlog.description_en} onChange={(e)=>setEditBlog({...editBlog, description_en: e.target.value})} placeholder='Description (EN)' className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' rows={4} />
                  <input value={editBlog.category_vn} onChange={(e)=>setEditBlog({...editBlog, category_vn: e.target.value})} placeholder='Danh mục (VN)' className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                  <input value={editBlog.category_en} onChange={(e)=>setEditBlog({...editBlog, category_en: e.target.value})} placeholder='Category (EN)' className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                  <div className='col-span-2 flex items-center gap-2'>
                    <input type='checkbox' id='is_external_edit' checked={editBlog.is_external} onChange={(e)=>setEditBlog({...editBlog, is_external: e.target.checked})} />
                    <label htmlFor='is_external_edit' className='text-sm dark:text-white'>Liên kết ngoài</label>
                  </div>
                  {editBlog.is_external && (
                    <input type='url' value={editBlog.external_url} onChange={(e)=>setEditBlog({...editBlog, external_url: e.target.value})} placeholder='URL ngoài (https://...)' className='col-span-2 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                  )}
                  <input type='date' value={editBlog.published_date} onChange={(e)=>setEditBlog({...editBlog, published_date: e.target.value})} placeholder='Ngày xuất bản' className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                <select
                  value={editBlog.status}
                  onChange={(e)=>{
                    const status = e.target.value;
                    setEditBlog({
                      ...editBlog,
                      status,
                      published_date: status === 'published' ? (editBlog.published_date || getTodayString()) : editBlog.published_date
                    });
                  }}
                  className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'
                >
                  <option value='draft'>{t('admin.draft')}</option>
                  <option value='published'>{t('admin.published')}</option>
                </select>
                  <input
                    type='text'
                    value={editBlog.thumbnail}
                    onChange={(e)=>{
                      const val = e.target.value;
                      const isExternal = /^https?:\/\//i.test(val) || /^data:image\//i.test(val);
                      const normalized = isExternal ? val : (val ? (val.startsWith('/') ? val : `/${val.replace(/^public\/+/i,'')}`) : val);
                      setEditBlog({...editBlog, thumbnail: normalized});
                    }}
                    onPaste={async (e)=>{
                      const items = e.clipboardData?.items || [];
                      const imageItem = Array.from(items).find(i=>i.type.startsWith('image/'));
                      if (imageItem) {
                        e.preventDefault();
                        const file = imageItem.getAsFile();
                        if (file) {
                          const dataUrl = await readFileAsDataURL(file);
                          setEditBlog({...editBlog, thumbnail: dataUrl});
                        }
                      }
                    }}
                    placeholder='URL/đường dẫn hoặc dán ảnh'
                    className='col-span-2 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'
                  />
                  <div className='col-span-2'>
                    <input
                      id='thumbnail_file_edit'
                      type='file'
                      accept='image/*'
                      onChange={async (e)=>{
                        const file = e.target.files?.[0];
                        if (file) {
                          const dataUrl = await readFileAsDataURL(file);
                          setEditBlog({...editBlog, thumbnail: dataUrl});
                        }
                      }}
                      className='hidden'
                    />
                    <label
                      htmlFor='thumbnail_file_edit'
                      className='inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white cursor-pointer'
                    >
                      Chọn ảnh từ máy
                    </label>
                  </div>
                  {editBlog.thumbnail && (
                    <img src={editBlog.thumbnail} alt='Thumbnail preview' className='col-span-2 w-full h-40 object-cover rounded-md border' />
                  )}
                  <div className='col-span-2 flex justify-end gap-3 pt-2'>
                    <button type='button' onClick={()=>setShowEdit(false)} className='px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white'>Cancel</button>
                    <button type='submit' className='px-4 py-2 rounded-md bg-PrimaryColor-0 dark:bg-green-600 text-white'>Save</button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminBlogs;
