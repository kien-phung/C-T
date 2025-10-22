# API Request Testing Guide

## Prerequisites
- Backend server running on `http://localhost:4040`
- Frontend running on `http://localhost:5173`
- Admin credentials: `minhhoangkhoa1221@gmail.com` / `123456789`

## How to Test

### 1. Start Backend Server
```bash
cd sever
npm run dev
# Should see: Server running on http://localhost:4040
```

### 2. Start Frontend Dev Server
```bash
cd client
npm run dev
# Should see: Local: http://localhost:5173
```

### 3. Check Console Logs
Open browser DevTools → Console tab
You should see:
```
API_URL: http://localhost:4040
Environment: development
```

---

## API Endpoints to Test

### Public Endpoints (No Auth Required)

#### 1. Submit Contact Form
**Route:** Appointment Component
- Go to homepage
- Scroll to Appointment section
- Fill form & submit
- Check Network tab for `POST /api/contacts`
- Should see: `200 OK` + success message

#### 2. Submit Contact Page Form
**Route:** /contact page
- Fill form & submit
- Check Network tab for `POST /api/contacts`
- Should see: `200 OK` + success message

#### 3. Newsletter Subscription
**Route:** Footer Newsletter
- Scroll to footer
- Enter email
- Click subscribe button
- Check Network tab for `POST /api/contacts`
- Should see: success message

---

### Admin Endpoints (Auth Required)

#### 1. Admin Login
**Route:** `/admin/login`
- Email: `minhhoangkhoa1221@gmail.com`
- Password: `123456789`
- Check Network tab for `POST /api/admin/auth/login`
- Should redirect to `/admin/dashboard`
- Check localStorage for `adminToken` and `adminEmail`

#### 2. Dashboard Stats
**Route:** `/admin/dashboard`
- Should auto-fetch stats via `GET /api/admin/contacts/stats`
- Check Network tab - should see `200 OK`
- Stats cards should display numbers

#### 3. View Contacts
**Route:** `/admin/contacts`
- Should fetch contacts via `GET /api/admin/contacts?page=1&limit=10`
- Should see table with contacts
- Test filters and search

#### 4. Delete Contact
**Route:** `/admin/contacts`
- Click trash icon on any contact
- Confirm delete
- Check Network tab for `DELETE /api/admin/contacts/{id}`
- Contact should disappear from table

#### 5. Bulk Delete
**Route:** `/admin/contacts`
- Click "Select All" button
- Click "Delete Selected"
- Confirm delete
- Check Network tab - should see multiple `DELETE` requests
- Contacts should disappear

---

## Debugging Tips

### Check if Axios is using correct URL
1. Open Console
2. Type: `window.localStorage.getItem('adminToken')`
3. Should return token if logged in

### Check Request Headers
1. Open Network tab
2. Click any request
3. Go to "Headers" tab
4. For admin requests, should see: `Authorization: Bearer {token}`

### Check Environment Variables
1. Open Console
2. Type: `import.meta.env.VITE_API_URL`
3. Should return: `http://localhost:4040`

### Common Issues

**Issue:** Requests return 401 Unauthorized
- **Solution:** Log in first to get token

**Issue:** Requests timeout (30s)
- **Solution:** Check if backend server is running

**Issue:** CORS errors
- **Solution:** Check vite proxy config in `vite.config.js`

**Issue:** API URL shows localhost in production
- **Solution:** Update `.env.production` with correct server URL

---

## File Structure
```
client/
├── .env                 # Current environment variables
├── .env.example         # Template for new developers
├── .env.development     # Development environment
├── .env.production      # Production environment
├── src/
│   ├── api/
│   │   ├── axiosClient.js   # Axios instance + interceptors
│   │   └── api.js           # All API functions
│   ├── Pages/Admin/
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── AdminContacts.jsx
│   ├── Component1/
│   │   └── Appointment/Appointment.jsx
│   ├── Pages/InnerPage/ContactInner/
│   │   └── Contact.jsx
│   └── Shared/Footer/
│       └── Footer.jsx
└── vite.config.js       # Vite config with API proxy
```

---

## Quick Test Commands

### Test via cURL (if you want to test directly)
```bash
# Get stats (requires token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:4040/api/admin/contacts/stats

# Get contacts
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:4040/api/admin/contacts?page=1&limit=10

# Submit contact
curl -X POST http://localhost:4040/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "address": "Test Address",
    "message": "Test Message",
    "submit_type": "Contact Form"
  }'
```
