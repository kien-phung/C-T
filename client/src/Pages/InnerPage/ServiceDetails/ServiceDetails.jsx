import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import Counter from './Counter/Counter';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getTranslation } from '../../../utils/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts } from '../../../api/api';
import { socket } from '../../../api/socket';
import axiosClient from '../../../api/axiosClient';
 
// Remove hardcoded dataset: now using API + realtime socket

const ServiceDetails = () => {
  const [activeTab, setActiveTab] = useState('hardware');
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const resolveName = (p) => (
    currentLanguage === 'EN'
      ? (p?.name_en || p?.name_vn || '')
      : (p?.name_vn || p?.name_en || '')
  );

  const resolveFeatures = (p) => {
    // Prefer bilingual arrays when available
    if (currentLanguage === 'EN') {
      const en = Array.isArray(p?.features_en) ? p.features_en : [];
      if (en.length > 0) return en;
      // fallback to legacy single-language features
      return Array.isArray(p?.features) ? p.features : [];
    } else {
      const vn = Array.isArray(p?.features_vn) ? p.features_vn : [];
      if (vn.length > 0) return vn;
      return Array.isArray(p?.features) ? p.features : [];
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      const items = res?.data?.data ?? res?.data?.products ?? [];
      setProducts(items);
    } catch (e) {
      console.error('Fetch public products failed', e);
    } finally { setLoading(false); }
  };

  // Price display: translate "Liên hệ" based on current language
  const isContactLabel = (value) => {
    const s = String(value || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').trim();
    return s === 'lien he' || s === 'lienhe' || s === 'contact';
  };
  const displayPrice = (value) => {
    if (!value || isContactLabel(value)) return t('nav.contact');
    return value;
  };

  useEffect(() => {
    fetchProducts();
    // Optional polling (disabled by default via VITE_POLL_PRODUCTS=false)
    const POLL_ENABLED = import.meta.env.VITE_POLL_PRODUCTS === 'true';
    const POLL_INTERVAL = Number(import.meta.env.VITE_POLL_PRODUCTS_INTERVAL_MS || 0) || 15000;
    let intervalId;
    if (POLL_ENABLED) {
      intervalId = setInterval(fetchProducts, POLL_INTERVAL);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // Realtime updates via Socket.IO
  useEffect(() => {
    const onChange = (payload) => {
      if (!payload) { fetchProducts(); return; }
      if (payload.type === 'created' && payload.data) {
        setProducts(prev => [payload.data, ...prev]);
      } else if (payload.type === 'updated' && payload.data) {
        const id = payload.data._id || payload.data.id;
        setProducts(prev => prev.map(p => (p._id === id ? { ...p, ...payload.data } : p)));
      } else if (payload.type === 'deleted') {
        const id = payload.id;
        setProducts(prev => prev.filter(p => p._id !== id));
      } else {
        fetchProducts();
      }
    };
    socket.on('products.changed', onChange);
    return () => {
      socket.off('products.changed', onChange);
    };
  }, []);

  // (Removed) Projects API integration; ServiceDetails focuses on product showcase only.

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 3 products per page

  // Filter by active tab and published status
  const filteredProducts = products.filter(p => (p?.category || 'hardware') === activeTab && p?.is_published !== false);

  // Calculate pagination for current tab
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber, shouldScroll = false) => {
    setCurrentPage(pageNumber);
    if (shouldScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset to page 1 when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Auto download product PDF when clicking "View Details"
  const handleViewDetails = async (product) => {
    const urls = Array.isArray(product?.pdf_urls) && product.pdf_urls.length > 0
      ? product.pdf_urls
      : (product?.pdf_url ? [product.pdf_url] : []);
    if (urls.length === 0) return; // no PDF configured

    const baseName = resolveName(product).replace(/\s+/g, '_');

    // Ensure we use absolute backend URL and strip trailing /api from base
    const toAbsoluteUrl = (u) => {
      if (!u) return u;
      if (/^https?:\/\//i.test(u)) return u;
      let apiBase = axiosClient?.defaults?.baseURL || '';
      if (apiBase) {
        apiBase = apiBase.replace(/\/$/, '');
        apiBase = apiBase.replace(/\/api$/i, '');
      }
      const backendBase = apiBase || window.location.origin;
      const left = backendBase.endsWith('/') ? backendBase.slice(0, -1) : backendBase;
      const right = u.startsWith('/') ? u : `/${u}`;
      return `${left}${right}`;
    };

    for (let i = 0; i < urls.length; i++) {
      const url = toAbsoluteUrl(urls[i]);
      const suggested = urls.length === 1 ? `${baseName}.pdf` : `${baseName}_${i+1}.pdf`;
      try {
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const ct = response.headers.get('content-type') || '';
        if (!/application\/pdf/i.test(ct)) {
          // Not a PDF? fallback to opening URL directly
          throw new Error(`Unexpected content-type: ${ct}`);
        }
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = suggested;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(blobUrl);
      } catch (e) {
        // Fallback when CORS blocks fetch: open directly
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.download = suggested;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    }
  };

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={t('nav.products')}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={t('nav.products')}
        bgImage={'/images/solutions/service1.jpg'}
      />

      <section className='py-[120px] bg-BodyBg4-0'>
        <div className='Container'>
          {/* Header Section */}
          <div className='text-center mb-16'>
            <h1
              className='font-FiraSans font-semibold text-4xl sm:text-5xl text-HeadingColor-0 dark:!text-white mb-6'
              data-aos='fade-up'
              data-aos-duration='800'
            >
              {t('service.pageTitle')}
            </h1>
            <p
              className='font-FiraSans text-TextColor2-0 text-lg max-w-3xl mx-auto'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='100'
            >
              {t('service.description')}
            </p>
          </div>

          {/* Tab Navigation */}
          <div
            className='flex justify-center mb-12'
            data-aos='fade-up'
            data-aos-duration='800'
            data-aos-delay='200'
          >
            <div className='bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg'>
              <button
                onClick={() => handleTabChange('hardware')}
                className={`px-8 py-3 rounded-md font-FiraSans font-medium transition-all duration-300 ${
                  activeTab === 'hardware'
                    ? 'bg-PrimaryColor-0 dark:bg-green-600 text-white'
                    : 'text-HeadingColor-0 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {currentLanguage === 'VN' ? 'Phần cứng' : 'Hardware'}
              </button>
              <button
                onClick={() => handleTabChange('software')}
                className={`px-8 py-3 rounded-md font-FiraSans font-medium transition-all duration-300 ${
                  activeTab === 'software'
                    ? 'bg-PrimaryColor-0 dark:bg-green-600 text-white'
                    : 'text-HeadingColor-0 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {currentLanguage === 'VN' ? 'Phần mềm' : 'Software'}
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`grid gap-8 items-start ${
                currentPage === totalPages && displayedProducts.length === 1
                  ? 'grid-cols-1 max-w-md mx-auto'
                  : currentPage === totalPages && displayedProducts.length === 2
                  ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {loading && (
                <div className='col-span-3 text-center text-gray-600 dark:text-gray-300'>
                  {t('admin.loading')}
                </div>
              )}
              {!loading && displayedProducts.length === 0 && (
                <div className='col-span-3 text-center text-gray-600 dark:text-gray-300'>
                  {t('admin.noData')}
                </div>
              )}
              {!loading && displayedProducts.map((product, index) => (
                <div
                  key={product._id || product.id || index}
                  className='bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full'
                  data-aos='fade-up'
                  data-aos-duration='800'
                  data-aos-delay={300 + (index * 100)}
                >
                <div className='relative overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center'>
                  <img
                    src={product.image}
                    alt={resolveName(product)}
                    className='w-full h-64 object-contain p-4 transition-transform duration-300 hover:scale-105'
                    onError={(e) => {
                      e.target.src = '/images/placeholder-product.png';
                    }}
                  />
                </div>
                <div className='p-6 flex flex-col flex-grow'>
                  <h3 className='font-FiraSans font-semibold text-xl text-HeadingColor-0 dark:!text-white mb-4 min-h-[3rem] flex items-center'>
                    {resolveName(product)}
                  </h3>
                  <ul className='space-y-2 mb-6 flex-grow'>
                    {resolveFeatures(product).map((feature, index) => (
                      <li key={index} className='font-FiraSans text-TextColor2-0 dark:text-gray-300 text-sm flex items-start gap-2'>
                        <span className='text-PrimaryColor-0 dark:text-green-400 mt-1 flex-shrink-0'>•</span>
                        <span className='leading-relaxed'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className='flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700'>
                    <div className='text-2xl font-FiraSans font-bold text-PrimaryColor-0 dark:text-green-400'>
                      {displayPrice(product.price)}
                    </div>
                    <button onClick={() => handleViewDetails(product)} className='bg-PrimaryColor-0 dark:bg-green-600 text-white px-6 py-2 rounded-lg font-FiraSans font-medium hover:bg-opacity-90 transition-all duration-300 whitespace-nowrap'>
                      {currentLanguage === 'VN' ? 'Xem chi tiết' : 'View Details'}
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* (Removed) Projects section; projects are shown on the Home page Portfolio section. */}

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className='flex justify-center items-center gap-2 mt-12'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='600'
            >
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1, true)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-FiraSans font-medium transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 text-HeadingColor-0 dark:text-white hover:bg-PrimaryColor-0 dark:hover:bg-green-600 hover:text-white'
                }`}
              >
                {currentLanguage === 'VN' ? 'Trước' : 'Previous'}
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 rounded-lg font-FiraSans font-medium transition-all duration-300 ${
                      currentPage === pageNumber
                        ? 'bg-PrimaryColor-0 dark:bg-green-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-HeadingColor-0 dark:text-white hover:bg-PrimaryColor-0 dark:hover:bg-green-600 hover:text-white'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1, true)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-FiraSans font-medium transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 text-HeadingColor-0 dark:text-white hover:bg-PrimaryColor-0 dark:hover:bg-green-600 hover:text-white'
                }`}
              >
                {currentLanguage === 'VN' ? 'Sau' : 'Next'}
              </button>
            </div>
          )}
        </div>
      </section>

      <Counter />
    </>
  );
};

export default ServiceDetails;
