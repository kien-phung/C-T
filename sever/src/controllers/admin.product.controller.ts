import { RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";
import { Product } from "../models/product.model.js";
import { getIO } from "../utils/libs/socket.js";

/** List products (admin) */
export const listAdminProducts = RequestHandlerCustom(async (req, res) => {
  const { page = 1, limit = 20, search = '', category } = req.query as any;
  const skip = (Number(page) - 1) * Number(limit);

  const searchFilter = search
    ? {
        $or: [
          { name_vn: { $regex: String(search), $options: 'i' } },
          { name_en: { $regex: String(search), $options: 'i' } },
          { description: { $regex: String(search), $options: 'i' } },
        ],
      }
    : {};

  const categoryFilter = category ? { category } : {};
  const filter = { ...searchFilter, ...categoryFilter } as any;

  const [items, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Product.countDocuments(filter),
  ]);

  res.status(200).json({ success: true, data: items, meta: { page: Number(page), limit: Number(limit), total } });
});

/** Create product (admin) */
export const createAdminProduct = RequestHandlerCustom(async (req, res) => {
  const data = parseRequestData(req);
  const toArray = (v: any): string[] => {
    if (!v && v !== '') return [];
    if (Array.isArray(v)) return v.filter(Boolean).map((s: any) => String(s).trim()).filter(Boolean);
    // accept comma-separated
    return String(v)
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);
  };
  const product = await Product.create({
    name_vn: data.name_vn,
    name_en: data.name_en,
    description: data.description,
    image: data.image,
    price: data.price,
    pdf_url: data.pdf_url,
    pdf_urls: (() => {
      const arr = toArray(data.pdf_urls);
      if (arr.length === 0 && data.pdf_url) return [String(data.pdf_url).trim()].filter(Boolean);
      return arr;
    })(),
    // legacy features
    features: Array.isArray(data.features) ? data.features : [],
    // bilingual features
    features_vn: toArray(data.features_vn),
    features_en: toArray(data.features_en),
    category: data.category,
    is_published: data.is_published !== undefined ? Boolean(data.is_published) : true,
  });
  res.status(201).json({ success: true, data: product });
  try { getIO().emit('products.changed', { type: 'created', data: product }); } catch {}
});

/** Update product (admin) */
export const updateAdminProduct = RequestHandlerCustom(async (req, res) => {
  const id = req.params.id;
  const data = parseRequestData(req);
  const toArrayOrUndef = (v: any): string[] | undefined => {
    if (typeof v === 'undefined') return undefined;
    if (Array.isArray(v)) return v.filter(Boolean).map((s: any) => String(s).trim()).filter(Boolean);
    return String(v)
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);
  };
  const product = await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        name_vn: data.name_vn,
        name_en: data.name_en,
        description: data.description,
        image: data.image,
        price: data.price,
        pdf_url: data.pdf_url,
        pdf_urls: toArrayOrUndef(data.pdf_urls),
        features: Array.isArray(data.features) ? data.features : undefined,
        features_vn: toArrayOrUndef(data.features_vn),
        features_en: toArrayOrUndef(data.features_en),
        category: data.category,
        is_published: typeof data.is_published !== 'undefined' ? Boolean(data.is_published) : undefined,
      },
    },
    { new: true }
  );
  res.status(200).json({ success: true, data: product });
  try { getIO().emit('products.changed', { type: 'updated', data: product }); } catch {}
});

/** Delete product (admin) */
export const deleteAdminProduct = RequestHandlerCustom(async (req, res) => {
  const id = req.params.id;
  await Product.findByIdAndDelete(id);
  res.status(200).json({ success: true, id });
  try { getIO().emit('products.changed', { type: 'deleted', id }); } catch {}
});
