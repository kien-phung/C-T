import 'dotenv/config';
import mongoose from 'mongoose';
import { Policy } from '../models/policy.model.js';

/**
 * Seed 4 policies shown on Policy page
 */
async function run() {
  const mongoUrl = process.env.DATABASE_MONGO_URL;
  if (!mongoUrl) {
    console.error('DATABASE_MONGO_URL is missing in environment.');
    process.exit(1);
  }

  await mongoose.connect(mongoUrl);
  console.log('Connected to MongoDB');

  const items = [
    {
      slug: 'warranty',
      title_vn: 'Chính Sách Bảo Hành',
      title_en: 'Warranty Policy',
      description_vn: 'Tất cả sản phẩm của chúng tôi đều được bảo hành từ 12-24 tháng tùy theo từng loại sản phẩm.',
      description_en: 'All our products are covered by a 12-24 month warranty depending on the product type.',
      points_vn: ['Bảo hành miễn phí trong thời gian quy định','Hỗ trợ kỹ thuật 24/7','Thay thế sản phẩm nếu không sửa được'],
      points_en: ['Free warranty during the specified period','24/7 technical support','Product replacement if unrepairable'],
      is_published: true,
      display_order: 1,
    },
    {
      slug: 'return',
      title_vn: 'Chính Sách Đổi Trả',
      title_en: 'Return & Exchange Policy',
      description_vn: 'Chúng tôi hỗ trợ đổi trả sản phẩm trong vòng 7 ngày nếu có lỗi từ nhà sản xuất.',
      description_en: 'We support product returns within 7 days if there are manufacturer defects.',
      points_vn: ['Sản phẩm còn nguyên seal, chưa sử dụng','Có hóa đơn mua hàng','Hoàn tiền 100% nếu lỗi từ nhà sản xuất'],
      points_en: ['Product must be sealed and unused','Original purchase invoice required','100% refund if manufacturer defect'],
      is_published: true,
      display_order: 2,
    },
    {
      slug: 'shipping',
      title_vn: 'Chính Sách Vận Chuyển',
      title_en: 'Shipping Policy',
      description_vn: 'Giao hàng toàn quốc với nhiều hình thức vận chuyển khác nhau.',
      description_en: 'Nationwide delivery with various shipping options.',
      points_vn: ['Miễn phí giao hàng nội thành TPHCM','Giao hàng trong 1-3 ngày làm việc','Hỗ trợ lắp đặt tại nhà'],
      points_en: ['Free shipping within HCMC','Delivery in 1-3 business days','Home installation support'],
      is_published: true,
      display_order: 3,
    },
    {
      slug: 'payment',
      title_vn: 'Chính Sách Thanh Toán',
      title_en: 'Payment Policy',
      description_vn: 'Chúng tôi hỗ trợ nhiều hình thức thanh toán linh hoạt.',
      description_en: 'We support multiple flexible payment methods.',
      points_vn: ['Thanh toán tiền mặt khi nhận hàng','Chuyển khoản ngân hàng','Trả góp qua thẻ tín dụng'],
      points_en: ['Cash on delivery','Bank transfer','Credit card installment'],
      is_published: true,
      display_order: 4,
    },
  ];

  for (const item of items) {
    const updated = await Policy.findOneAndUpdate(
      { slug: item.slug },
      { $set: item },
      { new: true, upsert: true }
    );
    console.log('Upserted:', updated.slug, updated._id.toString());
  }

  await mongoose.disconnect();
  console.log('Seed policies completed.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});