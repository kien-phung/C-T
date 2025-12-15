import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaEnvelope, FaUsers, FaBlog, FaProjectDiagram, FaShoppingCart, FaCogs, FaFileAlt, FaHandshake, FaSignOutAlt, FaBars, FaTimes, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import { useAdminTheme } from '../../contexts/AdminThemeContext';
import { getAdminProducts, createAdminProduct, updateAdminProduct, deleteAdminProduct, uploadAdminPdfFiles } from '../../api/api';
import { useRef } from 'react';

const AdminProducts = () => {
  const navigate = useNavigate();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const { adminTheme, toggleAdminTheme } = useAdminTheme();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('hardware');
  const [products, setProducts] = useState([]);
  const [priceSort, setPriceSort] = useState('none'); // 'none' | 'asc' | 'desc'
  const [showCreate, setShowCreate] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name_vn: '', name_en: '', description: '', image: '', price: '',
    features_vn: '', // comma separated input
    features_en: '', // comma separated input
    category: 'hardware', is_published: true,
    pdf_urls: [] // store uploaded PDF URLs
  });
  const [showEdit, setShowEdit] = useState(false);
  const [editProduct, setEditProduct] = useState({
    id: null, name_vn: '', name_en: '', description: '', image: '', price: '',
    features_vn: '', features_en: '', category: 'hardware', is_published: true,
    pdf_urls: []
  });

  const fileInputCreateRef = useRef(null);
  const fileInputEditRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handlePdfUpload = async (files, mode = 'create') => {
    try {
      setUploadError('');
      setUploading(true);
      const onlyPdf = Array.from(files || []).filter(f => {
        const mimeOk = f && f.type === 'application/pdf';
        const nameOk = f && typeof f.name === 'string' && f.name.toLowerCase().endsWith('.pdf');
        return mimeOk || nameOk;
      });
      if (!onlyPdf.length) { setUploadError(currentLanguage === 'EN' ? 'Please select PDF files' : 'Vui lòng chọn file PDF'); return; }
      const res = await uploadAdminPdfFiles(onlyPdf);
      const urls = Array.isArray(res?.urls) ? res.urls : [];
      if (!urls.length) { setUploadError(currentLanguage === 'EN' ? 'Upload failed' : 'Tải lên thất bại'); return; }
      if (mode === 'create') {
        setNewProduct({ ...newProduct, pdf_urls: [...(newProduct.pdf_urls||[]), ...urls] });
      } else {
        setEditProduct({ ...editProduct, pdf_urls: [...(editProduct.pdf_urls||[]), ...urls] });
      }
    } catch (e) {
      console.error('Upload PDFs failed', e);
      const serverMsg = e?.response?.data?.message;
      const fallback = currentLanguage === 'EN' ? 'Upload error. Please try again.' : 'Lỗi tải lên. Vui lòng thử lại.';
      setUploadError(serverMsg || e?.message || fallback);
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePdf = (index, mode = 'create') => {
    if (mode === 'create') {
      const next = [...(newProduct.pdf_urls||[])];
      next.splice(index, 1);
      setNewProduct({ ...newProduct, pdf_urls: next });
    } else {
      const next = [...(editProduct.pdf_urls||[])];
      next.splice(index, 1);
      setEditProduct({ ...editProduct, pdf_urls: next });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');
    if (!token) { navigate('/admin/login'); return; }
    setAdminEmail(email || 'Admin');
    fetchProducts();
  }, [navigate]);

  // Tự động tải lại khi đổi bộ lọc danh mục
  useEffect(() => {
    fetchProducts();
  }, [categoryFilter]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getAdminProducts({ search: searchTerm, category: categoryFilter });
      const items = res?.data?.data ?? res?.data?.products ?? [];
      setProducts(items);
    } catch (e) {
      console.error('Fetch products failed', e);
    } finally { setLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const resolveName = (p) => {
    return currentLanguage === 'EN'
      ? (p?.name_en || p?.name_vn || '')
      : (p?.name_vn || p?.name_en || '');
  };

  const resolveFeatures = (p) => {
    const vn = Array.isArray(p?.features_vn) ? p.features_vn : [];
    const en = Array.isArray(p?.features_en) ? p.features_en : [];
    const legacy = Array.isArray(p?.features) ? p.features : [];
    if (currentLanguage === 'EN') {
      return en.length ? en : (legacy.length ? legacy : vn);
    }
    return vn.length ? vn : (legacy.length ? legacy : en);
  };

  // Parse a price string like '100.000.000 VND', '15,000,000 VNĐ', 'Liên hệ' -> number or null
  const parsePrice = (value) => {
    if (!value) return null;
    const digits = String(value).replace(/[^0-9]/g, '');
    if (!digits) return null;
    return Number(digits);
  };

  const compareByPrice = (a, b) => {
    const aVal = parsePrice(a?.price);
    const bVal = parsePrice(b?.price);
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1; // Unknown price -> push to bottom
    if (bVal == null) return -1;
    return priceSort === 'asc' ? (aVal - bVal) : (bVal - aVal);
  };

  const sortedProducts = priceSort === 'none' ? products : [...products].sort(compareByPrice);

  // Price display: translate "Liên hệ" to current language
  const isContactLabel = (value) => {
    const s = String(value || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').trim();
    return s === 'lien he' || s === 'lienhe' || s === 'contact';
  };
  const displayPrice = (value) => {
    if (!value || isContactLabel(value)) return getTranslation(currentLanguage, 'nav.contact');
    return value;
  };

  // Utilities: translate common VN feature phrases to EN for convenience
  const normalize = (s) => String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim();

  const vnToEnDict = {
    // Remote Monitoring Electronic Scale System
    [normalize('Giao diện điều khiển HMI (trên máy cân)')]: 'HMI interface (on the scale)',
    [normalize('Phần cứng kết nối IOT')]: 'IoT-connected hardware',
    [normalize('Nền tảng giám sát từ xa')]: 'Remote monitoring platform',

    // Attendance Device
    [normalize('Màn hình hiển thị thông báo điểm danh')]: 'Display for attendance notifications',
    [normalize('Thiết bị âm thanh')]: 'Audio device',
    [normalize('Đọc thẻ nhanh')]: 'Fast card reading',

    // Cash Payout Device
    [normalize('Nhận mệnh giá từ 1.000VND-500.000VND')]: 'Accept denominations from 1,000–500,000 VND',
    [normalize('Hỗ trợ trả lại tiền thừa/không hỗ trợ trả lại tiền thừa')]: 'Supports change payout / no change payout option',
    [normalize('Sức chứa lên đến 1000 tờ')]: 'Capacity up to 1,000 notes',
  };

  const translateVNFeaturesToEN = (arr) => {
    const list = Array.isArray(arr) ? arr : [];
    return list.map((f) => vnToEnDict[normalize(f)] || f);
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
          <Link to='/admin/products' className='flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'>
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
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>{t('admin.products')}</h2>
            <div className='flex items-center gap-4'>
              <button onClick={()=>setShowCreate(true)} className='px-4 py-2 bg-PrimaryColor-0 dark:bg-green-600 text-white rounded-md'>{t('admin.createNewProduct')}</button>
              <button onClick={toggleLanguage} className='px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white'>🌐</button>
              <button onClick={toggleAdminTheme} className='px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white' title={adminTheme === 'dark' ? 'Light mode' : 'Dark mode'}>
                {adminTheme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </header>

        <main className='flex-1 p-6 overflow-auto'>
          <form onSubmit={(e)=>{e.preventDefault(); fetchProducts();}} className='mb-4 flex flex-wrap gap-3 items-center'>
            <div className='relative'>
              <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400' />
              <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder={t('admin.search')} className='pl-10 pr-3 py-2 border rounded-md w-64 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 outline-none' />
            </div>
            <select value={categoryFilter} onChange={(e)=>setCategoryFilter(e.target.value)} className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'>
              <option value='hardware'>{currentLanguage === 'EN' ? 'Hardware' : 'Phần cứng'}</option>
              <option value='software'>{currentLanguage === 'EN' ? 'Software' : 'Phần mềm'}</option>
            </select>
            <select value={priceSort} onChange={(e)=>setPriceSort(e.target.value)} className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'>
              <option value='none'>{currentLanguage === 'EN' ? 'Price: Default' : 'Giá: Mặc định'}</option>
              <option value='desc'>{currentLanguage === 'EN' ? 'Price: High → Low' : 'Giá: Cao → Thấp'}</option>
              <option value='asc'>{currentLanguage === 'EN' ? 'Price: Low → High' : 'Giá: Thấp → Cao'}</option>
            </select>
            <button className='px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-md shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400 transition'> {t('admin.search')} </button>
          </form>

          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'>
            {loading ? (
              <div className='p-6 text-center text-gray-600 dark:text-gray-200'>{t('admin.loading')}</div>
            ) : (
              <div className='p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {products.length === 0 && (
                  <div className='col-span-3 p-6 text-center text-gray-600 dark:text-gray-200'>{t('admin.noData')}</div>
                )}
                {sortedProducts.map(p => (
                  <div key={p._id} className='rounded-lg border dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow'>
                    {p.image && (
                      <div className='w-full h-40 bg-gray-100 dark:bg-gray-900 flex items-center justify-center'>
                        <img src={p.image} alt={resolveName(p)} className='max-h-full max-w-full object-contain transition-transform duration-200 hover:scale-[1.02]' />
                      </div>
                    )}
                    <div className='p-3'>
                      <div className='font-semibold text-gray-900 dark:text-white'>{resolveName(p)}</div>
                      <div className='text-sm text-gray-600 dark:text-gray-300'>{displayPrice(p.price)}</div>
                      {/* Features list removed from Admin product card display */}
                      <div className='mt-3 flex justify-between'>
                        <button onClick={()=>{
    const vnArr = Array.isArray(p.features_vn) ? p.features_vn : (Array.isArray(p.features) ? p.features : []);
    const enArrSource = Array.isArray(p.features_en) ? p.features_en : [];
                          const enArr = enArrSource.length ? enArrSource : translateVNFeaturesToEN(vnArr);
                          setEditProduct({
                            id: p._id,
                            name_vn: p.name_vn||'', name_en: p.name_en||'', description: p.description||'', image: p.image||'', price: p.price||'',
    features_vn: vnArr.join(' | '),
    features_en: enArr.join(' | '),
                            category: p.category||'hardware', is_published: p.is_published!==false,
                            pdf_urls: Array.isArray(p.pdf_urls) && p.pdf_urls.length
                              ? p.pdf_urls
                              : ((p.pdf_url && [p.pdf_url]) || [])
                          });
                          setShowEdit(true);
                        }} className='px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2'>
                          <FaEdit /> {t('admin.edit')}
                        </button>
                        <button onClick={()=>deleteAdminProduct(p._id).then(()=>setProducts(products.filter(x=>x._id!==p._id)))} className='px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-2'>
                          <FaTrash /> {t('admin.delete')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      {/* Create Product Modal */}
      {showCreate && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>{currentLanguage === 'EN' ? 'Create Product' : 'Tạo Sản Phẩm'}</h3>
              <button onClick={()=>setShowCreate(false)} className='p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700'><FaTimes /></button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <input value={newProduct.name_vn} onChange={(e)=>setNewProduct({...newProduct, name_vn:e.target.value})} placeholder={currentLanguage === 'EN' ? 'Name (VN)' : 'Tên (VN)'} className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
              <input value={newProduct.name_en} onChange={(e)=>setNewProduct({...newProduct, name_en:e.target.value})} placeholder={currentLanguage === 'EN' ? 'Name (EN)' : 'Name (EN)'} className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
              <input value={newProduct.image} onChange={(e)=>setNewProduct({...newProduct, image:e.target.value})} placeholder={currentLanguage === 'EN' ? 'Image URL' : 'Image URL'} className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
              <input value={newProduct.price} onChange={(e)=>setNewProduct({...newProduct, price:e.target.value})} placeholder={currentLanguage === 'EN' ? 'Price' : 'Giá'} className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
              <div className='space-y-2'>
                <input ref={fileInputCreateRef} type='file' accept='application/pdf' multiple className='hidden' onChange={(e)=>handlePdfUpload(e.target.files,'create')} />
                <div onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>{e.preventDefault(); handlePdfUpload(e.dataTransfer.files,'create');}} className='border-2 border-dashed rounded-md p-3 text-sm dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' onClick={()=>fileInputCreateRef.current?.click()}>
                  {currentLanguage === 'EN' ? 'Drop PDF files here or click to select' : 'Kéo thả file PDF vào đây hoặc bấm để chọn'}
                </div>
                {uploading && <div className='text-xs text-gray-500 dark:text-gray-300'>{currentLanguage === 'EN' ? 'Uploading...' : 'Đang tải lên...'}</div>}
                {uploadError && <div className='text-xs text-red-600'>{uploadError}</div>}
                {(newProduct.pdf_urls||[]).length > 0 && (
                  <ul className='space-y-1'>
                    {newProduct.pdf_urls.map((u, idx) => (
                      <li key={idx} className='flex items-center justify-between text-sm'>
                        <a href={u} target='_blank' rel='noopener' className='text-blue-600 dark:text-blue-400 underline break-all'>{u}</a>
                        <button type='button' onClick={()=>handleRemovePdf(idx,'create')} className='text-red-600 hover:underline'>
                          {currentLanguage === 'EN' ? 'Remove' : 'Xóa'}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <select value={newProduct.category} onChange={(e)=>setNewProduct({...newProduct, category:e.target.value})} className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'>
                <option value='hardware'>{currentLanguage === 'EN' ? 'Hardware' : 'Phần cứng'}</option>
                <option value='software'>{currentLanguage === 'EN' ? 'Software' : 'Phần mềm'}</option>
              </select>
              <label className='flex items-center gap-2 text-gray-700 dark:text-gray-200'>
                <input type='checkbox' checked={newProduct.is_published} onChange={(e)=>setNewProduct({...newProduct, is_published:e.target.checked})} />
                {currentLanguage === 'EN' ? 'Publicly visible' : 'Hiển thị công khai'}
              </label>
              <textarea value={newProduct.description} onChange={(e)=>setNewProduct({...newProduct, description:e.target.value})} placeholder={currentLanguage === 'EN' ? 'Description' : 'Mô tả'} className='md:col-span-2 px-3 py-2 border rounded-md min-h-24 dark:bg-gray-700 dark:text-white' />
        <input value={newProduct.features_vn} onChange={(e)=>setNewProduct({...newProduct, features_vn:e.target.value})} placeholder={currentLanguage === 'EN' ? 'Features (VN: use | to separate)' : 'Tính năng (VN: dùng ký tự | để phân tách)'} className='md:col-span-2 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
        <input value={newProduct.features_en} onChange={(e)=>setNewProduct({...newProduct, features_en:e.target.value})} placeholder={currentLanguage === 'EN' ? 'Features (EN: use | to separate)' : 'Tính năng (EN: dùng ký tự | để phân tách)'} className='md:col-span-2 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
            </div>
            <div className='mt-6 flex justify-end gap-3'>
              <button onClick={()=>setShowCreate(false)} className='px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'>{currentLanguage === 'EN' ? 'Cancel' : 'Hủy'}</button>
              <button onClick={async()=>{
                const payload = {
                  ...newProduct,
      features_vn: newProduct.features_vn.split('|').map(f=>f.trim()).filter(Boolean),
      features_en: newProduct.features_en.split('|').map(f=>f.trim()).filter(Boolean),
                  // keep legacy field empty to avoid duplication
                  features: [],
                  pdf_urls: newProduct.pdf_urls,
                  pdf_url: (newProduct.pdf_urls||[])[0] || ''
                };
                try {
                  const res = await createAdminProduct(payload);
                  const created = res?.data?.data ?? res?.data?.product ?? payload;
                  setProducts([created, ...products]);
                  setShowCreate(false);
                } catch(err) {
                  console.error('Create product failed', err);
                }
              }} className='px-4 py-2 rounded-md bg-green-600 text-white'>{currentLanguage === 'EN' ? 'Save' : 'Lưu'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEdit && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>{currentLanguage === 'EN' ? 'Edit Product' : 'Sửa Sản Phẩm'}</h3>
              <button onClick={()=>setShowEdit(false)} className='p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700'><FaTimes /></button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <input value={editProduct.name_vn} onChange={(e)=>setEditProduct({...editProduct, name_vn:e.target.value})} placeholder={currentLanguage === 'EN' ? 'Name (VN)' : 'Tên (VN)'} className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
              <input value={editProduct.name_en} onChange={(e)=>setEditProduct({...editProduct, name_en:e.target.value})} placeholder={currentLanguage === 'EN' ? 'Name (EN)' : 'Name (EN)'} className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
              <input value={editProduct.image} onChange={(e)=>setEditProduct({...editProduct, image:e.target.value})} placeholder={currentLanguage === 'EN' ? 'Image URL' : 'Image URL'} className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
              <input value={editProduct.price} onChange={(e)=>setEditProduct({...editProduct, price:e.target.value})} placeholder={currentLanguage === 'EN' ? 'Price' : 'Giá'} className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
              <div className='space-y-2'>
                <input ref={fileInputEditRef} type='file' accept='application/pdf' multiple className='hidden' onChange={(e)=>handlePdfUpload(e.target.files,'edit')} />
                <div onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>{e.preventDefault(); handlePdfUpload(e.dataTransfer.files,'edit');}} className='border-2 border-dashed rounded-md p-3 text-sm dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' onClick={()=>fileInputEditRef.current?.click()}>
                  {currentLanguage === 'EN' ? 'Drop PDF files here or click to select' : 'Kéo thả file PDF vào đây hoặc bấm để chọn'}
                </div>
                {uploading && <div className='text-xs text-gray-500 dark:text-gray-300'>{currentLanguage === 'EN' ? 'Uploading...' : 'Đang tải lên...'}</div>}
                {uploadError && <div className='text-xs text-red-600'>{uploadError}</div>}
                {(editProduct.pdf_urls||[]).length > 0 && (
                  <ul className='space-y-1'>
                    {editProduct.pdf_urls.map((u, idx) => (
                      <li key={idx} className='flex items-center justify-between text-sm'>
                        <a href={u} target='_blank' rel='noopener' className='text-blue-600 dark:text-blue-400 underline break-all'>{u}</a>
                        <button type='button' onClick={()=>handleRemovePdf(idx,'edit')} className='text-red-600 hover:underline'>
                          {currentLanguage === 'EN' ? 'Remove' : 'Xóa'}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <select value={editProduct.category} onChange={(e)=>setEditProduct({...editProduct, category:e.target.value})} className='px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white'>
                <option value='hardware'>{currentLanguage === 'EN' ? 'Hardware' : 'Phần cứng'}</option>
                <option value='software'>{currentLanguage === 'EN' ? 'Software' : 'Phần mềm'}</option>
              </select>
              <label className='flex items-center gap-2 text-gray-700 dark:text-gray-200'>
                <input type='checkbox' checked={editProduct.is_published} onChange={(e)=>setEditProduct({...editProduct, is_published:e.target.checked})} />
                {currentLanguage === 'EN' ? 'Publicly visible' : 'Hiển thị công khai'}
              </label>
              <textarea value={editProduct.description} onChange={(e)=>setEditProduct({...editProduct, description:e.target.value})} placeholder={currentLanguage === 'EN' ? 'Description' : 'Mô tả'} className='md:col-span-2 px-3 py-2 border rounded-md min-h-24 dark:bg-gray-700 dark:text-white' />
        <input value={editProduct.features_vn} onChange={(e)=>setEditProduct({...editProduct, features_vn:e.target.value})} placeholder={currentLanguage === 'EN' ? 'Features (VN: use | to separate)' : 'Tính năng (VN: dùng ký tự | để phân tách)'} className='md:col-span-2 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
        <input value={editProduct.features_en} onChange={(e)=>setEditProduct({...editProduct, features_en:e.target.value})} placeholder={currentLanguage === 'EN' ? 'Features (EN: use | to separate)' : 'Tính năng (EN: dùng ký tự | để phân tách)'} className='md:col-span-2 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white' />
            </div>
            <div className='mt-6 flex justify-end gap-3'>
              <button onClick={()=>setShowEdit(false)} className='px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'>{currentLanguage === 'EN' ? 'Cancel' : 'Hủy'}</button>
              <button onClick={async()=>{
                const payload = {
                  ...editProduct,
      features_vn: editProduct.features_vn.split('|').map(f=>f.trim()).filter(Boolean),
      features_en: editProduct.features_en.split('|').map(f=>f.trim()).filter(Boolean),
                  features: [],
                  pdf_urls: editProduct.pdf_urls,
                  pdf_url: (editProduct.pdf_urls||[])[0] || ''
                };
                try {
                  const res = await updateAdminProduct(editProduct.id, payload);
                  const updated = res?.data?.data ?? res?.data?.product ?? payload;
                  setProducts(products.map(x=> x._id === editProduct.id ? {...x, ...updated} : x));
                  setShowEdit(false);
                } catch(err) {
                  console.error('Update product failed', err);
                }
              }} className='px-4 py-2 rounded-md bg-blue-600 text-white'>{currentLanguage === 'EN' ? 'Save' : 'Lưu'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Create modal
// Basic inline modal for brevity (consistent with other pages)
// Note: Using simple forms without complex validation to move fast

export default AdminProducts;
