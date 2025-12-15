import 'dotenv/config';
import mongoose from 'mongoose';
import { Solution } from '../models/solution.model.js';

/**
 * Seed 10 initial solutions currently shown on the site
 * - Upserts by slug to avoid duplicates
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
      slug: 'khu-vui-choi-giai-tri',
      title_vn: 'Khu vui chơi giải trí',
      title_en: 'Amusement Park',
      description_vn: 'Giải pháp thanh toán tự động cho khu vui chơi giải trí.',
      description_en: 'Automated payment solution for amusement parks.',
      image: '/images/solutions/giaitri.jpg',
      is_published: true,
      display_order: 1,
    },
    {
      slug: 'can-tin-hoc-duong',
      title_vn: 'Căn tin học đường',
      title_en: 'School Canteen',
      description_vn: 'Thanh toán không tiếp xúc cho căn tin trường học.',
      description_en: 'Contactless payment for school canteens.',
      image: '/images/solutions/cantin.jpg',
      is_published: true,
      display_order: 2,
    },
    {
      slug: 'thu-tien-tu-dong',
      title_vn: 'Thu tiền tự động',
      title_en: 'Automated Cashier',
      description_vn: 'Máy thu tiền tự động cho cửa hàng bán lẻ.',
      description_en: 'Automated cash handling for retail stores.',
      image: '/images/solutions/thutien.jpg',
      is_published: true,
      display_order: 3,
    },
    {
      slug: 'ben-xe-van-tai',
      title_vn: 'Bến xe, hãng vận tải hành khách',
      title_en: 'Bus Station & Transport',
      description_vn: 'Hệ thống bán vé tự động và quản lý lịch trình cho bến xe.',
      description_en: 'Automatic ticketing and schedule management for bus stations.',
      image: '/images/solutions/benxe.jpg',
      is_published: true,
      display_order: 4,
    },
    {
      slug: 'website-ban-hang',
      title_vn: 'Website bán hàng',
      title_en: 'E-commerce Website',
      description_vn: 'Thiết kế website bán hàng chuyên nghiệp, tích hợp thanh toán online.',
      description_en: 'Professional e-commerce website with online payment integration.',
      image: '/images/solutions/banhang.png',
      is_published: true,
      display_order: 5,
    },
    {
      slug: 'cong-tu-dong',
      title_vn: 'Cổng tự động',
      title_en: 'Automatic Gate',
      description_vn: 'Kiểm soát ra vào với nhận diện biển số và barrier tự động.',
      description_en: 'Access control with license plate recognition and auto barrier.',
      image: '/images/solutions/tudong.jpg',
      is_published: true,
      display_order: 6,
    },
    {
      slug: 'camera-ai',
      title_vn: 'Camera Giám Sát Tích Hợp AI',
      title_en: 'AI-powered Surveillance Camera',
      description_vn: 'Giám sát thông minh, phát hiện hành vi bất thường, cảnh báo xâm nhập.',
      description_en: 'Smart surveillance with AI behavior detection and intrusion alerts.',
      image: '/images/solutions/camera1.jpg',
      is_published: true,
      display_order: 7,
    },
    {
      slug: 'tiet-kiem-dien',
      title_vn: 'Hệ Thống Tiết Kiệm Năng Lượng Điện Tích Hợp AI',
      title_en: 'AI Energy Saving System',
      description_vn: 'Dự đoán và tối ưu hóa tiêu thụ điện, tiết kiệm 10-15% chi phí.',
      description_en: 'Predict and optimize power usage, save 10-15% costs.',
      image: '/images/solutions/dien1.jpg',
      is_published: true,
      display_order: 8,
    },
    {
      slug: 'thiet-bi-doc-cccd',
      title_vn: 'Giải pháp thiết bị đọc CCCD',
      title_en: 'ID Card Reader Solution',
      description_vn: 'Thiết bị đọc CCCD tự động, xác thực nhanh và lưu trữ an toàn.',
      description_en: 'Automated ID card reader with fast verification and secure storage.',
      image: '/images/solutions/cccd.jpg',
      is_published: true,
      display_order: 9,
    },
    {
      slug: 'can-dinh-luong-nha-may',
      title_vn: 'Giải pháp Cân định lượng dành cho nhà máy',
      title_en: 'Factory Dosing Scale Solution',
      description_vn: 'Tính toán chính xác theo công thức, giám sát từ xa thời gian thực.',
      description_en: 'Accurate formula-based dosing with real-time remote monitoring.',
      image: '/images/solutions/dien2.jpg',
      is_published: true,
      display_order: 10,
    },
  ];

  for (const item of items) {
    const updated = await Solution.findOneAndUpdate(
      { slug: item.slug },
      { $set: item },
      { new: true, upsert: true }
    );
    console.log('Upserted:', (updated.title_vn || updated.title_en), updated.slug, updated._id.toString());
  }

  await mongoose.disconnect();
  console.log('Seed solutions completed.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});