import 'dotenv/config';
import mongoose from 'mongoose';
import { Blog } from '../models/blog.model.js';

/**
 * Seed 4 initial blogs currently shown on the public site
 * - Upserts by external_url to avoid duplicates
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
      title_vn: 'Mở Ra Kỷ Nguyên Mới Trong Lĩnh Vực Năng Lượng',
      title_en: 'Open a New Era In The Energy Sector',
      description_vn: '',
      description_en: '',
      category_vn: 'Công Nghệ',
      category_en: 'Technology',
      thumbnail: '/images/blog/blog1.jpg',
      published_date: new Date('2025-03-04T00:00:00.000Z'),
      external_url: 'https://www.facebook.com/share/p/1FTQYGGXjg/',
      is_external: true,
      is_published: true,
    },
    {
      title_vn: 'Giải Pháp Hệ Thống Camera Giám Sát Tích Hợp AI',
      title_en: 'AI-Integrated Camera Surveillance System Solution',
      description_vn: '',
      description_en: '',
      category_vn: 'Công Nghệ',
      category_en: 'Technology',
      thumbnail: '/images/blog/blog2.jpg',
      published_date: new Date('2025-03-14T00:00:00.000Z'),
      external_url: 'https://www.facebook.com/share/p/16ND4mHNLF/',
      is_external: true,
      is_published: true,
    },
    {
      title_vn: 'Giải pháp Tiết Kiệm Năng Lượng Điện Tích Hợp AI',
      title_en: 'AI-Integrated Energy Saving Solution',
      description_vn: '',
      description_en: '',
      category_vn: 'Công Nghệ',
      category_en: 'Technology',
      thumbnail: '/images/blog/blog3.jpg',
      published_date: new Date('2025-03-24T00:00:00.000Z'),
      external_url: 'https://www.facebook.com/share/p/17KtKvn3o1/',
      is_external: true,
      is_published: true,
    },
    {
      title_vn: 'Bảo mật thanh toán trong thời đại số',
      title_en: 'Payment Security in the Digital Age',
      description_vn: '',
      description_en: '',
      category_vn: 'Công Nghệ',
      category_en: 'Technology',
      thumbnail: '/images/blog/blog4.jpg',
      published_date: new Date('2025-05-17T00:00:00.000Z'),
      external_url: 'https://www.facebook.com/share/p/1B9ASGzcbE/',
      is_external: true,
      is_published: true,
    },
  ];

  for (const item of items) {
    const updated = await Blog.findOneAndUpdate(
      { external_url: item.external_url },
      { $set: item },
      { new: true, upsert: true }
    );
    console.log('Upserted:', updated.title_vn || updated.title_en, updated._id.toString());
  }

  await mongoose.disconnect();
  console.log('Seed completed.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});