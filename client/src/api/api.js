import axiosClient from './axiosClient';

// ============ PUBLIC API (Contact Form) ============

/**
 * Submit contact form (appointment, contact, newsletter)
 * @param {Object} data - Form data
 * @returns {Promise}
 */
export const submitContact = (data) => {
  // Try POST with URL-encoded first (most compatible with mobile browsers)
  console.log('📤 Submitting contact form with URL-encoded POST:', data);

  const params = new URLSearchParams();
  Object.keys(data).forEach(key => {
    params.append(key, data[key]);
  });

  return axiosClient.post('/api/contacts', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }).catch(error => {
    // If URL-encoded fails, try with JSON
    console.log('⚠️ URL-encoded POST failed, retrying with JSON...');

    return axiosClient.post('/api/contacts', data, {
      headers: { 'Content-Type': 'application/json' }
    }).catch(error2 => {
      // Last resort: FormData POST
      console.log('⚠️ JSON POST failed, retrying with FormData...');

      const formData = new FormData();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      return axiosClient.post('/api/contacts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    });
  });
};

// ============ ADMIN AUTH API ============

/**
 * Admin login
 * @param {string} email - Admin email
 * @param {string} password - Admin password
 * @returns {Promise}
 */
export const adminLogin = (email, password) => {
  return axiosClient.post('/api/admin/auth/login', { email, password }, {
    // Don't include auth header for login
    headers: {
      Authorization: undefined,
    },
  });
};

/**
 * Send OTP to current admin email
 * @returns {Promise}
 */
export const sendAdminOtp = () => {
  return axiosClient.post('/api/admin/auth/send-otp');
};

/**
 * Reset admin password using OTP
 * @param {string} otp
 * @param {string} new_password
 * @returns {Promise}
 */
export const resetAdminPassword = (otp, new_password) => {
  return axiosClient.post('/api/admin/auth/reset-password', { otp, new_password });
};

/**
 * Forgot password: send OTP to provided email (no auth)
 */
export const adminForgotSendOtp = (email) => {
  return axiosClient.post('/api/admin/auth/forgot-send-otp', { email }, {
    headers: { Authorization: undefined },
  });
};

/**
 * Forgot password: reset with email + OTP (no auth)
 */
export const adminForgotResetPassword = (email, otp, new_password) => {
  return axiosClient.post('/api/admin/auth/forgot-reset', { email, otp, new_password }, {
    headers: { Authorization: undefined },
  });
};

// ============ ADMIN CONTACTS API ============

/**
 * Get dashboard statistics
 * @returns {Promise}
 */
export const getAdminStats = () => {
  return axiosClient.get('/api/admin/contacts/stats');
};

/**
 * Get contacts list with pagination and filters
 * @param {Object} params - Query parameters (page, limit, search, status, etc.)
 * @returns {Promise}
 */
export const getAdminContacts = (params = {}) => {
  return axiosClient.get('/api/admin/contacts', { params });
};

/**
 * Delete single contact
 * @param {string} id - Contact ID
 * @returns {Promise}
 */
export const deleteAdminContact = (id) => {
  return axiosClient.delete(`/api/admin/contacts/${id}`);
};

/**
 * Delete multiple contacts
 * @param {Array} ids - Array of contact IDs
 * @returns {Promise}
 */
export const deleteAdminContacts = (ids) => {
  return Promise.all(
    ids.map(id => axiosClient.delete(`/api/admin/contacts/${id}`))
  );
};

// ============ ADMIN USERS API (REAL) ============
/**
 * Get admin users with optional filters/pagination
 * @param {Object} params - Query parameters (page, limit, search, role, status)
 * @returns {Promise}
 */
export const getAdminUsers = (params = {}) => {
  return axiosClient.get('/api/admin/users', { params });
};

/**
 * Create a new admin user
 * @param {Object} payload - { name, email, password?, role, status }
 * @returns {Promise}
 */
export const createAdminUser = (payload) => {
  return axiosClient.post('/api/admin/users', payload);
};

/**
 * Update an admin user by id
 * @param {string|number} id - user id
 * @param {Object} payload - fields to update
 * @returns {Promise}
 */
export const updateAdminUser = (id, payload) => {
  return axiosClient.patch(`/api/admin/users/${id}`, payload);
};

/**
 * Delete an admin user by id
 * @param {string|number} id - user id
 * @returns {Promise}
 */
export const deleteAdminUser = (id) => {
  return axiosClient.delete(`/api/admin/users/${id}`);
};

// ============ PUBLIC BLOGS API ============
/**
 * Get public blogs (for website display)
 * @param {Object} params - optional { limit }
 */
export const getPublicBlogs = (params = {}) => {
  return axiosClient.get('/api/blogs', { params });
};

// ============ ADMIN BLOGS & PROJECTS API (REAL) ============
/**
 * Blogs: list/create/update/delete
 */
export const getAdminBlogs = (params = {}) => {
  return axiosClient.get('/api/admin/blogs', { params });
};
export const createAdminBlog = (payload) => {
  return axiosClient.post('/api/admin/blogs', payload);
};
export const updateAdminBlog = (id, payload) => {
  return axiosClient.patch(`/api/admin/blogs/${id}`, payload);
};
export const deleteAdminBlog = (id) => {
  return axiosClient.delete(`/api/admin/blogs/${id}`);
};

// ============ ADMIN UPLOADS ============
/**
 * Upload multiple PDF files and return URLs
 * @param {File[]} files
 * @returns {Promise<{ urls: string[] }>}
 */
export const uploadAdminPdfFiles = (files = []) => {
  const form = new FormData();
  // Sử dụng 'files' để tương thích tốt với multer
  files.forEach((f) => form.append('files', f));
  // Ghi đè Content-Type về multipart/form-data để tránh mặc định 'application/json' từ axiosClient
  return axiosClient.post('/api/admin/uploads/pdf', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
    .then((res) => res.data);
};

/**
 * Projects: list/create/update/delete
 */
export const getAdminProjects = (params = {}) => {
  return axiosClient.get('/api/admin/projects', { params });
};
export const createAdminProject = (payload) => {
  return axiosClient.post('/api/admin/projects', payload);
};
export const updateAdminProject = (id, payload) => {
  return axiosClient.patch(`/api/admin/projects/${id}`, payload);
};
export const deleteAdminProject = (id) => {
  return axiosClient.delete(`/api/admin/projects/${id}`);
};

// ============ PUBLIC PROJECTS API ==========
/**
 * Get public projects (optional category filter: 'hardware' | 'software')
 * @param {Object} params - { category?: string }
 */
export const getPublicProjects = (params = {}) => {
  return axiosClient.get('/api/projects', { params });
};

/**
 * Get public project by id
 * @param {string} id
 */
export const getPublicProject = (id) => {
  return axiosClient.get(`/api/projects/${id}`);
};

// ============ PRODUCTS API (PUBLIC + ADMIN) ==========
/** Public products */
export const getProducts = (params = {}) => {
  return axiosClient.get('/api/products', { params });
};

/** Admin products */
export const getAdminProducts = (params = {}) => {
  return axiosClient.get('/api/admin/products', { params });
};
export const createAdminProduct = (payload) => {
  return axiosClient.post('/api/admin/products', payload);
};
export const updateAdminProduct = (id, payload) => {
  return axiosClient.patch(`/api/admin/products/${id}`, payload);
};
export const deleteAdminProduct = (id) => {
  return axiosClient.delete(`/api/admin/products/${id}`);
};

// ============ CUSTOMERS API (PUBLIC + ADMIN) ==========
/** Public customers */
export const getPublicCustomers = (params = {}) => {
  return axiosClient.get('/api/customers', { params });
};

/** Admin customers */
export const getAdminCustomers = (params = {}) => {
  return axiosClient.get('/api/admin/customers', { params });
};
export const createAdminCustomer = (payload) => {
  return axiosClient.post('/api/admin/customers', payload);
};
export const updateAdminCustomer = (id, payload) => {
  return axiosClient.patch(`/api/admin/customers/${id}`, payload);
};
export const deleteAdminCustomer = (id) => {
  return axiosClient.delete(`/api/admin/customers/${id}`);
};

// ============ POLICIES API (PUBLIC + ADMIN) ==========
/** Public policies */
export const getPublicPolicies = (params = {}) => {
  return axiosClient.get('/api/policies', { params });
};

/** Admin policies */
export const getAdminPolicies = (params = {}) => {
  return axiosClient.get('/api/admin/policies', { params });
};
export const createAdminPolicy = (payload) => {
  // For points fields, allow newline-separated strings and convert to arrays
  const normalize = (v) => Array.isArray(v)
    ? v
    : (typeof v === 'string' ? v.split('\n').map(s => s.trim()).filter(Boolean) : []);
  const body = {
    ...payload,
    points_vn: normalize(payload.points_vn),
    points_en: normalize(payload.points_en),
  };
  return axiosClient.post('/api/admin/policies', body);
};
export const updateAdminPolicy = (id, payload) => {
  const normalize = (v) => Array.isArray(v)
    ? v
    : (typeof v === 'string' ? v.split('\n').map(s => s.trim()).filter(Boolean) : []);
  const body = {
    ...payload,
    points_vn: normalize(payload.points_vn),
    points_en: normalize(payload.points_en),
  };
  return axiosClient.patch(`/api/admin/policies/${id}`, body);
};
export const deleteAdminPolicy = (id) => {
  return axiosClient.delete(`/api/admin/policies/${id}`);
};

// ============ PUBLIC SOLUTIONS API ==========
/**
 * Get public solutions (for website display)
 */
export const getPublicSolutions = (params = {}) => {
  return axiosClient.get('/api/solutions', { params });
};

/**
 * Get public solution by slug
 */
export const getPublicSolution = (slug) => {
  return axiosClient.get(`/api/solutions/${slug}`);
};

// ============ ADMIN SOLUTIONS API (REAL) ============
export const getAdminSolutions = (params = {}) => {
  return axiosClient.get('/api/admin/solutions', { params });
};
export const createAdminSolution = (payload) => {
  return axiosClient.post('/api/admin/solutions', payload);
};
export const updateAdminSolution = (id, payload) => {
  return axiosClient.patch(`/api/admin/solutions/${id}`, payload);
};
export const deleteAdminSolution = (id) => {
  return axiosClient.delete(`/api/admin/solutions/${id}`);
};

// ============ ADMIN MOCK STUBS (Users, Blogs, Projects) ============
// Temporary client-side datasets to unblock UI while backend endpoints are pending.
// These functions mimic axios responses: { data: { data: [...] } }

export const getAdminUsersStub = async ({ search = '' } = {}) => {
  const source = [
    { id: 1, name: 'Nguyen Van A', email: 'a@example.com', role: 'admin', status: 'active', date: '2024-09-15' },
    { id: 2, name: 'Tran Thi B', email: 'b@example.com', role: 'editor', status: 'inactive', date: '2024-10-02' },
    { id: 3, name: 'Le Van C', email: 'c@example.com', role: 'viewer', status: 'active', date: '2024-11-01' },
  ];
  const data = source.filter(u => (
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  ));
  return { data: { data } };
};

// Users CRUD stubs
export const createAdminUserStub = async (payload) => {
  const item = { id: Date.now(), date: new Date().toISOString().slice(0,10), ...payload };
  return { data: { success: true, data: item } };
};
export const updateAdminUserStub = async (id, payload) => {
  const item = { id, ...payload };
  return { data: { success: true, data: item } };
};
export const deleteAdminUserStub = async (id) => {
  return { data: { success: true, id } };
};

export const getAdminBlogsStub = async ({ search = '' } = {}) => {
  const source = [
    { id: 101, title: 'Giới thiệu giải pháp IoT', author: 'Admin', status: 'published', date: '2024-10-10' },
    { id: 102, title: 'Tự động hóa nhà máy', author: 'Editor', status: 'draft', date: '2024-11-01' },
    { id: 103, title: 'Giám sát năng lượng', author: 'Admin', status: 'published', date: '2024-11-05' },
  ];
  const data = source.filter(b => (
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  ));
  return { data: { data } };
};

// Blogs CRUD stubs
export const createAdminBlogStub = async (payload) => {
  const item = { id: Date.now(), date: new Date().toISOString().slice(0,10), ...payload };
  return { data: { success: true, data: item } };
};
export const updateAdminBlogStub = async (id, payload) => {
  const item = { id, ...payload };
  return { data: { success: true, data: item } };
};
export const deleteAdminBlogStub = async (id) => {
  return { data: { success: true, id } };
};

export const getAdminProjectsStub = async ({ search = '' } = {}) => {
  const source = [
    { id: 201, name: 'Dự án SCADA', owner: 'C&T', status: 'completed', date: '2024-08-30' },
    { id: 202, name: 'Hệ thống cân định lượng', owner: 'Nhà máy X', status: 'in_progress', date: '2024-10-15' },
    { id: 203, name: 'Quản lý năng lượng', owner: 'Nhà máy Y', status: 'planning', date: '2024-11-07' },
  ];
  const data = source.filter(p => (
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.owner.toLowerCase().includes(search.toLowerCase())
  ));
  return { data: { data } };
};

// Projects CRUD stubs
export const createAdminProjectStub = async (payload) => {
  const item = { id: Date.now(), date: new Date().toISOString().slice(0,10), ...payload };
  return { data: { success: true, data: item } };
};
export const updateAdminProjectStub = async (id, payload) => {
  const item = { id, ...payload };
  return { data: { success: true, data: item } };
};
export const deleteAdminProjectStub = async (id) => {
  return { data: { success: true, id } };
};

// ============ ADMIN SOLUTIONS MOCK STUBS ============
// Temporary client-side datasets for Solutions until backend endpoints are available.
// These functions mimic axios responses: { data: { data: [...] } }

export const getAdminSolutionsStub = async ({ search = '' } = {}) => {
  const source = [
    {
      _id: 'sol-1',
      slug: 'khu-vui-choi-giai-tri',
      title_vn: 'Khu vui chơi giải trí',
      title_en: 'Entertainment Area',
      image: '/images/solutions/giaitri.jpg',
      is_published: true,
      date: '2024-11-01'
    },
    {
      _id: 'sol-2',
      slug: 'can-tin-hoc-duong',
      title_vn: 'Căn tin học đường',
      title_en: 'School Canteen',
      image: '/images/solutions/cantin.jpg',
      is_published: true,
      date: '2024-11-02'
    },
    {
      _id: 'sol-3',
      slug: 'thu-tien-tu-dong',
      title_vn: 'Thu tiền tự động',
      title_en: 'Automatic Cash Collection',
      image: '/images/solutions/thutien.jpg',
      is_published: false,
      date: '2024-11-03'
    }
  ];
  const term = search.toLowerCase();
  const data = source.filter(s => (
    (s.title_vn || '').toLowerCase().includes(term) ||
    (s.title_en || '').toLowerCase().includes(term) ||
    (s.slug || '').toLowerCase().includes(term)
  ));
  return { data: { data } };
};

export const createAdminSolutionStub = async (payload) => {
  const item = {
    _id: `sol-${Date.now()}`,
    date: new Date().toISOString().slice(0,10),
    is_published: payload?.status === 'published' ? true : Boolean(payload?.is_published),
    title_vn: payload?.title_vn || '',
    title_en: payload?.title_en || '',
    slug: payload?.slug || '',
    image: payload?.image || ''
  };
  return { data: { success: true, data: item } };
};

export const updateAdminSolutionStub = async (id, payload) => {
  const item = {
    _id: id,
    date: new Date().toISOString().slice(0,10),
    is_published: payload?.status === 'published' ? true : Boolean(payload?.is_published),
    title_vn: payload?.title_vn,
    title_en: payload?.title_en,
    slug: payload?.slug,
    image: payload?.image
  };
  return { data: { success: true, data: item } };
};

export const deleteAdminSolutionStub = async (id) => {
  return { data: { success: true, id } };
};

export default {
  submitContact,
  adminLogin,
  getAdminStats,
  getAdminContacts,
  deleteAdminContact,
  deleteAdminContacts,
  getAdminUsersStub,
  createAdminUserStub,
  updateAdminUserStub,
  deleteAdminUserStub,
  // real admin APIs
  getAdminBlogs,
  createAdminBlog,
  updateAdminBlog,
  deleteAdminBlog,
  getAdminProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  getProducts,
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  getPublicCustomers,
  getAdminCustomers,
  createAdminCustomer,
  updateAdminCustomer,
  deleteAdminCustomer,
  getPublicProjects,
  getPublicProject,
  getAdminBlogsStub,
  createAdminBlogStub,
  updateAdminBlogStub,
  deleteAdminBlogStub,
  getAdminProjectsStub,
  createAdminProjectStub,
  updateAdminProjectStub,
  deleteAdminProjectStub,
  getAdminSolutions,
  createAdminSolution,
  updateAdminSolution,
  deleteAdminSolution,
  getAdminSolutionsStub,
  createAdminSolutionStub,
  updateAdminSolutionStub,
  deleteAdminSolutionStub,
  getPublicSolutions,
  getPublicSolution,
  getPublicPolicies,
  getAdminPolicies,
  createAdminPolicy,
  updateAdminPolicy,
  deleteAdminPolicy,
  sendAdminOtp,
  resetAdminPassword,
  adminForgotSendOtp,
  adminForgotResetPassword,
};
