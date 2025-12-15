import 'dotenv/config';
import mongoose from 'mongoose';
import { Product } from '../models/product.model.js';

type SeedItem = {
  id: number;
  name_vn: string;
  name_en: string;
  image: string;
  price: string;
  features: string[];
  // Optional bilingual features used during upsert
  features_vn?: string[];
  features_en?: string[];
  category: 'hardware' | 'software';
  is_published: boolean;
};

async function run() {
  const mongoUrl = process.env.DATABASE_MONGO_URL;
  if (!mongoUrl) {
    console.error('DATABASE_MONGO_URL is missing in environment.');
    process.exit(1);
  }

  await mongoose.connect(mongoUrl);
  console.log('Connected to MongoDB');

  // VN data
  const vnHardware = [
    { id: 1, name: 'Thiết bị đọc Căn Cước Công Dân', image: '/images/products/mayquetcccd.png', price: '15.000.000 VNĐ', features: [
      'Thiết bị đọc chip trên thẻ CCCD',
      'Hỗ trợ: Windows / Linux / Android',
      'Nguồn điện: Cấp qua cổng USB',
      'Có thể kết nối với các thiết bị khác thông qua USB',
      'Mắt đọc: Hỗ trợ quét mã QR nhanh, chính xác',
      'Tín hiệu nhận biết: Đèn báo trạng thái - có âm thanh',
      'Chức năng chính: Đọc thông tin Căn cước, Họ và tên, Ảnh, vân tay'
    ] },
    { id: 2, name: 'Máy giao dịch thanh toán tự động', image: '/images/products/kiot1.png', price: '100.000.000 VND', features: [
      'Vỏ máy',
      '2 màn hình Dell 21 inch',
      'Máy cảm biến mệnh giá tiền giấy VND',
      'Đầu đọc thẻ NFC',
      'Máy POS',
      'Máy in'
    ] },
    { id: 3, name: 'Máy giao dịch thanh toán tự động (32 inch)', image: '/images/products/kiot2.png', price: '80.000.000 VND', features: [
      'Vỏ máy',
      'Màn hình 32 inch',
      'Đầu đọc thẻ NFC',
      'Máy POS',
      'Máy in'
    ] },
    { id: 4, name: 'Máy thu ngân', image: '/images/products/maythungan.png', price: '50.000.000 VND', features: [
      'Vỏ máy thu ngân',
      'Máy cảm biến mệnh giá tiền giấy VND',
      'Màn hình hiển thị LCD 320x240',
      'Bàn phím số'
    ] },
    { id: 5, name: 'Thiết bị nhận tiền mặt', image: '/images/products/payout.png', price: 'Liên hệ', features: [
      'Nhận mệnh giá từ 1.000VND-500.000VND',
      'Hỗ trợ trả lại tiền thừa/không hỗ trợ trả lại tiền thừa',
      'Sức chứa lên đến 1000 tờ'
    ] },
    { id: 6, name: 'Thiết bị điểm danh', image: '/images/products/diemdanh1.jpg', price: 'Liên hệ', features: [
      'Màn hình hiển thị thông báo điểm danh',
      'Thiết bị âm thanh',
      'Đọc thẻ nhanh'
    ] },
    { id: 7, name: 'Thiết bị cân điện tử', image: '/images/products/candientu1.jpg', price: 'Liên hệ', features: [
      'Giao diện điều khiển HMI (trên máy cân).',
      'Phần cứng kết nối IOT',
      'Nền tảng giám sát từ xa'
    ] },
  ];

  const vnSoftware = [
    { id: 1, name: 'Thiết Kế Phần Mềm', image: '/images/products/soft.jpg', price: 'Liên hệ', features: [
      'Các app giao dịch.',
      'Các web giao dịch.',
      'Các phần mềm bán vé cho các hãng vận tải hành khách.',
      'Các phần mềm giao dịch thanh toán và quản lý tập chung cho các khu vui chơi giải trí.',
    ] },
  ];

  // EN data (names only)
  const enHardwareNames: Record<number, string> = {
    1: 'Citizen ID Card Reader',
    2: 'Automatic Payment Kiosk',
    3: 'Automatic Payment Kiosk (32 inch)',
    4: 'Cash Register Machine',
    5: 'Cash Payout Device',
    6: 'Attendance Device',
    7: 'Remote Monitoring Electronic Scale System',
  };
  const enSoftwareNames: Record<number, string> = {
    1: 'Software Development',
  };

  // EN features translations (approximate)
  const enHardwareFeatures: Record<number, string[]> = {
    1: [
      'Chip reader for Citizen ID card',
      'Supports: Windows / Linux / Android',
      'Power: via USB port',
      'Connects to other devices via USB',
      'Scanner: Fast, accurate QR code',
      'Indicators: Status LED and sound',
      'Main function: Read ID info, name, photo, fingerprint',
    ],
    2: [
      'Chassis',
      'Two Dell 21-inch screens',
      'VND banknote denomination sensor',
      'NFC card reader',
      'POS terminal',
      'Printer',
    ],
    3: [
      'Chassis',
      '32-inch screen',
      'NFC card reader',
      'POS terminal',
      'Printer',
    ],
    4: [
      'Cash register chassis',
      'VND banknote denomination sensor',
      'LCD 320x240 display',
      'Numeric keypad',
    ],
    5: [
      'Accepts denominations from 1,000 VND to 500,000 VND',
      'Supports change payout / no change payout',
      'Capacity up to 1000 notes',
    ],
    6: [
      'Display screen for attendance notifications',
      'Audio device',
      'Fast card reading',
    ],
    7: [
      'HMI control interface (on the scale)',
      'IoT hardware connectivity',
      'Remote monitoring platform',
    ],
  };
  const enSoftwareFeatures: Record<number, string[]> = {
    1: [
      'Transaction apps',
      'Transaction websites',
      'Ticketing software for passenger transport companies',
      'Payment transaction and centralized management software for amusement parks',
    ],
  };

  const items: SeedItem[] = [
    ...vnHardware.map(p => ({
      id: p.id,
      name_vn: p.name,
      name_en: enHardwareNames[p.id] || p.name,
      image: p.image,
      price: p.price,
      features: p.features,
      // bilingual features
      features_vn: p.features,
      features_en: enHardwareFeatures[p.id] || p.features,
      category: 'hardware' as const,
      is_published: true,
    })),
    ...vnSoftware.map(p => ({
      id: p.id,
      name_vn: p.name,
      name_en: enSoftwareNames[p.id] || p.name,
      image: p.image,
      price: p.price,
      features: p.features,
      features_vn: p.features,
      features_en: enSoftwareFeatures[p.id] || p.features,
      category: 'software' as const,
      is_published: true,
    })),
  ];

  for (const item of items) {
    const updated = await Product.findOneAndUpdate(
      { image: item.image, category: item.category },
      { $set: item as any },
      { new: true, upsert: true }
    );
    console.log('Upserted:', (updated.name_vn || updated.name_en), updated.category, updated._id.toString());
  }

  await mongoose.disconnect();
  console.log('Seed products completed.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
