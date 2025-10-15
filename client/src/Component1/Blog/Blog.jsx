import { FaCircle } from 'react-icons/fa6';
import blogThumb from '/images/blog/blog1.jpg';
import blogThumb2 from '/images/blog/blog2.jpg';
import blogThumb3 from '/images/blog/blog3.jpg';
import border from '/images/hero_border.png';
import BlogCard from './BlogCard';


const blogData = [
  {
    id: 1,
    blogThumb: blogThumb,
    blogThumbTitle: 'Công nghệ',
    blogDateIcon: <FaCircle />,
    blogDate: '04 Th3, 2025',
    blogUrl: '/blog_details',
    blogTitle: 'Diễn Đàn Đổi Mới Sáng Tạo Năng Lượng',
    blogDesc:
      'Tham dự gặp gỡ các ban lãnh đạo cấp cao, tìm hiểu về quy trình chuyển đổi công nghệ mới vào trong nguồn năng lượng hẳng ngày.',
  },
  {
    id: 2,
    blogThumb: blogThumb2,
    blogThumbTitle: 'Công nghệ',
    blogDateIcon: <FaCircle />,
    blogDate: '14 Th3, 2025',
    blogUrl: '/blog_details',
    blogTitle: 'Giải Pháp Hệ Thống Camera Giám Sát Tích Hợp AI',
    blogDesc:
      'Cung cấp giải pháp thông minh dành cho doanh nghiệp, mang đến giá trị to lớn cho khách hàng',
  },
  {
    id: 3,
    blogThumb: blogThumb3,
    blogThumbTitle: 'Công nghệ',
    blogDateIcon: <FaCircle />,
    blogDate: '24 Th3, 2025',
    blogUrl: '/blog_details',
    blogTitle: 'Giải pháp Tiết Kiệm Năng Lượng Điện Tích Hợp AI',

    blogDesc:
      'Giúp doanh nghiệp của bạn giảm chi phí tiền điện hằng tháng lên đến con số 10 - 15% sự lựa chọn thông minh...',
  },
];

const Blog = () => {
  return (
    <section className='bg-[url(/images/blog3_bg.png)] bg-no-repeat bg-center bg-cover py-28'>
      <div className='Container'>
        <div className='text-center'>
          <h5 className='font-FiraSans font-medium text-sm sm:text-base text-PrimaryColor-0 uppercase mb-3'>
            TIN TỨC MỚI NHẤT
          </h5>
          <h1 className='font-FiraSans font-semibold text-HeadingColor-0 inline-block text-[16px] leading-[26px] sm:text-[25px] sm:leading-[35px] md:text-[30px] md:leading-[40px] lg:text-[34px] lg:leading-[44px] xl:text-[40px] xl:leading-[50px] 2xl:text-[42px] 2xl:leading-[52px] relative pb-4'>
            Cập Nhật Kiến Thức & Xu Hướng <br /> Công Nghệ Phát Triển
            <img
              src={border}
              draggable='false'
              className='absolute bottom-0 left-1/2 -translate-x-1/2'
            />
          </h1>
        </div>
        <div className='mt-[60px]'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
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
              }) => {
                return (
                  <div key={id}>
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
