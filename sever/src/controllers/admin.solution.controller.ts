import { RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";
import { Solution } from "../models/solution.model.js";
import { getIO } from "../utils/libs/socket.js";

/**
 * List solutions (admin)
 * Supports: page, limit, search, is_published
 */
export const listAdminSolutions = RequestHandlerCustom(async (req, res) => {
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
    Solution.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Solution.countDocuments(filter),
  ]);

  res.status(200).json({ success: true, data: items, meta: { page: Number(page), limit: Number(limit), total } });
});

/**
 * Create solution (admin)
 */
export const createAdminSolution = RequestHandlerCustom(async (req, res) => {
  const data = parseRequestData(req);
  const solution = await Solution.create({
    slug: data.slug,
    title_vn: data.title_vn,
    title_en: data.title_en,
    description_vn: data.description_vn,
    description_en: data.description_en,
    image: data.image,
    is_published: Boolean(data.is_published),
    display_order: typeof data.display_order !== 'undefined' ? Number(data.display_order) : undefined,
  });
  res.status(201).json({ success: true, data: solution });
  try { getIO().emit('solutions.changed', { type: 'created', data: solution }); } catch {}
});

/**
 * Update solution (admin)
 */
export const updateAdminSolution = RequestHandlerCustom(async (req, res) => {
  const id = req.params.id;
  const data = parseRequestData(req);
  const solution = await Solution.findByIdAndUpdate(
    id,
    {
      $set: {
        slug: data.slug,
        title_vn: data.title_vn,
        title_en: data.title_en,
        description_vn: data.description_vn,
        description_en: data.description_en,
        image: data.image,
        is_published: typeof data.is_published !== 'undefined' ? Boolean(data.is_published) : undefined,
        display_order: typeof data.display_order !== 'undefined' ? Number(data.display_order) : undefined,
      },
    },
    { new: true }
  );
  res.status(200).json({ success: true, data: solution });
  try { getIO().emit('solutions.changed', { type: 'updated', data: solution }); } catch {}
});

/**
 * Delete solution (admin)
 */
export const deleteAdminSolution = RequestHandlerCustom(async (req, res) => {
  const id = req.params.id;
  await Solution.findByIdAndDelete(id);
  res.status(200).json({ success: true, id });
  try { getIO().emit('solutions.changed', { type: 'deleted', id }); } catch {}
});