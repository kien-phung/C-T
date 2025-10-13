import { FaArrowRightLong } from 'react-icons/fa6';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';

const PolicyInner = () => {
  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Chính Sách'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Chính Sách'}
        bgImage={'/images/solutions/policy.jpg'}
      />
      <section className='py-[120px] bg-BodyBg4-0'>
        <div className='Container'>
          <div className='text-center mb-16'>
            <h1 className='font-FiraSans font-semibold text-4xl sm:text-5xl text-HeadingColor-0 mb-6'>
              Chính Sách Của Chúng Tôi
            </h1>
            <p className='font-FiraSans text-TextColor2-0 text-lg max-w-3xl mx-auto'>
              Tất cả các chính sách và quy định về sản phẩm, dịch vụ của công ty.
            </p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-white rounded-2xl p-8 shadow-lg'>
              <h3 className='font-FiraSans font-semibold text-2xl text-HeadingColor-0 mb-4'>
                Chính Sách Bảo Hành
              </h3>
              <p className='font-FiraSans text-TextColor2-0 mb-4'>
                Tất cả sản phẩm của chúng tôi đều được bảo hành từ 12-24 tháng tùy theo từng loại sản phẩm.
              </p>
              <ul className='space-y-2'>
                <li className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                  <span className='text-PrimaryColor-0 mt-1'>•</span>
                  Bảo hành miễn phí trong thời gian quy định
                </li>
                <li className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                  <span className='text-PrimaryColor-0 mt-1'>•</span>
                  Hỗ trợ kỹ thuật 24/7
                </li>
                <li className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                  <span className='text-PrimaryColor-0 mt-1'>•</span>
                  Thay thế sản phẩm nếu không sửa được
                </li>
              </ul>
            </div>
            
            <div className='bg-white rounded-2xl p-8 shadow-lg'>
              <h3 className='font-FiraSans font-semibold text-2xl text-HeadingColor-0 mb-4'>
                Chính Sách Đổi Trả
              </h3>
              <p className='font-FiraSans text-TextColor2-0 mb-4'>
                Chúng tôi hỗ trợ đổi trả sản phẩm trong vòng 7 ngày nếu có lỗi từ nhà sản xuất.
              </p>
              <ul className='space-y-2'>
                <li className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                  <span className='text-PrimaryColor-0 mt-1'>•</span>
                  Sản phẩm còn nguyên seal, chưa sử dụng
                </li>
                <li className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                  <span className='text-PrimaryColor-0 mt-1'>•</span>
                  Có hóa đơn mua hàng
                </li>
                <li className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                  <span className='text-PrimaryColor-0 mt-1'>•</span>
                  Hoàn tiền 100% nếu lỗi từ nhà sản xuất
                </li>
              </ul>
            </div>
            
            <div className='bg-white rounded-2xl p-8 shadow-lg'>
              <h3 className='font-FiraSans font-semibold text-2xl text-HeadingColor-0 mb-4'>
                Chính Sách Vận Chuyển
              </h3>
              <p className='font-FiraSans text-TextColor2-0 mb-4'>
                Giao hàng toàn quốc với nhiều hình thức vận chuyển khác nhau.
              </p>
              <ul className='space-y-2'>
                <li className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                  <span className='text-PrimaryColor-0 mt-1'>•</span>
                  Miễn phí giao hàng nội thành TPHCM
                </li>
                <li className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                  <span className='text-PrimaryColor-0 mt-1'>•</span>
                  Giao hàng trong 1-3 ngày làm việc
                </li>
                <li className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                  <span className='text-PrimaryColor-0 mt-1'>•</span>
                  Hỗ trợ lắp đặt tại nhà
                </li>
              </ul>
            </div>
            
            <div className='bg-white rounded-2xl p-8 shadow-lg'>
              <h3 className='font-FiraSans font-semibold text-2xl text-HeadingColor-0 mb-4'>
                Chính Sách Thanh Toán
              </h3>
              <p className='font-FiraSans text-TextColor2-0 mb-4'>
                Chúng tôi hỗ trợ nhiều hình thức thanh toán linh hoạt.
              </p>
              <ul className='space-y-2'>
                <li className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                  <span className='text-PrimaryColor-0 mt-1'>•</span>
                  Thanh toán tiền mặt khi nhận hàng
                </li>
                <li className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                  <span className='text-PrimaryColor-0 mt-1'>•</span>
                  Chuyển khoản ngân hàng
                </li>
                <li className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                  <span className='text-PrimaryColor-0 mt-1'>•</span>
                  Trả góp qua thẻ tín dụng
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PolicyInner;