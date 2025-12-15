import { FaCircle } from 'react-icons/fa6';
import border from '/images/hero_border.png';
import BlogCard from './BlogCard';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { getPublicBlogs } from '../../api/api';

// Fetch blogs for homepage (3 items) from public API
const useHomeBlogs = (language) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPublicBlogs({ limit: 6 })
      .then((res) => {
        const blogs = (res.data.blogs || [])
          .filter((b) => b.is_published)
          .slice(0, 3);

        const mapped = blogs.map((b) => ({
          id: b._id,
          blogThumb: b.thumbnail || '/images/blog/blog1.jpg',
          blogThumbTitle: (language === 'VN' ? b.category_vn : b.category_en) || (language === 'VN' ? 'Công nghệ' : 'Technology'),
          blogDateIcon: <FaCircle />,
          blogDate: new Date(b.published_date || b.createdAt).toLocaleDateString(
            language === 'VN' ? 'vi-VN' : 'en-US',
            { day: '2-digit', month: 'short', year: 'numeric' }
          ),
          blogUrl: b.is_external ? (b.external_url || '#') : '#',
          blogTitle: (language === 'VN' ? b.title_vn : b.title_en) || '',
          blogDesc: (language === 'VN' ? b.description_vn : b.description_en) || '',
          isExternal: !!b.is_external,
        }));
        setItems(mapped);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [language]);

  return { items, loading };
};

const Blog = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const { items, loading } = useHomeBlogs(currentLanguage);

  return (
    <section style={{ backgroundImage: `url(/images/blog3_bg.png)` }} className='bg-no-repeat bg-center bg-cover py-20'>
      <div className='Container'>
        <div className='text-center'>
          <h5
            className='font-FiraSans font-medium text-sm sm:text-base text-PrimaryColor-0 uppercase mb-3'
            data-aos='fade-up'
            data-aos-duration='800'
          >
            {t('blog.sectionTitle')}
          </h5>
          <h1
            className='font-FiraSans font-semibold text-HeadingColor-0 inline-block text-[22px] leading-[32px] sm:text-[32px] sm:leading-[42px] md:text-[40px] md:leading-[50px] lg:text-[40px] lg:leading-[50px] xl:text-[45px] xl:leading-[55px] 2xl:text-[48px] 2xl:leading-[58px] relative pb-4'
            data-aos='fade-up'
            data-aos-duration='800'
            data-aos-delay='100'
          >
            {t('blog.title')}
            <img
              src={border}
              draggable='false'
              className='absolute bottom-0 left-1/2 -translate-x-1/2'
            />
          </h1>
        </div>
        <div className='mt-[60px]'>
          {/* Mobile Swiper */}
          <div className='md:hidden'>
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className='blog-swiper'
            >
              {(loading ? [] : items).map(
                ({
                  id,
                  blogThumb,
                  blogThumbTitle,
                  blogDateIcon,
                  blogDate,
                  blogCommentIcon,
                  blogComment,
                  blogUrl,
                  blogTitle,
                  blogDesc,
                  isExternal,
                }) => {
                  return (
                    <SwiperSlide key={id}>
                      <BlogCard
                        blogThumb={blogThumb}
                        blogThumbTitle={blogThumbTitle}
                        blogDateIcon={blogDateIcon}
                        blogDate={blogDate}
                        blogCommentIcon={blogCommentIcon}
                        blogComment={blogComment}
                        blogUrl={blogUrl}
                        blogTitle={blogTitle}
                        blogDesc={blogDesc}
                        isExternal={isExternal}
                      />
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>
          </div>

          {/* Desktop Swiper with navigation */}
          <div className='hidden md:block'>
            <Swiper
              spaceBetween={24}
              slidesPerView={2}
              navigation
              modules={[Navigation]}
              className='blog-swiper blog-swiper-desktop'
            >
              {(loading ? [] : items).map(
                ({
                  id,
                  blogThumb,
                  blogThumbTitle,
                  blogDateIcon,
                  blogDate,
                  blogCommentIcon,
                  blogComment,
                  blogUrl,
                  blogTitle,
                  blogDesc,
                  isExternal,
                }) => (
                  <SwiperSlide key={id}>
                    <BlogCard
                      blogThumb={blogThumb}
                      blogThumbTitle={blogThumbTitle}
                      blogDateIcon={blogDateIcon}
                      blogDate={blogDate}
                      blogCommentIcon={blogCommentIcon}
                      blogComment={blogComment}
                      blogUrl={blogUrl}
                      blogTitle={blogTitle}
                      blogDesc={blogDesc}
                      isExternal={isExternal}
                    />
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
