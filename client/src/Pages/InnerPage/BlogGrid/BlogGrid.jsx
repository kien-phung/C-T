import { FaArrowRightLong, FaCircle } from 'react-icons/fa6';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import BlogGridCard from './BlogGridCard';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getTranslation } from '../../../utils/translations';
import { useEffect, useState } from 'react';
import { getPublicBlogs } from '../../../api/api';

// Fetch blogs from public API and map to BlogGridCard props
const useBlogGridData = (language) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPublicBlogs({ limit: 12 })
      .then((res) => {
        const blogs = (res.data.blogs || []).filter((b) => b.is_published);
        const mapped = blogs.map((b) => ({
          id: b._id,
          blogGridThumb: b.thumbnail || '/images/blog/blog1.jpg',
          blogGridDateIcon: <FaCircle />,
          blogGridDate: new Date(b.published_date || b.createdAt).toLocaleDateString(
            language === 'VN' ? 'vi-VN' : 'en-US',
            { day: '2-digit', month: 'short', year: 'numeric' }
          ),
          blogGridPostBy: (language === 'VN' ? b.category_vn : b.category_en) || (language === 'VN' ? 'Công Nghệ' : 'Technology'),
          blogGridUrl: b.is_external ? (b.external_url || '#') : '#',
          blogGridTitle: (language === 'VN' ? b.title_vn : b.title_en) || '',
          blogGridBtn: language === 'VN' ? 'Xem Thêm' : 'View More',
          // No arrow icon; keep only text label
        }));
        setItems(mapped);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [language]);

  return { items, loading };
};

const PAGE_SIZE = 6;

const BlogGrid = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const { items, loading } = useBlogGridData(currentLanguage);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil((items?.length || 0) / PAGE_SIZE));
  useEffect(() => {
    // Reset or clamp page when items change
    if (page > totalPages) setPage(1);
  }, [items, totalPages]);

  const pageItems = (loading ? [] : items).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={t('nav.news')}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={t('nav.news')}
        bgImage={'/images/solutions/blog1.jpg'}
      />
      <section className='pt-28 pb-28 bg-BodyBg4-0'>
        <div className='Container'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch'>
            {pageItems.map(
              ({
                id,
                blogGridThumb,
                blogGridDateIcon,
                blogGridDate,
                blogGridPostBy,
                blogGridUrl,
                blogGridTitle,
                blogGridBtn,
                blogGridBtnIcon,
              }, index) => {
                return (
                  <div
                    key={id}
                    data-aos='fade-up'
                    data-aos-duration='800'
                    data-aos-delay={200 + (index * 100)}
                  >
                    <BlogGridCard
                      blogGridThumb={blogGridThumb}
                      blogGridDateIcon={blogGridDateIcon}
                      blogGridDate={blogGridDate}
                      blogGridPostBy={blogGridPostBy}
                      blogGridUrl={blogGridUrl}
                      blogGridTitle={blogGridTitle}
                      blogGridBtn={blogGridBtn}
                      
                    />
                  </div>
                );
              }
            )}
          </div>
          {/* Pagination controls */}
          {(!loading && totalPages > 1) && (
            <div className='mt-8 flex items-center justify-center gap-2'>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`px-3 py-2 rounded-md border font-bold transition ${
                  page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                } bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700`}
              >
                {t('common.prev')}
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center font-bold transition ${
                    n === page
                      ? 'bg-PrimaryColor-0 text-white border-PrimaryColor-0 dark:bg-PrimaryColor-0 dark:text-white dark:border-PrimaryColor-0'
                      : 'bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-700'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className={`px-3 py-2 rounded-md border font-bold transition ${
                  page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                } bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700`}
              >
                {t('common.next')}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogGrid;
