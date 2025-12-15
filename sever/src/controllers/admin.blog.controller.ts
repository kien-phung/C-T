import { RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";
import { Blog } from "../models/blog.model.js";
import { getIO } from "../utils/libs/socket.js";

/**
 * List blogs (admin)
 */
export const listAdminBlogs = RequestHandlerCustom(async (req, res) => {
  const { page = 1, limit = 20, search = '', is_published } = req.query as any;
  const skip = (Number(page) - 1) * Number(limit);

  const searchFilter = search
    ? {
        $or: [
          { title_vn: { $regex: String(search), $options: 'i' } },
          { title_en: { $regex: String(search), $options: 'i' } },
          { description_vn: { $regex: String(search), $options: 'i' } },
          { description_en: { $regex: String(search), $options: 'i' } },
          { category_vn: { $regex: String(search), $options: 'i' } },
          { category_en: { $regex: String(search), $options: 'i' } },
        ],
      }
    : {};

  const pubFilter = typeof is_published !== 'undefined' ? { is_published: is_published === 'true' } : {};

  const filter = { ...searchFilter, ...pubFilter } as any;

  const [items, total] = await Promise.all([
    Blog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Blog.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: items,
    meta: { page: Number(page), limit: Number(limit), total },
  });
});

/**
 * Create blog (admin)
 */
export const createAdminBlog = RequestHandlerCustom(async (req, res) => {
  const data = parseRequestData(req);
  const blog = await Blog.create({
    title_vn: data.title_vn,
    title_en: data.title_en,
    description_vn: data.description_vn,
    description_en: data.description_en,
    category_vn: data.category_vn,
    category_en: data.category_en,
    thumbnail: data.thumbnail,
    published_date: data.published_date,
    external_url: data.external_url,
    is_external: Boolean(data.is_external),
    is_published: Boolean(data.is_published),
  });

  res.status(201).json({ success: true, data: blog });
  try { getIO().emit('blogs.changed', { type: 'created', data: blog }); } catch {}
});

/**
 * Update blog (admin)
 */
export const updateAdminBlog = RequestHandlerCustom(async (req, res) => {
  const id = req.params.id;
  const data = parseRequestData(req);

  const blog = await Blog.findByIdAndUpdate(
    id,
    {
      $set: {
        title_vn: data.title_vn,
        title_en: data.title_en,
        description_vn: data.description_vn,
        description_en: data.description_en,
        category_vn: data.category_vn,
        category_en: data.category_en,
        thumbnail: data.thumbnail,
        published_date: data.published_date,
        external_url: data.external_url,
        is_external: data.is_external,
        is_published: data.is_published,
      },
    },
    { new: true }
  );

  res.status(200).json({ success: true, data: blog });
  try { getIO().emit('blogs.changed', { type: 'updated', data: blog }); } catch {}
});

/**
 * Delete blog (admin)
 */
export const deleteAdminBlog = RequestHandlerCustom(async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndDelete(id);
  res.status(200).json({ success: true, id });
  try { getIO().emit('blogs.changed', { type: 'deleted', id }); } catch {}
});