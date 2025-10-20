import { FaArrowRightLong } from 'react-icons/fa6';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getTranslation } from '../../../utils/translations';

const getPolicyData = (language) => {
  const policies = {
    VN: {
      pageTitle: 'Chính Sách Của Chúng Tôi',
      pageDescription: 'Tất cả các chính sách và quy định về sản phẩm, dịch vụ của công ty.',
      warranty: {
        title: 'Chính Sách Bảo Hành',
        description: 'Tất cả sản phẩm của chúng tôi đều được bảo hành từ 12-24 tháng tùy theo từng loại sản phẩm.',
        points: [
          'Bảo hành miễn phí trong thời gian quy định',
          'Hỗ trợ kỹ thuật 24/7',
          'Thay thế sản phẩm nếu không sửa được'
        ]
      },
      return: {
        title: 'Chính Sách Đổi Trả',
        description: 'Chúng tôi hỗ trợ đổi trả sản phẩm trong vòng 7 ngày nếu có lỗi từ nhà sản xuất.',
        points: [
          'Sản phẩm còn nguyên seal, chưa sử dụng',
          'Có hóa đơn mua hàng',
          'Hoàn tiền 100% nếu lỗi từ nhà sản xuất'
        ]
      },
      shipping: {
        title: 'Chính Sách Vận Chuyển',
        description: 'Giao hàng toàn quốc với nhiều hình thức vận chuyển khác nhau.',
        points: [
          'Miễn phí giao hàng nội thành TPHCM',
          'Giao hàng trong 1-3 ngày làm việc',
          'Hỗ trợ lắp đặt tại nhà'
        ]
      },
      payment: {
        title: 'Chính Sách Thanh Toán',
        description: 'Chúng tôi hỗ trợ nhiều hình thức thanh toán linh hoạt.',
        points: [
          'Thanh toán tiền mặt khi nhận hàng',
          'Chuyển khoản ngân hàng',
          'Trả góp qua thẻ tín dụng'
        ]
      }
    },
    EN: {
      pageTitle: 'Our Policies',
      pageDescription: 'All policies and regulations regarding company products and services.',
      warranty: {
        title: 'Warranty Policy',
        description: 'All our products are covered by a 12-24 month warranty depending on the product type.',
        points: [
          'Free warranty during the specified period',
          '24/7 technical support',
          'Product replacement if unrepairable'
        ]
      },
      return: {
        title: 'Return & Exchange Policy',
        description: 'We support product returns within 7 days if there are manufacturer defects.',
        points: [
          'Product must be sealed and unused',
          'Original purchase invoice required',
          '100% refund if manufacturer defect'
        ]
      },
      shipping: {
        title: 'Shipping Policy',
        description: 'Nationwide delivery with various shipping options.',
        points: [
          'Free shipping within HCMC',
          'Delivery in 1-3 business days',
          'Home installation support'
        ]
      },
      payment: {
        title: 'Payment Policy',
        description: 'We support multiple flexible payment methods.',
        points: [
          'Cash on delivery',
          'Bank transfer',
          'Credit card installment'
        ]
      }
    }
  };
  return policies[language] || policies.VN;
};

const PolicyInner = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const policyData = getPolicyData(currentLanguage);

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={t('nav.policy')}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={t('nav.policy')}
        bgImage={'/images/solutions/policy.jpg'}
      />
      <section className='py-[120px] bg-BodyBg4-0'>
        <div className='Container'>
          <div className='text-center mb-16'>
            <h1
              className='font-FiraSans font-semibold text-4xl sm:text-5xl text-HeadingColor-0 mb-6'
              data-aos='fade-up'
              data-aos-duration='800'
            >
              {policyData.pageTitle}
            </h1>
            <p
              className='font-FiraSans text-TextColor2-0 text-lg max-w-3xl mx-auto'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='100'
            >
              {policyData.pageDescription}
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch'>
            {/* Warranty Policy */}
            <div
              className='bg-white rounded-2xl p-8 shadow-lg flex flex-col h-full'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='200'
            >
              <h3 className='font-FiraSans font-semibold text-2xl text-HeadingColor-0 mb-4'>
                {policyData.warranty.title}
              </h3>
              <p className='font-FiraSans text-TextColor2-0 mb-4'>
                {policyData.warranty.description}
              </p>
              <ul className='space-y-2 flex-grow'>
                {policyData.warranty.points.map((point, index) => (
                  <li key={index} className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                    <span className='text-PrimaryColor-0 mt-1 flex-shrink-0'>•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Return Policy */}
            <div
              className='bg-white rounded-2xl p-8 shadow-lg flex flex-col h-full'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='300'
            >
              <h3 className='font-FiraSans font-semibold text-2xl text-HeadingColor-0 mb-4'>
                {policyData.return.title}
              </h3>
              <p className='font-FiraSans text-TextColor2-0 mb-4'>
                {policyData.return.description}
              </p>
              <ul className='space-y-2 flex-grow'>
                {policyData.return.points.map((point, index) => (
                  <li key={index} className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                    <span className='text-PrimaryColor-0 mt-1 flex-shrink-0'>•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Policy */}
            <div
              className='bg-white rounded-2xl p-8 shadow-lg flex flex-col h-full'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='400'
            >
              <h3 className='font-FiraSans font-semibold text-2xl text-HeadingColor-0 mb-4'>
                {policyData.shipping.title}
              </h3>
              <p className='font-FiraSans text-TextColor2-0 mb-4'>
                {policyData.shipping.description}
              </p>
              <ul className='space-y-2 flex-grow'>
                {policyData.shipping.points.map((point, index) => (
                  <li key={index} className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                    <span className='text-PrimaryColor-0 mt-1 flex-shrink-0'>•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Policy */}
            <div
              className='bg-white rounded-2xl p-8 shadow-lg flex flex-col h-full'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='500'
            >
              <h3 className='font-FiraSans font-semibold text-2xl text-HeadingColor-0 mb-4'>
                {policyData.payment.title}
              </h3>
              <p className='font-FiraSans text-TextColor2-0 mb-4'>
                {policyData.payment.description}
              </p>
              <ul className='space-y-2 flex-grow'>
                {policyData.payment.points.map((point, index) => (
                  <li key={index} className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                    <span className='text-PrimaryColor-0 mt-1 flex-shrink-0'>•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PolicyInner;
