# BÁO CÁO YÊU CẦU API CHO BACKEND
## Dự án: C&T Electronics Website

---

## 📋 MỤC LỤC
1. [Tổng Quan](#tổng-quan)
2. [Cấu Trúc Database](#cấu-trúc-database)
3. [Danh Sách API Endpoints](#danh-sách-api-endpoints)
4. [Chi Tiết Từng Entity](#chi-tiết-từng-entity)
5. [Authentication & Authorization](#authentication--authorization)
6. [File Upload Requirements](#file-upload-requirements)
7. [Lưu Ý Về Filtering](#lưu-ý-về-filtering)

---

## 🎯 TỔNG QUAN

### Tình Trạng Hiện Tại
- **Frontend:** React + Vite
- **Backend:** Chưa có (tất cả data hardcoded)
- **Contact Form:** Sử dụng Formspree (external service)
- **Languages:** Hỗ trợ 2 ngôn ngữ (VN/EN)

### Yêu Cầu Backend
- Tạo RESTful API cho 7 entities chính
- Hỗ trợ đa ngôn ngữ (VN/EN)
- Admin panel để quản lý nội dung
- Upload và quản lý hình ảnh
- Contact form handling

---

## 🗄️ CẤU TRÚC DATABASE

### 1. Bảng `blogs`
```sql
CREATE TABLE blogs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    thumb_image VARCHAR(255) NOT NULL,
    category_vn VARCHAR(100),
    category_en VARCHAR(100),
    title_vn VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    description_vn TEXT,
    description_en TEXT,
    external_url VARCHAR(255),
    is_external BOOLEAN DEFAULT true,
    published_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);
```

**Ví dụ data:**
| id | category_vn | title_vn | external_url |
|----|-------------|----------|--------------|
| 1 | Công nghệ | Giải pháp thanh toán tự động | https://facebook.com/... |

---

### 2. Bảng `teams`
```sql
CREATE TABLE teams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    position_vn VARCHAR(100),
    position_en VARCHAR(100),
    photo_url VARCHAR(255),
    facebook_url VARCHAR(255),
    twitter_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);
```

**Ví dụ data:**
| id | full_name | position_vn | photo_url |
|----|-----------|-------------|-----------|
| 1 | Dr. VO DINH TUNG | CEO | /images/team1.jpg |

---

### 3. Bảng `services`
```sql
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_vn VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    description_vn TEXT,
    description_en TEXT,
    thumb_image VARCHAR(255),
    icon_image VARCHAR(255),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);
```

**Ví dụ data:**
| id | title_vn | description_vn | thumb_image |
|----|----------|----------------|-------------|
| 1 | Dự án I-Resort | Hệ thống thanh toán... | /images/i-resort.jpg |

---

### 4. Bảng `products`
```sql
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name_vn VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    category ENUM('hardware', 'software') NOT NULL,
    image_url VARCHAR(255),
    price_vn VARCHAR(100),
    price_en VARCHAR(100),
    features_vn JSON,  -- Array of strings
    features_en JSON,  -- Array of strings
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);
```

**Ví dụ data:**
| id | name_vn | category | price_vn | features_vn (JSON) |
|----|---------|----------|----------|-------------------|
| 1 | Đầu đọc thẻ CCCD | hardware | 15.000.000 VNĐ | ["Đọc nhanh", "Chính xác cao"] |

---

### 5. Bảng `solutions`
```sql
CREATE TABLE solutions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title_vn VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    subtitle_vn VARCHAR(255),
    subtitle_en VARCHAR(255),
    description_vn TEXT,
    description_en TEXT,
    image_url VARCHAR(255),
    details_vn JSON,      -- Array of strings
    details_en JSON,      -- Array of strings
    user_roles_vn JSON,   -- Array of {title, description, icon}
    user_roles_en JSON,   -- Array of {title, description, icon}
    features_vn JSON,     -- Array of strings
    features_en JSON,     -- Array of strings
    benefits_vn JSON,     -- Array of strings
    benefits_en JSON,     -- Array of strings
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);
```

**Ví dụ data:**
| id | slug | title_vn | user_roles_vn (JSON) |
|----|------|----------|---------------------|
| 1 | khu-vui-choi-giai-tri | Khu Vui Chơi Giải Trí | [{"title":"Khách hàng", "description":"...", "icon":"👤"}] |

---

### 6. Bảng `certificates`
```sql
CREATE TABLE certificates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name_vn VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    certificate_number VARCHAR(100),
    year INT,
    description_vn TEXT,
    description_en TEXT,
    image_url VARCHAR(255),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);
```

**Ví dụ data:**
| id | name_vn | year | image_url |
|----|---------|------|-----------|
| 1 | Doanh nghiệp Khoa học & Công nghệ | 2018 | /images/cert1.jpg |

---

### 7. Bảng `partners`
```sql
CREATE TABLE partners (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    logo_url VARCHAR(255),
    website_url VARCHAR(255),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);
```

**Ví dụ data:**
| id | name | logo_url |
|----|------|----------|
| 1 | Kumho Samco | /images/partners/kumho.png |

---

### 8. Bảng `contacts`
```sql
CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(50),
    message TEXT,
    terms_accepted BOOLEAN DEFAULT false,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    replied_at TIMESTAMP NULL,
    notes TEXT
);
```

---

### 9. Bảng `users` (Admin)
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor') DEFAULT 'editor',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);
```

---

## 🔌 DANH SÁCH API ENDPOINTS

### 📝 Blog APIs
| Method | Endpoint | Mục đích | Auth |
|--------|----------|----------|------|
| GET | `/api/blogs?language=VN` | Lấy danh sách blog | Public |
| GET | `/api/blogs/:id` | Lấy chi tiết 1 blog | Public |
| POST | `/api/blogs` | Tạo blog mới | Admin |
| PUT | `/api/blogs/:id` | Cập nhật blog | Admin |
| DELETE | `/api/blogs/:id` | Xóa blog | Admin |

**Query Parameters (GET):**
- `language` (required): VN hoặc EN
- `page` (optional): Số trang (default: 1)
- `limit` (optional): Số items/trang (default: 10)
- `is_active` (optional): true/false

**Response Example (GET /api/blogs?language=VN):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "thumb_image": "/images/blog1.jpg",
      "category": "Công nghệ",
      "title": "Giải pháp thanh toán tự động cho doanh nghiệp",
      "description": "Mô tả ngắn...",
      "external_url": "https://facebook.com/...",
      "is_external": true,
      "published_date": "2025-03-04"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 2,
    "total_items": 3,
    "limit": 10
  }
}
```

**Request Body (POST/PUT):**
```json
{
  "thumb_image": "/images/blog1.jpg",
  "category_vn": "Công nghệ",
  "category_en": "Technology",
  "title_vn": "Tiêu đề tiếng Việt",
  "title_en": "English Title",
  "description_vn": "Mô tả...",
  "description_en": "Description...",
  "external_url": "https://...",
  "is_external": true,
  "published_date": "2025-03-04",
  "is_active": true
}
```

---

### 👥 Team APIs
| Method | Endpoint | Mục đích | Auth |
|--------|----------|----------|------|
| GET | `/api/teams` | Lấy danh sách team | Public |
| GET | `/api/teams/:id` | Lấy chi tiết 1 member | Public |
| POST | `/api/teams` | Thêm thành viên | Admin |
| PUT | `/api/teams/:id` | Cập nhật thông tin | Admin |
| DELETE | `/api/teams/:id` | Xóa thành viên | Admin |

**Response Example (GET /api/teams):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "full_name": "Dr. VO DINH TUNG",
      "position_vn": "CEO",
      "position_en": "CEO",
      "photo_url": "/images/team1.jpg",
      "facebook_url": "https://facebook.com/...",
      "twitter_url": "",
      "linkedin_url": "",
      "display_order": 1
    }
  ]
}
```

---

### 🛠️ Service APIs
| Method | Endpoint | Mục đích | Auth |
|--------|----------|----------|------|
| GET | `/api/services?language=VN` | Lấy danh sách dự án | Public |
| GET | `/api/services/:id` | Lấy chi tiết dự án | Public |
| POST | `/api/services` | Tạo dự án mới | Admin |
| PUT | `/api/services/:id` | Cập nhật dự án | Admin |
| DELETE | `/api/services/:id` | Xóa dự án | Admin |

**Query Parameters:**
- `language` (required): VN hoặc EN

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Dự án I-Resort",
      "description": "Hệ thống thanh toán tự động...",
      "thumb_image": "/images/i-resort.jpg",
      "icon_image": "/images/icon1.png",
      "display_order": 1
    }
  ]
}
```

---

### 📦 Product APIs
| Method | Endpoint | Mục đích | Auth |
|--------|----------|----------|------|
| GET | `/api/products?language=VN&category=hardware` | Lấy danh sách sản phẩm | Public |
| GET | `/api/products/:id` | Lấy chi tiết sản phẩm | Public |
| POST | `/api/products` | Tạo sản phẩm mới | Admin |
| PUT | `/api/products/:id` | Cập nhật sản phẩm | Admin |
| DELETE | `/api/products/:id` | Xóa sản phẩm | Admin |

**Query Parameters:**
- `language` (required): VN hoặc EN
- `category` (optional): hardware hoặc software - **CÓ THỂ FILTER Ở FRONTEND**

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Đầu đọc thẻ CCCD",
      "category": "hardware",
      "image_url": "/images/product1.jpg",
      "price": "15.000.000 VNĐ",
      "features": [
        "Đọc nhanh chóng, chính xác",
        "Tích hợp vào hệ thống dễ dàng",
        "Hỗ trợ đầy đủ các loại thẻ"
      ]
    }
  ]
}
```

---

### 💡 Solution APIs
| Method | Endpoint | Mục đích | Auth |
|--------|----------|----------|------|
| GET | `/api/solutions?language=VN` | Lấy danh sách giải pháp | Public |
| GET | `/api/solutions/:slug` | Lấy chi tiết theo slug | Public |
| POST | `/api/solutions` | Tạo giải pháp mới | Admin |
| PUT | `/api/solutions/:id` | Cập nhật giải pháp | Admin |
| DELETE | `/api/solutions/:id` | Xóa giải pháp | Admin |

**Query Parameters:**
- `language` (required): VN hoặc EN
- `page`, `limit` (optional): Phân trang - **CÓ THỂ FILTER Ở FRONTEND**

**Response Example (GET /api/solutions/khu-vui-choi-giai-tri?language=VN):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "slug": "khu-vui-choi-giai-tri",
    "title": "Khu Vui Chơi Giải Trí",
    "subtitle": "Giải pháp quản lý toàn diện",
    "description": "Mô tả chi tiết...",
    "image_url": "/images/solution1.jpg",
    "details": [
      "Chi tiết 1",
      "Chi tiết 2"
    ],
    "user_roles": [
      {
        "title": "Khách hàng",
        "description": "Sử dụng thẻ để thanh toán...",
        "icon": "👤"
      }
    ],
    "features": ["Tính năng 1", "Tính năng 2"],
    "benefits": ["Lợi ích 1", "Lợi ích 2"]
  }
}
```

---

### 🏆 Certificate APIs
| Method | Endpoint | Mục đích | Auth |
|--------|----------|----------|------|
| GET | `/api/certificates?language=VN` | Lấy danh sách chứng chỉ | Public |
| GET | `/api/certificates/:id` | Lấy chi tiết chứng chỉ | Public |
| POST | `/api/certificates` | Thêm chứng chỉ | Admin |
| PUT | `/api/certificates/:id` | Cập nhật chứng chỉ | Admin |
| DELETE | `/api/certificates/:id` | Xóa chứng chỉ | Admin |

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Doanh nghiệp Khoa học & Công nghệ",
      "certificate_number": "123456",
      "year": 2018,
      "description": "Chứng nhận doanh nghiệp...",
      "image_url": "/images/cert1.jpg"
    }
  ]
}
```

---

### 🤝 Partner APIs
| Method | Endpoint | Mục đích | Auth |
|--------|----------|----------|------|
| GET | `/api/partners` | Lấy danh sách đối tác | Public |
| GET | `/api/partners/:id` | Lấy chi tiết đối tác | Public |
| POST | `/api/partners` | Thêm đối tác | Admin |
| PUT | `/api/partners/:id` | Cập nhật đối tác | Admin |
| DELETE | `/api/partners/:id` | Xóa đối tác | Admin |

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Kumho Samco",
      "logo_url": "/images/partners/kumho.png",
      "website_url": "https://kumhosamco.com",
      "display_order": 1
    }
  ]
}
```

---

### ✉️ Contact APIs
| Method | Endpoint | Mục đích | Auth |
|--------|----------|----------|------|
| POST | `/api/contact` | Gửi form liên hệ | Public |
| GET | `/api/contacts` | Xem danh sách liên hệ | Admin |
| GET | `/api/contacts/:id` | Chi tiết 1 liên hệ | Admin |
| PUT | `/api/contacts/:id` | Cập nhật status/notes | Admin |

**Request Body (POST):**
```json
{
  "name": "Nguyen Van A",
  "email": "example@gmail.com",
  "address": "123 ABC Street",
  "phone": "0901234567",
  "message": "Tôi muốn tư vấn về...",
  "terms_accepted": true
}
```

**Response (POST):**
```json
{
  "success": true,
  "message": "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.",
  "data": {
    "id": 123,
    "created_at": "2025-03-04T10:30:00Z"
  }
}
```

**Response Example (GET /api/contacts - Admin):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Nguyen Van A",
      "email": "example@gmail.com",
      "phone": "0901234567",
      "message": "Tôi muốn tư vấn...",
      "status": "new",
      "created_at": "2025-03-04T10:30:00Z"
    }
  ]
}
```

---

### 🔐 Authentication APIs
| Method | Endpoint | Mục đích | Auth |
|--------|----------|----------|------|
| POST | `/api/auth/login` | Đăng nhập admin | Public |
| POST | `/api/auth/logout` | Đăng xuất | Admin |
| GET | `/api/auth/me` | Thông tin user hiện tại | Admin |
| POST | `/api/auth/refresh` | Refresh token | Admin |

**Login Request:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "..."
  }
}
```

---

## 🔒 AUTHENTICATION & AUTHORIZATION

### JWT Token
- **Access Token:** Hết hạn sau 1 giờ
- **Refresh Token:** Hết hạn sau 7 ngày
- **Header format:** `Authorization: Bearer <token>`

### Roles
- **admin:** Full quyền (tạo, sửa, xóa tất cả)
- **editor:** Chỉ tạo và sửa (không xóa)

### Protected Routes
Tất cả POST, PUT, DELETE đều yêu cầu authentication

---

## 📁 FILE UPLOAD REQUIREMENTS

### Image Upload API
```
POST /api/upload
Content-Type: multipart/form-data
```

**Request:**
```javascript
FormData {
  file: <image file>,
  folder: "blogs" | "teams" | "products" | etc.
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "/uploads/blogs/image123.jpg",
    "filename": "image123.jpg",
    "size": 245678
  }
}
```

### Yêu cầu:
- Max file size: 5MB
- Allowed formats: jpg, jpeg, png, webp
- Tự động resize/optimize
- Lưu trữ: `/public/uploads/{folder}/`

---

## 🎯 LƯU Ý VỀ FILTERING

### ✅ Filter ở Backend (Query Parameters)
- **language** (VN/EN) - Vì ảnh hưởng performance
- **is_active** (true/false)
- **page, limit** - Phân trang database
- **search** (nếu có)

### ✅ Filter ở Frontend (Client-side)
- **Products by category** (hardware/software) - Chỉ 2 giá trị, dễ filter
- **Solutions pagination** - Frontend tự chia trang
- **Blog grid layout** - Frontend tự sắp xếp

---

## 🛠️ TECH STACK KHUYẾN NGHỊ

### Backend Framework
- **Node.js + Express** (hoặc NestJS)
- **Python + FastAPI** (hoặc Django)
- **PHP + Laravel**

### Database
- **MySQL** hoặc **PostgreSQL**
- **MongoDB** (nếu thích NoSQL)

### Authentication
- **JWT** tokens
- **bcrypt** để hash password

### File Storage
- Local storage: `/public/uploads/`
- Cloud storage: AWS S3, Cloudinary (recommended)

### Deployment
- **Backend:** Heroku, Railway, DigitalOcean
- **Database:** Railway, PlanetScale, Supabase
- **Images:** Cloudinary, AWS S3

---

## 📊 PRIORITY IMPLEMENTATION

### Phase 1 (Cao nhất)
1. Contact API - Thay thế Formspree
2. Blog API - Nội dung thường xuyên cập nhật
3. Product API - Hiển thị sản phẩm

### Phase 2
4. Solution API - Giải pháp chi tiết
5. Service API - Dự án
6. Authentication - Admin panel

### Phase 3
7. Team API
8. Certificate API
9. Partner API

---

## 🔗 API BASE URL

### Development
```
http://localhost:3000/api
```

### Production
```
https://api.ctelectronics.vn/api
```

---

## 📝 ERROR HANDLING

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email không hợp lệ",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (Validation error)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 📞 CONTACT

Nếu có thắc mắc về yêu cầu API, vui lòng liên hệ:
- **Frontend Team Lead:** [Tên]
- **Email:** [Email]
- **Slack:** [Channel]

---

**Ngày tạo:** 2025-03-04
**Version:** 1.0
**Người tạo:** Frontend Development Team
