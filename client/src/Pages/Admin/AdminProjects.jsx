import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaEnvelope, FaUsers, FaBlog, FaProjectDiagram, FaShoppingCart, FaCogs, FaFileAlt, FaHandshake, FaSignOutAlt, FaBars, FaTimes, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import { useAdminTheme } from '../../contexts/AdminThemeContext';
import { socket } from '../../api/socket';
import { getAdminProjects, createAdminProject, updateAdminProject, deleteAdminProject } from '../../api/api';

const AdminProjects = () => {
  const navigate = useNavigate();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const { adminTheme, toggleAdminTheme } = useAdminTheme();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', owner: '', status: 'published' });
  const [showEdit, setShowEdit] = useState(false);
  const [editProject, setEditProject] = useState({ id: null, name: '', owner: '', status: 'published' });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');
    if (!token) { navigate('/admin/login'); return; }
    setAdminEmail(email || 'Admin');
    fetchProjects();
    // Real-time polling every 5 seconds to keep projects up-to-date
    const intervalId = setInterval(() => {
      fetchProjects();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [navigate]);

  // Realtime updates via Socket.IO
  useEffect(() => {
    const onChange = (payload) => {
      if (!payload) return;
      if (payload.type === 'created' && payload.data) {
        setProjects(prev => [payload.data, ...prev]);
      } else if (payload.type === 'updated' && payload.data) {
        const id = payload.data._id || payload.data.id;
        setProjects(prev => prev.map(p => (p._id === id ? { ...p, ...payload.data } : p)));
      } else if (payload.type === 'deleted') {
        const id = payload.id;
        setProjects(prev => prev.filter(p => p._id !== id));
      }
    };
    socket.on('projects.changed', onChange);
    return () => {
      socket.off('projects.changed', onChange);
    };
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await getAdminProjects({ search: searchTerm });
      setProjects(res.data.data || []);
    } catch (e) {
      console.error('Fetch projects failed', e);
    } finally { setLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const filtered = projects.filter(p => (
    ((p.title || '').toLowerCase().includes(searchTerm.toLowerCase())) ||
    ((p.client_name || '').toLowerCase().includes(searchTerm.toLowerCase()))
  ));

  const submitNewProject = (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;
    createAdminProject({
      title: newProject.name,
      client_name: newProject.owner,
      status: newProject.status,
    }).then(res => {
      const item = res.data.data;
      setProjects([item, ...projects]);
    });
    setShowCreate(false);
    setNewProject({ name: '', owner: '', status: 'published' });
  };

  const startEdit = (p) => {
    setEditProject({ id: p._id, name: p.title || '', owner: p.client_name || '', status: p.status || 'published' });
    setShowEdit(true);
  };

  const submitEditProject = (e) => {
    e.preventDefault();
    if (!editProject.id) return;
    updateAdminProject(editProject.id, {
      title: editProject.name,
      client_name: editProject.owner,
      status: editProject.status,
    }).then(res => {
      const updated = res.data.data;
      setProjects(projects.map(p => (p._id === editProject.id ? { ...p, ...updated } : p)));
      setShowEdit(false);
    });
  };

  const deleteProject = (id) => {
    deleteAdminProject(id).then(() => setProjects(projects.filter(p => p._id !== id)));
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
          <Link to='/admin/blogs' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaBlog size={20} />{sidebarOpen && <span>{t('admin.blogs')}</span>}
          </Link>
          <Link to='/admin/projects' className='flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'>
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
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>{t('admin.projects')}</h2>
            <div className='flex items-center gap-4'>
              <button onClick={()=>setShowCreate(true)} className='px-4 py-2 bg-PrimaryColor-0 dark:bg-green-600 text-white rounded-md'>{t('admin.createNewProject')}</button>
              <button onClick={toggleLanguage} className='px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white'>🌐</button>
              <button onClick={toggleAdminTheme} className='px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white' title={adminTheme === 'dark' ? 'Light mode' : 'Dark mode'}>
                {adminTheme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </header>

        <main className='flex-1 p-6 overflow-auto'>
          <form onSubmit={(e)=>{e.preventDefault(); setLoading(true); fetchProjects();}} className='mb-4 flex gap-3 items-center'>
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
                  <th className='p-3'>{t('admin.name')}</th>
                  <th className='p-3'>{t('admin.owner')}</th>
                  <th className='p-3'>{t('admin.date')}</th>
                  <th className='p-3'>{t('admin.status')}</th>
                  <th className='p-3'>{t('admin.action')}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className='p-6 text-center'>{t('admin.loading')}</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={6} className='p-6 text-center'>{t('admin.noData')}</td></tr>
                ) : (
                  filtered.map(p => (
                    <tr key={p._id} className='odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 border-t border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
                      <td className='p-3'>{p._id}</td>
                      <td className='p-3'>{p.title}</td>
                      <td className='p-3'>{p.client_name}</td>
                      <td className='p-3'>{(p.createdAt ? new Date(p.createdAt) : new Date()).toISOString().slice(0,10)}</td>
                      <td className='p-3'>
                <span className={`px-2 py-1 rounded text-xs ${p.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                  {p.status ? t(`admin.${p.status}`) : t('admin.draft')}
                </span>
                      </td>
                      <td className='p-3'>
                        <div className='flex gap-2'>
                <button onClick={()=>startEdit(p)} className='px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs flex items-center gap-2'>
                  <FaEdit /> {t('admin.edit')}
                </button>
                <button onClick={()=>deleteProject(p._id)} className='px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs flex items-center gap-2'>
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
            <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
              <form onSubmit={submitNewProject} className='bg-white dark:bg-gray-800 p-6 rounded-lg w-[420px] space-y-3'>
                <h3 className='text-lg font-semibold'>{t('admin.createNewProject')}</h3>
                <input value={newProject.name} onChange={(e)=>setNewProject({...newProject, name: e.target.value})} placeholder='Name' className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                <input value={newProject.owner} onChange={(e)=>setNewProject({...newProject, owner: e.target.value})} placeholder='Owner' className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                <select value={newProject.status} onChange={(e)=>setNewProject({...newProject, status: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'>
              <option value='published'>{t('admin.published')}</option>
              <option value='draft'>{t('admin.draft')}</option>
                </select>
                <div className='flex justify-end gap-3 pt-2'>
                  <button type='button' onClick={()=>setShowCreate(false)} className='px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white'>Cancel</button>
                  <button type='submit' className='px-4 py-2 rounded-md bg-PrimaryColor-0 dark:bg-green-600 text-white'>Save</button>
                </div>
              </form>
            </div>
          )}

          {showEdit && (
            <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
              <form onSubmit={submitEditProject} className='bg-white dark:bg-gray-800 p-6 rounded-lg w-[420px] space-y-3'>
                <h3 className='text-lg font-semibold'>Sửa Dự Án</h3>
                <input value={editProject.name} onChange={(e)=>setEditProject({...editProject, name: e.target.value})} placeholder='Name' className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                <input value={editProject.owner} onChange={(e)=>setEditProject({...editProject, owner: e.target.value})} placeholder='Owner' className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                <select value={editProject.status} onChange={(e)=>setEditProject({...editProject, status: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'>
              <option value='published'>{t('admin.published')}</option>
              <option value='draft'>{t('admin.draft')}</option>
                </select>
                <div className='flex justify-end gap-3 pt-2'>
                  <button type='button' onClick={()=>setShowEdit(false)} className='px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white'>Cancel</button>
                  <button type='submit' className='px-4 py-2 rounded-md bg-PrimaryColor-0 dark:bg-green-600 text-white'>Save</button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminProjects;