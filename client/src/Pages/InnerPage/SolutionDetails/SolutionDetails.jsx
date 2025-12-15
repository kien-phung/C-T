import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getTranslation } from '../../../utils/translations';
import { getPublicSolution } from '../../../api/api';
import { socket } from '../../../api/socket';

const getSolutionDetailsData = (language) => {
  const data = {
    VN: {
      'khu-vui-choi-giai-tri': {
        id: 1,
        title: 'Khu vui chơi giải trí',
        subtitle: 'Giải pháp thanh toán tự động cho khu vui chơi giải trí',
        image: '/images/solutions/giaitri.jpg',
        description: 'Ứng dụng được triển khai trên máy thanh toán tự động (Kiosk) đặt tại các khu vui chơi giải trí, điểm du lịch có lượng khách cao.',
        userRoles: [
          {
            title: 'Khách hàng',
            description: 'Tự mua vé và thanh toán',
            icon: '👥'
          },
          {
            title: 'Đại lý',
            description: 'Quản lý vé và doanh thu qua website',
            icon: '💼'
          },
          {
            title: 'Nhân viên doanh nghiệp',
            description: 'Quản trị hệ thống và cấu hình khuyến mãi',
            icon: '⚙️'
          }
        ],
        features: [
          'Hỗ trợ đa ngôn ngữ',
          'Thanh toán QR code (Sacombank, VNPay)',
          'Thanh toán thẻ',
          'In vé tự động',
          'Báo cáo doanh thu thời gian thực',
          'Quản lý khuyến mãi'
        ],
        benefits: [
          'Giảm thời gian chờ đợi của khách hàng',
          'Tối ưu hóa quy trình thanh toán',
          'Giảm chi phí nhân sự',
          'Tăng trải nghiệm khách hàng',
          'Quản lý tập trung hiệu quả'
        ]
      },
      'can-tin-hoc-duong': {
        id: 2,
        title: 'Căn tin học đường',
        subtitle: 'Giải pháp thanh toán không tiếp xúc cho căn tin trường học',
        image: '/images/solutions/cantin.jpg',
        description: 'Hệ thống thanh toán thông minh dành cho căn tin trường học, giúp học sinh thanh toán nhanh chóng và tiện lợi qua thẻ học sinh.',
        userRoles: [
          {
            title: 'Học sinh',
            description: 'Thanh toán bằng thẻ học sinh',
            icon: '🎓'
          },
          {
            title: 'Phụ huynh',
            description: 'Nạp tiền và theo dõi chi tiêu',
            icon: '👨‍👩‍👧'
          },
          {
            title: 'Nhà trường',
            description: 'Quản lý thực đơn và báo cáo',
            icon: '🏫'
          }
        ],
        features: [
          'Thanh toán không tiếp xúc bằng thẻ NFC',
          'Quản lý thực đơn theo ngày',
          'Nạp tiền online cho phụ huynh',
          'Báo cáo chi tiêu học sinh',
          'Cảnh báo dinh dưỡng',
          'Tích hợp ví điện tử'
        ],
        benefits: [
          'An toàn vệ sinh thực phẩm',
          'Giảm tiếp xúc tiền mặt',
          'Phụ huynh theo dõi được chi tiêu con',
          'Giảm thời gian xếp hàng',
          'Minh bạch trong quản lý'
        ]
      },
      'thu-tien-tu-dong': {
        id: 3,
        title: 'Thu tiền tự động',
        subtitle: 'Giải pháp thu tiền tự động cho cửa hàng bán lẻ',
        image: '/images/solutions/thutien.jpg',
        description: 'Máy thu tiền tự động có khả năng nhận diện tiền giấy VND, trả tiền thừa tự động và bảo mật cao, phù hợp cho các cửa hàng bán lẻ.',
        userRoles: [
          {
            title: 'Khách hàng',
            description: 'Thanh toán tiền mặt tự động',
            icon: '💰'
          },
          {
            title: 'Chủ cửa hàng',
            description: 'Theo dõi doanh thu và quản lý tiền',
            icon: '🏪'
          },
          {
            title: 'Nhân viên',
            description: 'Bổ sung tiền lẻ và bảo trì',
            icon: '👔'
          }
        ],
        features: [
          'Nhận diện mệnh giá tiền giấy VND',
          'Trả tiền thừa tự động',
          'Phát hiện tiền giả',
          'Sức chứa lên đến 1000 tờ',
          'Kết nối với hệ thống POS',
          'Báo cáo giao dịch chi tiết'
        ],
        benefits: [
          'Giảm rủi ro tiền giả',
          'Tăng tốc độ thanh toán',
          'Giảm sai sót trong tính toán',
          'Tiết kiệm nhân lực',
          'Bảo mật tiền mặt cao'
        ]
      },
      'ben-xe-van-tai': {
        id: 4,
        title: 'Bến xe, hãng vận tải hành khách',
        subtitle: 'Giải pháp bán vé và quản lý cho bến xe',
        image: '/images/solutions/benxe.jpg',
        description: 'Hệ thống bán vé tự động và quản lý lịch trình xe dành cho bến xe và hãng vận tải hành khách.',
        userRoles: [
          {
            title: 'Hành khách',
            description: 'Mua vé online hoặc tại kiosk',
            icon: '🧳'
          },
          {
            title: 'Hãng xe',
            description: 'Quản lý lịch trình và doanh thu',
            icon: '🚌'
          },
          {
            title: 'Bến xe',
            description: 'Quản lý tổng thể các hãng xe',
            icon: '🏢'
          }
        ],
        features: [
          'Bán vé online và offline',
          'Quản lý lịch trình xe',
          'Sơ đồ ghế động',
          'Thanh toán đa kênh',
          'Check-in điện tử',
          'SMS/Email thông báo'
        ],
        benefits: [
          'Tăng doanh thu qua kênh online',
          'Giảm chi phí bán vé',
          'Quản lý tập trung hiệu quả',
          'Trải nghiệm khách hàng tốt hơn',
          'Báo cáo thống kê chi tiết'
        ]
      },
      'website-ban-hang': {
        id: 5,
        title: 'Website bán hàng',
        subtitle: 'Giải pháp thương mại điện tử chuyên nghiệp',
        image: '/images/solutions/banhang.png',
        description: 'Thiết kế website bán hàng chuyên nghiệp với đầy đủ tính năng thương mại điện tử và tích hợp thanh toán online.',
        userRoles: [
          {
            title: 'Khách hàng',
            description: 'Mua sắm online tiện lợi',
            icon: '🛍️'
          },
          {
            title: 'Người bán',
            description: 'Quản lý sản phẩm và đơn hàng',
            icon: '📦'
          },
          {
            title: 'Admin',
            description: 'Quản trị website và marketing',
            icon: '💻'
          }
        ],
        features: [
          'Thiết kế responsive',
          'Tích hợp thanh toán online',
          'Quản lý sản phẩm',
          'Quản lý đơn hàng',
          'Marketing tự động',
          'SEO tối ưu'
        ],
        benefits: [
          'Mở rộng thị trường online',
          'Tăng doanh thu bán hàng',
          'Chi phí vận hành thấp',
          'Quản lý đơn giản',
          'Tích hợp đa kênh'
        ]
      },
      'cong-tu-dong': {
        id: 6,
        title: 'Cổng tự động',
        subtitle: 'Giải pháp kiểm soát ra vào tự động',
        image: '/images/solutions/tudong.jpg',
        description: 'Hệ thống cổng barrier tự động với nhận diện biển số xe và kiểm soát ra vào thông minh.',
        userRoles: [
          {
            title: 'Người dùng',
            description: 'Ra vào tự động qua nhận diện',
            icon: '🚗'
          },
          {
            title: 'Bảo vệ',
            description: 'Giám sát và kiểm soát',
            icon: '👮'
          },
          {
            title: 'Quản lý',
            description: 'Báo cáo và cấu hình hệ thống',
            icon: '⚙️'
          }
        ],
        features: [
          'Nhận diện biển số xe tự động',
          'Cổng barrier tự động',
          'Tích hợp camera an ninh',
          'Kiểm soát ra vào thông minh',
          'Báo cáo lịch sử ra vào',
          'Cảnh báo xe lạ'
        ],
        benefits: [
          'Tăng cường an ninh',
          'Giảm nhân lực bảo vệ',
          'Kiểm soát chặt chẽ',
          'Tiện lợi cho người dùng',
          'Lưu trữ dữ liệu đầy đủ'
        ]
      },
      'camera-ai': {
        id: 7,
        title: 'Camera Giám Sát Tích Hợp AI',
        subtitle: 'Giám sát thông minh với công nghệ AI',
        image: '/images/solutions/camera1.jpg',
        description: 'Hệ thống camera giám sát tích hợp trí tuệ nhân tạo, sử dụng công nghệ tiên tiến từ Đài Loan để phát hiện và phân tích hành vi.',
        userRoles: [
          {
            title: 'Bảo vệ',
            description: 'Giám sát thời gian thực',
            icon: '👁️'
          },
          {
            title: 'Quản lý',
            description: 'Xem báo cáo và cảnh báo',
            icon: '📊'
          },
          {
            title: 'Kỹ thuật',
            description: 'Cấu hình và bảo trì hệ thống',
            icon: '🔧'
          }
        ],
        features: [
          'AI nhận diện khuôn mặt',
          'Phát hiện hành vi bất thường',
          'Cảnh báo xâm nhập',
          'Lưu trữ video dài hạn',
          'Xem từ xa qua mobile',
          'Phân tích thống kê'
        ],
        benefits: [
          'Bảo mật cao với AI',
          'Cảnh báo nhanh chóng',
          'Giảm giám sát thủ công',
          'Phân tích chính xác',
          'Tích hợp đa hệ thống'
        ]
      },
      'tiet-kiem-dien': {
        id: 8,
        title: 'Hệ Thống Tiết Kiệm Năng Lượng Điện Tích Hợp AI',
        subtitle: 'Tiết kiệm điện thông minh với AI',
        image: '/images/solutions/dien1.jpg',
        description: 'Hệ thống sử dụng AI để dự đoán và tối ưu hóa mức tiêu thụ điện, giúp tiết kiệm chi phí 10-15%.',
        userRoles: [
          {
            title: 'Người dùng',
            description: 'Theo dõi tiêu thụ điện',
            icon: '⚡'
          },
          {
            title: 'Quản lý',
            description: 'Xem báo cáo và phân tích',
            icon: '📈'
          },
          {
            title: 'Kỹ thuật',
            description: 'Cấu hình tối ưu hóa',
            icon: '🔌'
          }
        ],
        features: [
          'Dự đoán tiêu thụ điện cao điểm',
          'Tối ưu hóa tự động',
          'Giám sát từ xa qua IoT',
          'Báo cáo chi tiết',
          'Cảnh báo tiêu thụ bất thường',
          'Tích hợp năng lượng tái tạo'
        ],
        benefits: [
          'Tiết kiệm 10-15% chi phí điện',
          'Giảm lãng phí năng lượng',
          'Bảo vệ môi trường',
          'Quản lý tập trung',
          'ROI cao'
        ]
      },
      'thiet-bi-doc-cccd': {
        id: 9,
        title: 'Giải pháp thiết bị đọc CCCD',
        subtitle: 'Sự lựa chọn thông minh tiết kiệm thời gian, chi phí và nhân lực',
        image: '/images/solutions/cccd.jpg',
        description: 'Thiết bị đọc CCCD hiện đại với công nghệ tiên tiến, giúp tự động hóa quy trình xác thực danh tính tại các địa điểm có lượng người đông như ngân hàng, bệnh viện, cơ quan nhà nước.',
        userRoles: [
          {
            title: 'Khách hàng',
            description: 'Tự thực hiện xác thực danh tính',
            icon: '👤'
          },
          {
            title: 'Nhân viên',
            description: 'Giám sát và hỗ trợ khách hàng',
            icon: '👨‍💼'
          },
          {
            title: 'Quản lý',
            description: 'Theo dõi báo cáo và thống kê',
            icon: '📊'
          }
        ],
        features: [
          'Đọc thẻ CCCD chip tự động',
          'Hiển thị thông tin rõ ràng trên màn hình',
          'Xác thực danh tính nhanh chóng',
          'Lưu trữ dữ liệu an toàn',
          'Tích hợp camera chụp ảnh',
          'Báo cáo thống kê chi tiết'
        ],
        benefits: [
          'Tiết kiệm thời gian xử lý',
          'Giảm chi phí nhân lực',
          'Tăng độ chính xác thông tin',
          'Cải thiện trải nghiệm khách hàng',
          'Đảm bảo an ninh thông tin'
        ]
      },
      'can-dinh-luong-nha-may': {
        id: 10,
        title: 'Giải pháp Cân định lượng dành cho nhà máy',
        subtitle: 'Sự kết hợp hoàn hảo giữa tính toán chính xác và giám sát từ xa',
        image: '/images/solutions/dien2.jpg',
        description: 'Hệ thống cân định lượng cho nhà máy giúp tính toán chính xác theo công thức, giám sát từ xa thời gian thực và kiểm soát số liệu thực ở mọi nơi; ứng dụng rộng rãi trong công nghiệp, nông nghiệp, dịch vụ.',
        userRoles: [
          {
            title: 'Vận hành',
            description: 'Theo dõi số liệu và quy trình cân định lượng',
            icon: '🏭'
          },
          {
            title: 'Quản lý',
            description: 'Xem báo cáo, kiểm soát sản lượng',
            icon: '📈'
          },
          {
            title: 'Kỹ thuật',
            description: 'Cấu hình thiết bị, bảo trì hệ thống',
            icon: '🛠️'
          }
        ],
        features: [
          'Tính toán chính xác theo công thức định lượng',
          'Kết nối cảm biến cân, PLC và IoT',
          'Giám sát từ xa thời gian thực',
          'Lưu trữ và báo cáo số liệu',
          'Cảnh báo sai số vượt ngưỡng',
          'Tích hợp ERP/MES'
        ],
        benefits: [
          'Giảm sai số, ổn định chất lượng',
          'Tiết kiệm thời gian và chi phí',
          'Tăng năng suất và tự động hóa',
          'Minh bạch số liệu, quyết định nhanh',
          'Dễ mở rộng và bảo trì'
        ]
      }
    },
    EN: {
      'khu-vui-choi-giai-tri': {
        id: 1,
        title: 'Entertainment Area',
        subtitle: 'Automatic payment solution for entertainment venues',
        image: '/images/solutions/giaitri.jpg',
        description: 'The application is deployed on automated payment machines (Kiosks) located at entertainment venues and tourist destinations with high customer traffic.',
        userRoles: [
          {
            title: 'Customers',
            description: 'Self-service ticket purchase and payment',
            icon: '👥'
          },
          {
            title: 'Agents',
            description: 'Manage tickets and revenue via website',
            icon: '💼'
          },
          {
            title: 'Business Staff',
            description: 'System administration and promotion configuration',
            icon: '⚙️'
          }
        ],
        features: [
          'Multi-language support',
          'QR code payment (Sacombank, VNPay)',
          'Card payment',
          'Automatic ticket printing',
          'Real-time revenue reports',
          'Promotion management'
        ],
        benefits: [
          'Reduce customer waiting time',
          'Optimize payment process',
          'Reduce staffing costs',
          'Enhance customer experience',
          'Effective centralized management'
        ]
      },
      'can-tin-hoc-duong': {
        id: 2,
        title: 'School Canteen',
        subtitle: 'Contactless payment solution for school canteens',
        image: '/images/solutions/cantin.jpg',
        description: 'Smart payment system for school canteens, helping students pay quickly and conveniently via student cards.',
        userRoles: [
          {
            title: 'Students',
            description: 'Pay with student card',
            icon: '🎓'
          },
          {
            title: 'Parents',
            description: 'Top up and track spending',
            icon: '👨‍👩‍👧'
          },
          {
            title: 'School',
            description: 'Manage menu and reports',
            icon: '🏫'
          }
        ],
        features: [
          'NFC contactless payment',
          'Daily menu management',
          'Online top-up for parents',
          'Student spending reports',
          'Nutrition alerts',
          'E-wallet integration'
        ],
        benefits: [
          'Food hygiene safety',
          'Reduce cash contact',
          'Parents track spending',
          'Reduce queuing time',
          'Management transparency'
        ]
      },
      'thu-tien-tu-dong': {
        id: 3,
        title: 'Automatic Payment',
        subtitle: 'Automatic payment solution for retail stores',
        image: '/images/solutions/thutien.jpg',
        description: 'Automatic cash machine with VND bill recognition, automatic change return and high security, suitable for retail stores.',
        userRoles: [
          {
            title: 'Customers',
            description: 'Automatic cash payment',
            icon: '💰'
          },
          {
            title: 'Store Owner',
            description: 'Track revenue and manage cash',
            icon: '🏪'
          },
          {
            title: 'Staff',
            description: 'Refill change and maintenance',
            icon: '👔'
          }
        ],
        features: [
          'VND bill recognition',
          'Automatic change return',
          'Counterfeit detection',
          'Capacity up to 1000 bills',
          'POS system integration',
          'Detailed transaction reports'
        ],
        benefits: [
          'Reduce counterfeit risk',
          'Increase payment speed',
          'Reduce calculation errors',
          'Save manpower',
          'High cash security'
        ]
      },
      'ben-xe-van-tai': {
        id: 4,
        title: 'Bus Station & Transport',
        subtitle: 'Ticketing and management solution for bus stations',
        image: '/images/solutions/benxe.jpg',
        description: 'Automatic ticketing system and schedule management for bus stations and passenger transport companies.',
        userRoles: [
          {
            title: 'Passengers',
            description: 'Buy tickets online or at kiosk',
            icon: '🧳'
          },
          {
            title: 'Bus Company',
            description: 'Manage schedules and revenue',
            icon: '🚌'
          },
          {
            title: 'Station',
            description: 'Overall management of bus companies',
            icon: '🏢'
          }
        ],
        features: [
          'Online and offline ticketing',
          'Bus schedule management',
          'Dynamic seat map',
          'Multi-channel payment',
          'Electronic check-in',
          'SMS/Email notifications'
        ],
        benefits: [
          'Increase online revenue',
          'Reduce ticketing costs',
          'Effective centralized management',
          'Better customer experience',
          'Detailed statistical reports'
        ]
      },
      'website-ban-hang': {
        id: 5,
        title: 'E-commerce Website',
        subtitle: 'Professional e-commerce solution',
        image: '/images/solutions/banhang.png',
        description: 'Professional e-commerce website design with full features and online payment integration.',
        userRoles: [
          {
            title: 'Customers',
            description: 'Convenient online shopping',
            icon: '🛍️'
          },
          {
            title: 'Seller',
            description: 'Manage products and orders',
            icon: '📦'
          },
          {
            title: 'Admin',
            description: 'Website and marketing management',
            icon: '💻'
          }
        ],
        features: [
          'Responsive design',
          'Online payment integration',
          'Product management',
          'Order management',
          'Automated marketing',
          'SEO optimization'
        ],
        benefits: [
          'Expand online market',
          'Increase sales revenue',
          'Low operating costs',
          'Simple management',
          'Multi-channel integration'
        ]
      },
      'cong-tu-dong': {
        id: 6,
        title: 'Automatic Gate',
        subtitle: 'Automatic access control solution',
        image: '/images/solutions/tudong.jpg',
        description: 'Automatic barrier gate system with license plate recognition and smart access control.',
        userRoles: [
          {
            title: 'Users',
            description: 'Automatic access via recognition',
            icon: '🚗'
          },
          {
            title: 'Security',
            description: 'Monitor and control',
            icon: '👮'
          },
          {
            title: 'Manager',
            description: 'Reports and system configuration',
            icon: '⚙️'
          }
        ],
        features: [
          'Automatic license plate recognition',
          'Automatic barrier gate',
          'Security camera integration',
          'Smart access control',
          'Access history reports',
          'Unknown vehicle alerts'
        ],
        benefits: [
          'Enhanced security',
          'Reduce security staff',
          'Strict control',
          'User convenience',
          'Complete data storage'
        ]
      },
      'camera-ai': {
        id: 7,
        title: 'AI Integrated Surveillance Camera',
        subtitle: 'Smart monitoring with AI technology',
        image: '/images/solutions/camera1.jpg',
        description: 'AI-integrated surveillance camera system using advanced technology from Taiwan to detect and analyze behavior.',
        userRoles: [
          {
            title: 'Security',
            description: 'Real-time monitoring',
            icon: '👁️'
          },
          {
            title: 'Manager',
            description: 'View reports and alerts',
            icon: '📊'
          },
          {
            title: 'Technical',
            description: 'Configure and maintain system',
            icon: '🔧'
          }
        ],
        features: [
          'AI face recognition',
          'Abnormal behavior detection',
          'Intrusion alerts',
          'Long-term video storage',
          'Remote mobile viewing',
          'Statistical analysis'
        ],
        benefits: [
          'High AI security',
          'Fast alerts',
          'Reduce manual monitoring',
          'Accurate analysis',
          'Multi-system integration'
        ]
      },
      'tiet-kiem-dien': {
        id: 8,
        title: 'AI Energy Saving System',
        subtitle: 'Smart electricity saving with AI',
        image: '/images/solutions/dien1.jpg',
        description: 'AI-powered system to predict and optimize electricity consumption, saving 10-15% in costs.',
        userRoles: [
          {
            title: 'Users',
            description: 'Track electricity consumption',
            icon: '⚡'
          },
          {
            title: 'Manager',
            description: 'View reports and analysis',
            icon: '📈'
          },
          {
            title: 'Technical',
            description: 'Configure optimization',
            icon: '🔌'
          }
        ],
        features: [
          'Predict peak consumption',
          'Automatic optimization',
          'IoT remote monitoring',
          'Detailed reports',
          'Abnormal consumption alerts',
          'Renewable energy integration'
        ],
        benefits: [
          'Save 10-15% electricity costs',
          'Reduce energy waste',
          'Environmental protection',
          'Centralized management',
          'High ROI'
        ]
      },
      'thiet-bi-doc-cccd': {
        id: 9,
        title: 'Citizen ID Card Reading Device Solution',
        subtitle: 'Smart choice saving time, cost and manpower',
        image: '/images/solutions/cccd.jpg',
        description: 'Modern CCCD reader device with advanced technology, helping automate identity verification processes at crowded locations such as banks, hospitals, and government offices.',
        userRoles: [
          {
            title: 'Customers',
            description: 'Self-service identity verification',
            icon: '👤'
          },
          {
            title: 'Staff',
            description: 'Monitor and assist customers',
            icon: '👨‍💼'
          },
          {
            title: 'Manager',
            description: 'Track reports and statistics',
            icon: '📊'
          }
        ],
        features: [
          'Automatic CCCD chip reading',
          'Clear information display on screen',
          'Fast identity verification',
          'Secure data storage',
          'Integrated photo camera',
          'Detailed statistical reports'
        ],
        benefits: [
          'Save processing time',
          'Reduce labor costs',
          'Increase information accuracy',
          'Improve customer experience',
          'Ensure information security'
        ]
      },
      'can-dinh-luong-nha-may': {
        id: 10,
        title: 'Industrial Weighing Solution',
        subtitle: 'Perfect blend of precise calculation and remote monitoring',
        image: '/images/solutions/dien2.jpg',
        description: 'Factory weighing system enables precise formula-based calculation, real-time remote monitoring, and control of actual metrics anywhere; applicable to industry, agriculture, and services.',
        userRoles: [
          {
            title: 'Operators',
            description: 'Monitor metrics and dosing processes',
            icon: '🏭'
          },
          {
            title: 'Managers',
            description: 'View reports and control output',
            icon: '📈'
          },
          {
            title: 'Technicians',
            description: 'Configure devices and maintain the system',
            icon: '🛠️'
          }
        ],
        features: [
          'Precise formula-based dosing calculation',
          'Sensor, PLC and IoT connectivity',
          'Real-time remote monitoring',
          'Data storage and reporting',
          'Threshold deviation alerts',
          'ERP/MES integration'
        ],
        benefits: [
          'Reduce errors and stabilize quality',
          'Save time and costs',
          'Increase productivity and automation',
          'Transparent data for quick decisions',
          'Easy to scale and maintain'
        ]
      }
    }
  };
  return data[language] || data.VN;
};

const SolutionDetails = () => {
  const { slug } = useParams();
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);
  const solutionsData = getSolutionDetailsData(currentLanguage);
  const fallback = solutionsData[slug];

  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  const resolveTitle = (d) => {
    if (!d) return '';
    return currentLanguage === 'VN' ? d.title_vn || d.title || '' : d.title_en || d.title || '';
  };
  const resolveDesc = (d) => {
    if (!d) return '';
    return currentLanguage === 'VN' ? d.description_vn || '' : d.description_en || '';
  };

  const fetchSolution = async () => {
    setLoading(true);
    try {
      const res = await getPublicSolution(slug);
      const data = res?.data;
      // Chỉ hiển thị nếu solution đã publish hoặc không có cờ
      if (data && (data.is_published === undefined || data.is_published)) {
        setDoc(data);
      } else {
        setDoc(null);
      }
    } catch (e) {
      setDoc(null);
      console.error('Fetch public solution failed', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolution();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    const onChange = (payload) => {
      // Refetch khi có thay đổi từ admin
      if (!payload || !payload.slug || payload.slug === slug) {
        fetchSolution();
      }
    };
    socket.on('solutions.changed', onChange);
    return () => {
      socket.off('solutions.changed', onChange);
    };
  }, [slug]);

  // Hợp nhất dữ liệu API với dữ liệu tĩnh để giữ UI phong phú
  const merged = doc
    ? {
        title: resolveTitle(doc) || fallback?.title,
        subtitle: fallback?.subtitle || '',
        image: doc.image || fallback?.image,
        description: resolveDesc(doc) || fallback?.description,
        userRoles: fallback?.userRoles || [],
        features: fallback?.features || [],
        benefits: fallback?.benefits || [],
      }
    : fallback;

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-FiraSans text-HeadingColor-0 dark:text-white mb-2'>
            {currentLanguage === 'VN' ? 'Đang tải nội dung...' : 'Loading content...'}
          </h1>
          <p className='font-FiraSans text-TextColor2-0 dark:text-gray-300'>
            {currentLanguage === 'VN' ? 'Vui lòng chờ trong giây lát' : 'Please wait a moment'}
          </p>
        </div>
      </div>
    );
  }

  if (!merged) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-HeadingColor-0 dark:text-white mb-4'>
            {currentLanguage === 'VN' ? 'Không tìm thấy giải pháp' : 'Solution not found'}
          </h1>
          <Link
            to="/about"
            className='inline-block bg-PrimaryColor-0 dark:bg-green-600 text-white px-8 py-3 rounded-lg font-FiraSans font-medium hover:bg-opacity-90 transition-all duration-300'
          >
            {currentLanguage === 'VN' ? 'Quay lại' : 'Go back'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={merged.title}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={merged.title}
        bgImage={merged.image}
      />

      <section className='py-[120px] bg-BodyBg4-0 dark:bg-gray-900'>
        <div className='Container'>
          {/* Hero Section */}
          <div className='text-center mb-16'>
            <h1
              className='font-FiraSans font-semibold text-4xl sm:text-5xl text-HeadingColor-0 dark:text-white mb-4'
              data-aos='fade-up'
              data-aos-duration='800'
            >
              {merged.title}
            </h1>
            {merged.subtitle && (
              <p
                className='font-FiraSans text-xl text-PrimaryColor-0 dark:text-green-400 mb-6'
                data-aos='fade-up'
                data-aos-duration='800'
                data-aos-delay='100'
              >
                {merged.subtitle}
              </p>
            )}
            <p
              className='font-FiraSans text-TextColor2-0 dark:text-gray-300 text-lg max-w-4xl mx-auto'
              data-aos='fade-up'
              data-aos-duration='800'
              data-aos-delay='200'
            >
              {merged.description}
            </p>
          </div>

          {/* User Roles Section */}
          {merged.userRoles && merged.userRoles.length > 0 && (
            <div className='mb-16'>
              <h2
                className='font-FiraSans font-semibold text-3xl text-HeadingColor-0 dark:text-white text-center mb-12'
                data-aos='fade-up'
                data-aos-duration='800'
              >
                {currentLanguage === 'VN' ? 'Đối tượng sử dụng' : 'User Roles'}
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {merged.userRoles.map((role, index) => (
                  <div
                    key={index}
                    className='bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center'
                    data-aos='fade-up'
                    data-aos-duration='800'
                    data-aos-delay={300 + (index * 100)}
                  >
                    <div className='text-6xl mb-4'>{role.icon}</div>
                    <h3 className='font-FiraSans font-semibold text-xl text-HeadingColor-0 dark:text-white mb-3'>
                      {role.title}
                    </h3>
                    <p className='font-FiraSans text-TextColor2-0 dark:text-gray-300'>
                      {role.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features Section */}
          {merged.features && merged.features.length > 0 && (
            <div className='mb-16'>
              <h2
                className='font-FiraSans font-semibold text-3xl text-HeadingColor-0 dark:text-white text-center mb-12'
                data-aos='fade-up'
                data-aos-duration='800'
              >
                {currentLanguage === 'VN' ? 'Tính năng nổi bật' : 'Key Features'}
              </h2>
              <div
                className='bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg'
                data-aos='fade-up'
                data-aos-duration='800'
                data-aos-delay='200'
              >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {merged.features.map((feature, index) => (
                    <div key={index} className='flex items-start gap-3'>
                      <IoCheckmarkCircle className='text-PrimaryColor-0 dark:text-green-400 text-xl mt-1 flex-shrink-0' />
                      <span className='font-FiraSans text-TextColor2-0 dark:text-gray-300'>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Benefits Section */}
          {merged.benefits && merged.benefits.length > 0 && (
            <div className='mb-16'>
              <h2
                className='font-FiraSans font-semibold text-3xl text-HeadingColor-0 dark:text-white text-center mb-12'
                data-aos='fade-up'
                data-aos-duration='800'
              >
                {currentLanguage === 'VN' ? 'Lợi ích' : 'Benefits'}
              </h2>
              <div
                className='bg-gradient-to-br from-PrimaryColor-0 to-green-600 dark:from-green-700 dark:to-green-900 rounded-2xl p-8 shadow-lg'
                data-aos='fade-up'
                data-aos-duration='800'
                data-aos-delay='200'
              >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {merged.benefits.map((benefit, index) => (
                    <div key={index} className='flex items-start gap-3'>
                      <IoCheckmarkCircle className='text-white text-xl mt-1 flex-shrink-0' />
                      <span className='font-FiraSans text-white'>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div
            className='text-center'
            data-aos='fade-up'
            data-aos-duration='800'
            data-aos-delay='300'
          >
            <div className='bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg'>
              <h3 className='font-FiraSans font-semibold text-2xl text-HeadingColor-0 dark:text-white mb-4'>
                {currentLanguage === 'VN' ? 'Bạn quan tâm đến giải pháp này?' : 'Interested in this solution?'}
              </h3>
              <p className='font-FiraSans text-TextColor2-0 dark:text-gray-300 mb-6'>
                {currentLanguage === 'VN' ? 'Liên hệ với chúng tôi để nhận tư vấn chi tiết và báo giá.' : 'Contact us for detailed consultation and quotation.'}
              </p>
              <div className='flex flex-wrap gap-4 justify-center'>
                <Link
                  to="/contact"
                  className='inline-block bg-PrimaryColor-0 dark:bg-green-600 text-white px-8 py-3 rounded-lg font-FiraSans font-medium hover:bg-opacity-90 transition-all duration-300'
                >
                  {currentLanguage === 'VN' ? 'Liên hệ ngay' : 'Contact Now'}
                </Link>
                <Link
                  to="/about"
                  className='inline-block bg-white dark:bg-gray-700 text-HeadingColor-0 dark:text-white border-2 border-PrimaryColor-0 dark:border-green-600 px-8 py-3 rounded-lg font-FiraSans font-medium hover:bg-PrimaryColor-0 dark:hover:bg-green-600 hover:text-white transition-all duration-300'
                >
                  {currentLanguage === 'VN' ? 'Xem giải pháp khác' : 'View other solutions'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SolutionDetails;
