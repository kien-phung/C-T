import bcrypt from 'bcrypt';
import { RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";
import { Admin } from "../models/admin.model.js";

/**
 * Get all admin users (Admin only)
 * Supports: page, limit, search (email/full_name), is_active
 */
export const getAllAdminUsers = RequestHandlerCustom(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const skip = (page - 1) * limit;

  const filter: any = {};
  if (req.query.search) {
    filter.$or = [
      { email: { $regex: req.query.search, $options: 'i' } },
      { full_name: { $regex: req.query.search, $options: 'i' } },
    ];
  }
  if (typeof req.query.is_active !== 'undefined') {
    filter.is_active = req.query.is_active === 'true';
  }

  const total = await Admin.countDocuments(filter);
  const users = await Admin.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-password');

  res.status(200).json({
    success: true,
    data: {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
});

/** Get single admin user by ID */
export const getAdminUserById = RequestHandlerCustom(async (req, res) => {
  const { id } = req.params;
  const user = await Admin.findById(id).select('-password');
  if (!user) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
  }
  res.status(200).json({ success: true, data: { user } });
});

/** Create new admin user */
export const createAdminUser = RequestHandlerCustom(async (req, res) => {
  const data = parseRequestData(req);
  const { email, password, full_name, is_active } = data;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email và mật khẩu là bắt buộc' });
  }

  const existing = await Admin.findOne({ email });
  if (existing) {
    return res.status(409).json({ success: false, message: 'Email đã tồn tại' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const created = await Admin.create({
    email,
    password: hashedPassword,
    full_name: full_name || 'Administrator',
    is_active: typeof is_active === 'boolean' ? is_active : true,
  });

  const user = created.toJSON();
  // password removed by toJSON
  res.status(201).json({ success: true, data: user });
});

/** Update admin user */
export const updateAdminUser = RequestHandlerCustom(async (req, res) => {
  const { id } = req.params;
  const data = parseRequestData(req);

  const update: any = {};
  if (typeof data.full_name !== 'undefined') update.full_name = data.full_name;
  if (typeof data.is_active !== 'undefined') update.is_active = !!data.is_active;
  if (typeof data.password === 'string' && data.password.trim()) {
    update.password = await bcrypt.hash(data.password, 10);
  }

  const user = await Admin.findByIdAndUpdate(id, update, { new: true }).select('-password');
  if (!user) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
  }
  res.status(200).json({ success: true, data: user });
});

/** Delete admin user */
export const deleteAdminUser = RequestHandlerCustom(async (req, res) => {
  const { id } = req.params;
  const deleted = await Admin.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
  }
  res.status(200).json({ success: true, message: 'Đã xóa người dùng thành công' });
});