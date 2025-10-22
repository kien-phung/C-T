import axiosClient from './axiosClient';

// ============ PUBLIC API (Contact Form) ============

/**
 * Submit contact form (appointment, contact, newsletter)
 * @param {Object} data - Form data
 * @returns {Promise}
 */
export const submitContact = (data) => {
  return axiosClient.post('/api/contacts', data);
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

export default {
  submitContact,
  adminLogin,
  getAdminStats,
  getAdminContacts,
  deleteAdminContact,
  deleteAdminContacts,
};
