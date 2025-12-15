import { RequestHandlerCustom } from '../utils/configs/custom.js';
import { parseRequestData } from '../utils/configs/helper.js';
import { Policy } from '../models/policy.model.js';
import { getIO } from '../utils/libs/socket.js';

export const listAdminPolicies = RequestHandlerCustom(async (req, res) => {
  const { page = 1, limit = 20, search = '', is_published } = req.query as any;
  const skip = (Number(page) - 1) * Number(limit);

  const searchFilter = search
    ? {
        $or: [
          { title_vn: { $regex: String(search), $options: 'i' } },
          { title_en: { $regex: String(search), $options: 'i' } },
          { description_vn: { $regex: String(search), $options: 'i' } },
          { description_en: { $regex: String(search), $options: 'i' } },
          { slug: { $regex: String(search), $options: 'i' } },
        ],
      }
    : {};

  const pubFilter = typeof is_published !== 'undefined' ? { is_published: is_published === 'true' } : {};
  const filter = { ...searchFilter, ...pubFilter } as any;

  const [items, total] = await Promise.all([
    Policy.find(filter).sort({ display_order: 1, createdAt: -1 }).skip(skip).limit(Number(limit)),
    Policy.countDocuments(filter),
  ]);

  res.status(200).json({ success: true, data: items, meta: { page: Number(page), limit: Number(limit), total } });
});

/** Get single policy (admin) */
export const getAdminPolicyById = RequestHandlerCustom(async (req, res) => {
  const id = req.params.id;
  const item = await Policy.findById(id);
  res.status(200).json({ success: true, data: item });
});

export const createAdminPolicy = RequestHandlerCustom(async (req, res) => {
  const data = parseRequestData(req);
  const item = await Policy.create({
    slug: data.slug,
    title_vn: data.title_vn,
    title_en: data.title_en,
    description_vn: data.description_vn,
    description_en: data.description_en,
    points_vn: Array.isArray(data.points_vn) ? data.points_vn : (data.points_vn ? String(data.points_vn).split('\n').filter(Boolean) : undefined),
    points_en: Array.isArray(data.points_en) ? data.points_en : (data.points_en ? String(data.points_en).split('\n').filter(Boolean) : undefined),
    is_published: Boolean(data.is_published),
    display_order: typeof data.display_order !== 'undefined' ? Number(data.display_order) : undefined,
  });
  res.status(201).json({ success: true, data: item });
  try { getIO().emit('policies.changed', { type: 'created', data: item }); } catch {}
});

export const updateAdminPolicy = RequestHandlerCustom(async (req, res) => {
  const id = req.params.id;
  const data = parseRequestData(req);
  const item = await Policy.findByIdAndUpdate(
    id,
    {
      $set: {
        slug: data.slug,
        title_vn: data.title_vn,
        title_en: data.title_en,
        description_vn: data.description_vn,
        description_en: data.description_en,
        points_vn: Array.isArray(data.points_vn) ? data.points_vn : (data.points_vn ? String(data.points_vn).split('\n').filter(Boolean) : undefined),
        points_en: Array.isArray(data.points_en) ? data.points_en : (data.points_en ? String(data.points_en).split('\n').filter(Boolean) : undefined),
        is_published: typeof data.is_published !== 'undefined' ? Boolean(data.is_published) : undefined,
        display_order: typeof data.display_order !== 'undefined' ? Number(data.display_order) : undefined,
      },
    },
    { new: true }
  );
  res.status(200).json({ success: true, data: item });
  try { getIO().emit('policies.changed', { type: 'updated', data: item }); } catch {}
});

export const deleteAdminPolicy = RequestHandlerCustom(async (req, res) => {
  const id = req.params.id;
  await Policy.findByIdAndDelete(id);
  res.status(200).json({ success: true, id });
  try { getIO().emit('policies.changed', { type: 'deleted', id }); } catch {}
});