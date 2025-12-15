import { RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";
import { Project } from "../models/project.model.js";

/**
 * List projects (admin)
 */
export const listAdminProjects = RequestHandlerCustom(async (req, res) => {
  const { page = 1, limit = 20, search = '' } = req.query as any;
  const skip = (Number(page) - 1) * Number(limit);

  const searchFilter = search
    ? {
        $or: [
          { title: { $regex: String(search), $options: 'i' } },
          { description_vn: { $regex: String(search), $options: 'i' } },
          { description_en: { $regex: String(search), $options: 'i' } },
          { client_name: { $regex: String(search), $options: 'i' } },
        ],
      }
    : {};

  const [items, total] = await Promise.all([
    Project.find(searchFilter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Project.countDocuments(searchFilter),
  ]);

  res.status(200).json({ success: true, data: items, meta: { page: Number(page), limit: Number(limit), total } });
});

/**
 * Create project (admin)
 */
export const createAdminProject = RequestHandlerCustom(async (req, res) => {
  const data = parseRequestData(req);
  const project = await Project.create({
    title: data.title,
    description_vn: data.description_vn,
    description_en: data.description_en,
    thumbnail: data.thumbnail,
    client_name: data.client_name,
    category: data.category,
    status: data.status,
  });
  res.status(201).json({ success: true, data: project });
  try { getIO().emit('projects.changed', { type: 'created', data: project }); } catch {}
});

/**
 * Update project (admin)
 */
export const updateAdminProject = RequestHandlerCustom(async (req, res) => {
  const id = req.params.id;
  const data = parseRequestData(req);
  const project = await Project.findByIdAndUpdate(
    id,
    {
      $set: {
        title: data.title,
        description_vn: data.description_vn,
        description_en: data.description_en,
        thumbnail: data.thumbnail,
        client_name: data.client_name,
        category: data.category,
        status: data.status,
      },
    },
    { new: true }
  );
  res.status(200).json({ success: true, data: project });
  try { getIO().emit('projects.changed', { type: 'updated', data: project }); } catch {}
});

/**
 * Delete project (admin)
 */
export const deleteAdminProject = RequestHandlerCustom(async (req, res) => {
  const id = req.params.id;
  await Project.findByIdAndDelete(id);
  res.status(200).json({ success: true, id });
  try { getIO().emit('projects.changed', { type: 'deleted', id }); } catch {}
});
import { getIO } from "../utils/libs/socket.js";