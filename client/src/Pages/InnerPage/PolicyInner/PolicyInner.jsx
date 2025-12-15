import { FaArrowRightLong } from 'react-icons/fa6';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getTranslation } from '../../../utils/translations';
import { useEffect, useMemo, useState } from 'react';
import { getPublicPolicies } from '../../../api/api';
import { socket } from '../../../api/socket';

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
  const fallback = getPolicyData(currentLanguage);

  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizePolicies = (data) => {
    return (data || [])
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
      .map((p) => ({
        slug: p.slug,
        title: currentLanguage === 'EN' ? (p.title_en || p.title_vn) : (p.title_vn || p.title_en),
        description: currentLanguage === 'EN' ? (p.description_en || p.description_vn) : (p.description_vn || p.description_en),
        points: currentLanguage === 'EN' ? (p.points_en || p.points_vn || []) : (p.points_vn || p.points_en || []),
      }));
  };

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const res = await getPublicPolicies();
      const data = res?.data?.policies || res?.data?.data || [];
      const normalized = normalizePolicies(data);
      if (normalized.length > 0) setItems(normalized);
    } catch (e) {
      // swallow
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, [currentLanguage]);

  // Realtime updates via Socket.IO
  useEffect(() => {
    const onChange = (payload) => {
      // For simplicity, refetch to ensure language-specific fields are applied
      fetchPolicies();
    };
    socket.on('policies.changed', onChange);
    return () => {
      socket.off('policies.changed', onChange);
    };
  }, []);

  const uiItems = useMemo(() => {
    if (items && items.length > 0) return items;
    // Fallback: convert static object to array in desired order
    return [
      { slug: 'warranty', title: fallback.warranty.title, description: fallback.warranty.description, points: fallback.warranty.points },
      { slug: 'return', title: fallback.return.title, description: fallback.return.description, points: fallback.return.points },
      { slug: 'shipping', title: fallback.shipping.title, description: fallback.shipping.description, points: fallback.shipping.points },
      { slug: 'payment', title: fallback.payment.title, description: fallback.payment.description, points: fallback.payment.points },
    ];
  }, [items, fallback]);

  // Pagination (max 4 policies per page)
  const PAGE_SIZE = 4;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil((uiItems?.length || 0) / PAGE_SIZE));
  useEffect(() => {
    // Reset or clamp page when items or language change
    if (page > totalPages) setPage(1);
  }, [uiItems, totalPages]);
  const pageItems = (loading ? [] : uiItems).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
              {fallback.pageTitle}
            </h1>
            <p
              className='font-FiraSans text-TextColor2-0 text-lg max-w-3xl mx-auto'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='100'
            >
              {fallback.pageDescription}
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch'>
            {pageItems.map((item, idx) => (
              <div
                key={item.slug || idx}
                className='bg-white rounded-2xl p-8 shadow-lg flex flex-col h-full'
                data-aos='fade-up'
                data-aos-duration='800'
                data-aos-delay={`${200 + idx*100}`}
              >
                <h3 className='font-FiraSans font-semibold text-2xl text-HeadingColor-0 mb-4'>
                  {item.title}
                </h3>
                <p className='font-FiraSans text-TextColor2-0 mb-4'>
                  {item.description}
                </p>
                <ul className='space-y-2 flex-grow'>
                  {(item.points || []).map((point, index) => (
                    <li key={index} className='font-FiraSans text-TextColor2-0 flex items-start gap-2'>
                      <span className='text-PrimaryColor-0 mt-1 flex-shrink-0'>•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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

export default PolicyInner;
