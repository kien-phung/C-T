# Hướng dẫn cài đặt tính năng gửi Email

## Tổng quan
Hệ thống đã được cập nhật để tự động gửi email khi khách hàng điền form liên hệ:
- **Email cho Admin** (davidkien04@gmail.com): Thông báo có liên hệ mới
- **Email cho Khách hàng**: Email xác nhận đã nhận được thông tin

## Các thay đổi đã thực hiện

### 1. Backend
✅ Tạo 2 email templates mới:
- `sever/src/utils/templates/adminNotification.html` - Email thông báo cho admin
- `sever/src/utils/templates/contactConfirmation.html` - Email xác nhận cho khách hàng

✅ Cập nhật Contact Controller (`sever/src/controllers/contact.controller.ts`):
- Tự động gửi email đến **davidkien04@gmail.com** khi có liên hệ mới
- Tự động gửi email xác nhận cho khách hàng

### 2. Frontend
✅ Cập nhật 3 forms để kết nối với backend API:
- **Contact Form** (`client/src/Pages/InnerPage/ContactInner/Contact.jsx`)
- **Appointment Form** (`client/src/Component1/Appointment/Appointment.jsx`)
- **Newsletter Form** (`client/src/Shared/Footer/Footer.jsx`)

## Cách cài đặt

### Bước 1: Cấu hình Gmail App Password

1. Truy cập: https://myaccount.google.com/security
2. Bật **Xác thực 2 bước** (2-Step Verification) nếu chưa bật
3. Tìm **App passwords** (Mật khẩu ứng dụng)
4. Chọn:
   - App: **Mail**
   - Device: **Other (Custom name)** → đặt tên "C-T Website"
5. Click **Generate** → Copy mật khẩu 16 ký tự

### Bước 2: Cập nhật file .env

Mở file `sever/.env` và cập nhật:

```env
EMAIL_USER=email-cua-ban@gmail.com
EMAIL_PASS=mật-khẩu-16-ký-tự-vừa-copy
```

**Lưu ý:** Sử dụng App Password, KHÔNG phải mật khẩu Gmail thông thường!

### Bước 3: Khởi động lại Backend

```bash
cd sever
npm run dev
```

### Bước 4: Kiểm tra CORS

Đảm bảo backend cho phép request từ frontend (localhost:5173):

File `sever/src/index.ts` hoặc `sever/src/app.ts` cần có:

```typescript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

## Kiểm tra hoạt động

1. **Mở frontend:** http://localhost:5173
2. **Điền form liên hệ** với thông tin:
   - Họ tên
   - Email
   - Số điện thoại
   - Địa chỉ
   - Nội dung tin nhắn
   - ✅ Đồng ý điều khoản

3. **Click Submit**

4. **Kiểm tra:**
   - ✉️ Email **davidkien04@gmail.com** sẽ nhận thông báo liên hệ mới
   - ✉️ Email khách hàng sẽ nhận email xác nhận
   - 💬 Trang web hiển thị: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất."

## Các loại Form

Hệ thống phân biệt 3 loại liên hệ:

1. **Contact Form** (`submit_type: "Contact Form"`)
   - Từ trang /contact

2. **Appointment Form** (`submit_type: "Appointment Form"`)
   - Form đặt lịch hẹn trong trang chủ

3. **Newsletter** (`submit_type: "Newsletter"`)
   - Đăng ký nhận tin từ Footer

## Xử lý sự cố

### Lỗi: "Có lỗi xảy ra. Vui lòng thử lại."

**Nguyên nhân:**
1. Backend chưa chạy
2. Email chưa được cấu hình đúng
3. Lỗi CORS

**Giải pháp:**
```bash
# 1. Kiểm tra backend đang chạy
cd sever
npm run dev

# 2. Kiểm tra console log trong browser (F12)
# 3. Kiểm tra terminal backend có lỗi không
```

### Email không được gửi

**Kiểm tra:**
1. ✅ `EMAIL_USER` và `EMAIL_PASS` đã đúng trong `.env`
2. ✅ Đã khởi động lại backend sau khi sửa `.env`
3. ✅ Gmail App Password được tạo đúng cách
4. ✅ Tài khoản Gmail chưa bị khóa/giới hạn gửi email

### CORS Error

Nếu thấy lỗi CORS trong console:

```bash
# Cài đặt cors nếu chưa có
cd sever
npm install cors
npm install --save-dev @types/cors
```

Thêm vào backend:
```typescript
import cors from 'cors';
app.use(cors({ origin: 'http://localhost:5173' }));
```

## Tùy chỉnh Email Templates

### Sửa nội dung email cho Admin

File: `sever/src/utils/templates/adminNotification.html`

### Sửa nội dung email cho Khách hàng

File: `sever/src/utils/templates/contactConfirmation.html`

**Cú pháp:**
- Biến: `{{tenBien}}` → Ví dụ: `{{name}}`, `{{email}}`
- Điều kiện: `{{#if bien}}nội dung{{/if}}`

## Triển khai Production

Khi deploy lên server thật:

1. **Cập nhật CLIENT_URL trong .env:**
```env
CLIENT_URL=https://domain-cua-ban.com
```

2. **Cập nhật fetch URL trong frontend:**

Tìm và thay:
```javascript
// Thay vì
fetch('http://localhost:4040/api/contacts', ...)

// Sử dụng
fetch('https://api-domain-cua-ban.com/api/contacts', ...)
```

Hoặc tạo file `.env` trong client:
```env
VITE_API_URL=https://api-domain-cua-ban.com
```

Và dùng: `import.meta.env.VITE_API_URL`

3. **Cân nhắc dùng dịch vụ email chuyên nghiệp:**
   - SendGrid
   - Amazon SES
   - Mailgun
   - Resend

## Liên hệ hỗ trợ

Nếu gặp vấn đề, kiểm tra:
- Console log trong browser (F12)
- Terminal backend có hiển thị lỗi
- Email có trong spam/junk folder không

---

**Hoàn thành!** 🎉

Hệ thống email đã sẵn sàng hoạt động.
