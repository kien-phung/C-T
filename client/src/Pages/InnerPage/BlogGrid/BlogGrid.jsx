import { FaArrowRightLong, FaCircle } from 'react-icons/fa6';
import blogGridThumb from '/images/blog/blog1.jpg';
import blogGridThumb2 from '/images/blog/blog2.jpg';
import blogGridThumb3 from '/images/blog/blog3.jpg';
import blogGridThumb4 from '/images/blog/blog4.jpg';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import BlogGridCard from './BlogGridCard';
import { BsArrowRight } from 'react-icons/bs';

const BlogData = [
  {
    id: 1,
    blogGridThumb: blogGridThumb,
    blogGridDateIcon: <FaCircle />,
    blogGridDate: '04 Th3, 2025',
    blogGridPostBy: 'CÔNG NGHỆ',
    blogGridUrl: 'https://www.facebook.com/share/p/1FTQYGGXjg/',
    blogGridTitle: 'Diễn Đàn Đổi Mới Sáng Tạo Năng Lượng',
    blogGridBtn: 'Xem Thêm',
    blogGridBtnIcon: <BsArrowRight />,
  },
  {
    id: 2,
    blogGridThumb: blogGridThumb2,
    blogGridDateIcon: <FaCircle />,
    blogGridDate: '14 Th3, 2025',
    blogGridPostBy: 'Công Nghệ',
    blogGridUrl: 'https://www.facebook.com/share/p/16ND4mHNLF/',
    blogGridTitle: 'Giải Pháp Hệ Thống Camera Giám Sát Tích Hợp AI',
    blogGridBtn: 'Xem Thêm',
    blogGridBtnIcon: <BsArrowRight />,
  },
  {
    id: 3,
    blogGridThumb: blogGridThumb3,
    blogGridDate: '24 Th3, 2025',
    blogGridDateIcon: <FaCircle />,
    blogGridPostBy: 'Công Nghệ',
    blogGridUrl: 'https://www.facebook.com/share/p/17KtKvn3o1/',
    blogGridTitle: 'Giải pháp Tiết Kiệm Năng Lượng Điện Tích Hợp AI',
    blogGridBtn: 'Xem Thêm',
    blogGridBtnIcon: <BsArrowRight />,
  },
  {
    id: 4,
    blogGridThumb: blogGridThumb4,
    blogGridDate: '17 Th5, 2025',
    blogGridDateIcon: <FaCircle />,
    blogGridPostBy: 'Công Nghệ',
    blogGridUrl: 'https://www.facebook.com/share/p/1B9ASGzcbE/',
    blogGridTitle: 'Bảo mật thanh toán trong thời đại số',
    blogGridBtn: 'Xem Thêm',
    blogGridBtnIcon: <BsArrowRight />,
  },
];

const BlogGrid = () => {
  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Tin Tức'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Tin Tức'}
        bgImage={'/images/solutions/blog1.jpg'}
      />
      <section className='pt-28 pb-28'>
        <div className='Container'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
            {BlogData.slice(0, 3).map(
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
              }) => {
                return (
                  <div key={id}>
                    <BlogGridCard
                      blogGridThumb={blogGridThumb}
                      blogGridDateIcon={blogGridDateIcon}
                      blogGridDate={blogGridDate}
                      blogGridPostBy={blogGridPostBy}
                      blogGridUrl={blogGridUrl}
                      blogGridTitle={blogGridTitle}
                      blogGridBtn={blogGridBtn}
                      blogGridBtnIcon={blogGridBtnIcon}
                    />
                  </div>
                );
              }
            )}
          </div>
          <div className='flex justify-center mt-7'>
            <div className='w-full md:w-1/2 lg:w-1/3'>
              {BlogData.slice(3, 4).map(
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
                }) => {
                  return (
                    <div key={id}>
                      <BlogGridCard
                        blogGridThumb={blogGridThumb}
                        blogGridDateIcon={blogGridDateIcon}
                        blogGridDate={blogGridDate}
                        blogGridPostBy={blogGridPostBy}
                        blogGridUrl={blogGridUrl}
                        blogGridTitle={blogGridTitle}
                        blogGridBtn={blogGridBtn}
                        blogGridBtnIcon={blogGridBtnIcon}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogGrid;
