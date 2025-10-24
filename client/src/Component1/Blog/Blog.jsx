import { FaCircle } from 'react-icons/fa6';
import blogThumb from '/images/blog/blog1.jpg';
import blogThumb2 from '/images/blog/blog2.jpg';
import blogThumb3 from '/images/blog/blog3.jpg';
import border from '/images/hero_border.png';
import BlogCard from './BlogCard';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const getBlogData = (language) => {
  const blogs = {
    VN: [
      {
        id: 1,
        blogThumb: blogThumb,
        blogThumbTitle: 'Công nghệ',
        blogDateIcon: <FaCircle />,
        blogDate: '04 Th3, 2025',
        blogUrl: 'https://www.facebook.com/permalink.php?story_fbid=pfbid02f8HJnrt2pYeyymHTpwwLgCeoruUfTg23Minx54XmdG3BjDG5G9FWmDbSivmyhAH1l&id=61581551666794',
        blogTitle: 'Diễn Đàn Đổi Mới Sáng Tạo Năng Lượng',
        blogDesc:
          'Tham dự gặp gỡ các ban lãnh đạo cấp cao, tìm hiểu về quy trình chuyển đổi công nghệ mới vào trong nguồn năng lượng hẳng ngày.',
        isExternal: true,
      },
      {
        id: 2,
        blogThumb: blogThumb2,
        blogThumbTitle: 'Công nghệ',
        blogDateIcon: <FaCircle />,
        blogDate: '14 Th3, 2025',
        blogUrl: 'https://www.facebook.com/permalink.php?story_fbid=pfbid033AUea7wNJDD32K3B7n3HK1wK58Mmn5s3BX63aRWw8TuQE1pTcd1T66AdBRph7nZ2l&id=61581551666794',
        blogTitle: 'Giải Pháp Hệ Thống Camera Giám Sát Tích Hợp AI',
        blogDesc:
          'Cung cấp giải pháp thông minh dành cho doanh nghiệp, mang đến giá trị to lớn cho khách hàng',
        isExternal: true,
      },
      {
        id: 3,
        blogThumb: blogThumb3,
        blogThumbTitle: 'Công nghệ',
        blogDateIcon: <FaCircle />,
        blogDate: '24 Th3, 2025',
        blogUrl: 'https://www.facebook.com/permalink.php?story_fbid=pfbid06JXqDBEtuvNJvM5NfCtjihEN3CxH7bsbUrrHB95Shpm5g9dMeSiNgASRpoDLJxyWl&id=61581551666794',
        blogTitle: 'Giải pháp Tiết Kiệm Năng Lượng Điện Tích Hợp AI',
        blogDesc:
          'Giúp doanh nghiệp của bạn giảm chi phí tiền điện hằng tháng lên đến con số 10 - 15% sự lựa chọn thông minh...',
        isExternal: true,
      },
    ],
    EN: [
      {
        id: 1,
        blogThumb: blogThumb,
        blogThumbTitle: 'Technology',
        blogDateIcon: <FaCircle />,
        blogDate: 'Mar 04, 2025',
        blogUrl: 'https://www.facebook.com/permalink.php?story_fbid=pfbid02f8HJnrt2pYeyymHTpwwLgCeoruUfTg23Minx54XmdG3BjDG5G9FWmDbSivmyhAH1l&id=61581551666794',
        blogTitle: 'Energy Innovation Forum',
        blogDesc:
          'Attended meetings with senior leadership, learning about the process of integrating new technology into daily energy sources.',
        isExternal: true,
      },
      {
        id: 2,
        blogThumb: blogThumb2,
        blogThumbTitle: 'Technology',
        blogDateIcon: <FaCircle />,
        blogDate: 'Mar 14, 2025',
        blogUrl: 'https://www.facebook.com/permalink.php?story_fbid=pfbid033AUea7wNJDD32K3B7n3HK1wK58Mmn5s3BX63aRWw8TuQE1pTcd1T66AdBRph7nZ2l&id=61581551666794',
        blogTitle: 'AI-Integrated Camera Surveillance System Solution',
        blogDesc:
          'Providing smart solutions for businesses, bringing great value to customers',
        isExternal: true,
      },
      {
        id: 3,
        blogThumb: blogThumb3,
        blogThumbTitle: 'Technology',
        blogDateIcon: <FaCircle />,
        blogDate: 'Mar 24, 2025',
        blogUrl: 'https://www.facebook.com/permalink.php?story_fbid=pfbid06JXqDBEtuvNJvM5NfCtjihEN3CxH7bsbUrrHB95Shpm5g9dMeSiNgASRpoDLJxyWl&id=61581551666794',
        blogTitle: 'AI-Integrated Energy Saving Solution',
        blogDesc:
          'Help your business reduce monthly electricity costs by up to 10 - 15%, a smart choice...',
        isExternal: true,
      },
    ],
  };
  return blogs[language] || blogs.VN;
};

const Blog = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const blogData = getBlogData(currentLanguage);

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
              {blogData.map(
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

          {/* Desktop Grid */}
          <div className='hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
            {blogData.map(
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
              }, index) => {
                return (
                  <div
                    key={id}
                    data-aos='fade-up'
                    data-aos-duration='800'
                    data-aos-delay={200 + (index * 100)}
                  >
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
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
