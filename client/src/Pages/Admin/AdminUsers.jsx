import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaEnvelope, FaUsers, FaBlog, FaProjectDiagram, FaShoppingCart, FaCogs, FaFileAlt, FaHandshake, FaSignOutAlt, FaBars, FaTimes, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAdminTheme } from '../../contexts/AdminThemeContext';
import { getTranslation } from '../../utils/translations';
import {
  // Real API
  getAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  sendAdminOtp,
  resetAdminPassword,
  // Fallback stubs
  getAdminUsersStub,
  createAdminUserStub,
  updateAdminUserStub,
  deleteAdminUserStub,
} from '../../api/api';

const AdminUsers = () => {
  const navigate = useNavigate();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const { adminTheme, toggleAdminTheme } = useAdminTheme();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'viewer', status: 'active' });
  const [editUser, setEditUser] = useState({ id: null, name: '', email: '', role: 'viewer', status: 'active' });
  const [resetPwd, setResetPwd] = useState({ otp: '', new_password: '' });
  const [resetInfo, setResetInfo] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');

    if (!token) {
      navigate('/admin/login');
      return;
    }

    setAdminEmail(email || 'Admin');
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      // Try real API first
      const res = await getAdminUsers({ search: searchTerm });
      const raw = (res?.data?.data ?? res?.data ?? []);
      const arr = Array.isArray(raw) ? raw : (raw.users || raw.items || raw.results || raw.contacts || []);
      const normalized = arr.map(u => ({
        id: u.id || u._id || u.uid || u.userId || u.id,
        name: u.name || u.full_name || (u.email ? String(u.email).split('@')[0] : ''),
        email: u.email,
        role: u.role || 'admin',
        status: typeof u.is_active === 'boolean' ? (u.is_active ? 'active' : 'inactive') : (u.status || 'active'),
      }));
      setUsers(normalized);
    } catch (e) {
      console.warn('Fetch users via API failed, falling back to stub.', e);
      try {
        const res2 = await getAdminUsersStub({ search: searchTerm });
        setUsers(res2.data.data || []);
      } catch (e2) {
        console.error('Fetch users via stub failed', e2);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const filtered = users.filter(u => (
    (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const submitNewUser = async (e) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim() || !newUser.password.trim()) return;
    try {
      const payload = {
        full_name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        is_active: newUser.status === 'active',
      };
      const res = await createAdminUser(payload);
      const itemRaw = res?.data?.data ?? res?.data;
      const item = {
        id: itemRaw?.id || itemRaw?._id,
        name: itemRaw?.full_name || newUser.name,
        email: itemRaw?.email || newUser.email,
        role: 'admin',
        status: itemRaw?.is_active === false ? 'inactive' : 'active',
      };
      setUsers([item, ...users]);
    } catch (err) {
      console.warn('Create user via API failed, using stub.', err);
      const res2 = await createAdminUserStub(newUser);
      const item2 = res2.data.data;
      setUsers([item2, ...users]);
    } finally {
      setShowCreate(false);
      setNewUser({ name: '', email: '', password: '', role: 'viewer', status: 'active' });
    }
  };

  const startEdit = (u) => {
    setEditUser({ id: u.id, name: u.name, email: u.email, role: u.role, status: u.status });
    setShowEdit(true);
  };

  const submitEditUser = async (e) => {
    e.preventDefault();
    if (!editUser.id) return;
    const payload = {
      full_name: editUser.name,
      email: editUser.email,
      is_active: editUser.status === 'active',
    };
    try {
      const res = await updateAdminUser(editUser.id, payload);
      const updatedRaw = res?.data?.data ?? res?.data ?? {};
      const updated = {
        id: updatedRaw?.id || updatedRaw?._id || editUser.id,
        name: updatedRaw?.full_name ?? editUser.name,
        email: updatedRaw?.email ?? editUser.email,
        role: 'admin',
        status: updatedRaw?.is_active === false ? 'inactive' : (editUser.status || 'active'),
      };
      setUsers(users.map(u => u.id === editUser.id ? { ...u, ...updated } : u));
    } catch (err) {
      console.warn('Update user via API failed, using stub.', err);
      const res2 = await updateAdminUserStub(editUser.id, payload);
      const updated2 = res2.data.data;
      setUsers(users.map(u => u.id === editUser.id ? { ...u, ...updated2 } : u));
    } finally {
      setShowEdit(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteAdminUser(id);
    } catch (err) {
      console.warn('Delete user via API failed, using stub.', err);
      await deleteAdminUserStub(id);
    }
    setUsers(users.filter(u => u.id !== id));
  };

  const resetPassword = async () => {
    if (!resetPwd.otp || !resetPwd.new_password) {
      setResetInfo('Vui lòng nhập OTP và mật khẩu mới.');
      return;
    }
    try {
      const res = await resetAdminPassword(resetPwd.otp, resetPwd.new_password);
      if (res?.data?.success) {
        setResetInfo('Đổi mật khẩu thành công. Đang đăng xuất...');
        // Tự động đăng xuất để buộc đăng nhập lại bằng mật khẩu mới
        setTimeout(() => {
          setShowReset(false);
          setResetInfo('');
          setResetPwd({ otp: '', new_password: '' });
          handleLogout();
        }, 1200);
      } else {
        setResetInfo(res?.data?.message || 'Không thể đổi mật khẩu.');
      }
    } catch (err) {
      setResetInfo('OTP không đúng hoặc đã hết hạn.');
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
          <Link to='/admin/dashboard' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 bg-white/30 transition-colors shadow-md'>
            <FaHome size={20} />
            {sidebarOpen && <span>{t('admin.dashboard')}</span>}
          </Link>
          <Link to='/admin/contacts' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaEnvelope size={20} />
            {sidebarOpen && <span>{t('admin.contacts')}</span>}
          </Link>
          <Link to='/admin/users' className='flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'>
            <FaUsers size={20} />
            {sidebarOpen && <span>{t('admin.users')}</span>}
          </Link>
          <Link to='/admin/blogs' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaBlog size={20} />
            {sidebarOpen && <span>{t('admin.blogs')}</span>}
          </Link>
          <Link to='/admin/projects' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaProjectDiagram size={20} />
            {sidebarOpen && <span>{t('admin.projects')}</span>}
          </Link>
          <Link to='/admin/products' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaShoppingCart size={20} />
            {sidebarOpen && <span>{t('admin.products')}</span>}
          </Link>
          <Link to='/admin/solutions' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaCogs size={20} />
            {sidebarOpen && <span>{t('admin.solutions')}</span>}
          </Link>
          <Link to='/admin/policies' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaFileAlt size={20} />
            {sidebarOpen && <span>{t('admin.policies')}</span>}
          </Link>
          <Link to='/admin/customers' className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors'>
            <FaHandshake size={20} />
            {sidebarOpen && <span>{t('admin.customers')}</span>}
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

      {/* Main */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        <header className='bg-white dark:bg-gray-800 shadow-sm p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>{t('admin.manageUsers')}</h2>
            <div className='flex items-center gap-4'>
              <button onClick={()=>setShowCreate(true)} className='px-4 py-2 bg-PrimaryColor-0 dark:bg-green-600 text-white rounded-md'>Tạo Người Dùng Mới</button>
              <button onClick={()=>setShowReset(true)} className='px-4 py-2 bg-blue-600 text-white rounded-md'>Đổi Mật Khẩu (OTP)</button>
              <button onClick={toggleLanguage} className='px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white'>🌐</button>
              <button onClick={toggleAdminTheme} className='px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white' title={adminTheme === 'dark' ? 'Light mode' : 'Dark mode'}>
                {adminTheme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </header>

        <main className='flex-1 p-6 overflow-auto'>
          {/* Search */}
          <form onSubmit={(e)=>{e.preventDefault(); setLoading(true); fetchUsers();}} className='mb-4 flex gap-3 items-center'>
            <div className='relative'>
              <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400' />
              <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder={t('admin.search')} className='pl-10 pr-3 py-2 border rounded-md w-64 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 outline-none' />
            </div>
            <button className='px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-md shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400 transition'> {t('admin.search')} </button>
          </form>

          {/* Table */}
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'>
            <table className='min-w-full text-gray-800 dark:text-gray-100'>
              <thead className='bg-gray-100 dark:bg-gray-700 text-left sticky top-0 z-10 shadow-sm'>
                <tr>
                  <th className='p-3'>ID</th>
                  <th className='p-3'>{t('admin.name')}</th>
                  <th className='p-3'>Email</th>
                  <th className='p-3'>Role</th>
                  <th className='p-3'>Status</th>
                  <th className='p-3'>{t('admin.action')}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className='p-6 text-center'>{t('admin.loading')}</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={5} className='p-6 text-center'>{t('admin.noData')}</td></tr>
                ) : (
                  filtered.map(u => (
                    <tr key={u.id} className='odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 border-t border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
                      <td className='p-3'>{u.id}</td>
                      <td className='p-3'>{u.name}</td>
                      <td className='p-3'>{u.email}</td>
                      <td className='p-3'>{u.role}</td>
                      <td className='p-3'>
                        <span className={`px-2 py-1 rounded text-xs ${u.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>{u.status}</span>
                      </td>
                      <td className='p-3'>
                        <div className='flex gap-2'>
                          <button onClick={()=>startEdit(u)} className='px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs flex items-center gap-2'>
                            <FaEdit /> {t('admin.edit')}
                          </button>
                          <button onClick={()=>deleteUser(u.id)} className='px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs flex items-center gap-2'>
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
              <form onSubmit={submitNewUser} className='bg-white dark:bg-gray-800 p-6 rounded-lg w-[420px] space-y-3'>
                <h3 className='text-lg font-semibold'>Tạo Người Dùng Mới</h3>
                <input value={newUser.name} onChange={(e)=>setNewUser({...newUser, name: e.target.value})} placeholder='Name' className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                <input value={newUser.email} onChange={(e)=>setNewUser({...newUser, email: e.target.value})} placeholder='Email' className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                <input type='password' value={newUser.password} onChange={(e)=>setNewUser({...newUser, password: e.target.value})} placeholder='Password' className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                <select value={newUser.role} onChange={(e)=>setNewUser({...newUser, role: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'>
                  <option value='viewer'>viewer</option>
                  <option value='editor'>editor</option>
                  <option value='admin'>admin</option>
                </select>
                <select value={newUser.status} onChange={(e)=>setNewUser({...newUser, status: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'>
                  <option value='active'>active</option>
                  <option value='inactive'>inactive</option>
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
              <form onSubmit={submitEditUser} className='bg-white dark:bg-gray-800 p-6 rounded-lg w-[420px] space-y-3'>
                <h3 className='text-lg font-semibold'>Sửa Người Dùng</h3>
                <input value={editUser.name} onChange={(e)=>setEditUser({...editUser, name: e.target.value})} placeholder='Name' className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                <input value={editUser.email} onChange={(e)=>setEditUser({...editUser, email: e.target.value})} placeholder='Email' className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                <select value={editUser.role} onChange={(e)=>setEditUser({...editUser, role: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'>
                  <option value='viewer'>viewer</option>
                  <option value='editor'>editor</option>
                  <option value='admin'>admin</option>
                </select>
                <select value={editUser.status} onChange={(e)=>setEditUser({...editUser, status: e.target.value})} className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'>
                  <option value='active'>active</option>
                  <option value='inactive'>inactive</option>
                </select>
                <div className='flex justify-end gap-3 pt-2'>
                  <button type='button' onClick={()=>setShowEdit(false)} className='px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white'>Cancel</button>
                  <button type='submit' className='px-4 py-2 rounded-md bg-PrimaryColor-0 dark:bg-green-600 text-white'>Save</button>
                </div>
              </form>
            </div>
          )}

          {showReset && (
            <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
              <form onSubmit={(e)=>{
                e.preventDefault();
                resetPassword();
              }} className='bg-white dark:bg-gray-800 p-6 rounded-lg w-[420px] space-y-3'>
                <h3 className='text-lg font-semibold'>Đổi Mật Khẩu (Xác minh OTP)</h3>
                <p className='text-sm text-gray-600 dark:text-gray-300'>OTP sẽ được gửi đến email: <span className='font-semibold'>{adminEmail || ''}</span></p>
                {resetInfo && <div className='text-xs p-2 rounded bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'>{resetInfo}</div>}
                <div className='flex gap-2'>
                  <button type='button' onClick={async ()=>{
                    try {
                      await sendAdminOtp();
                      setResetInfo('OTP đã được gửi. Vui lòng kiểm tra email trong 10 phút.');
                    } catch (err) {
                      setResetInfo('Gửi OTP thất bại. Vui lòng thử lại.');
                    }
                  }} className='px-4 py-2 rounded-md bg-blue-600 text-white'>Gửi OTP</button>
                  <button type='button' onClick={()=>{ setResetInfo(''); setResetPwd({ otp: '', new_password: '' }); }} className='px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white'>Xóa nhập</button>
                </div>
                <input value={resetPwd.otp} onChange={(e)=>setResetPwd({...resetPwd, otp: e.target.value})} placeholder='Nhập mã OTP (6 số)' className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                <input type='password' value={resetPwd.new_password} onChange={(e)=>setResetPwd({...resetPwd, new_password: e.target.value})} placeholder='Mật khẩu mới' className='w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
                <div className='flex justify-end gap-3 pt-2'>
                  <button type='button' onClick={()=>{ setShowReset(false); setResetInfo(''); setResetPwd({ otp: '', new_password: '' }); }} className='px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white'>Đóng</button>
                  <button type='submit' className='px-4 py-2 rounded-md bg-PrimaryColor-0 dark:bg-green-600 text-white'>Đổi mật khẩu</button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;