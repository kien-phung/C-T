import { Project } from "../models/project.model.js";
import { HandlerCustom } from "../utils/configs/custom.js";

export const handleGetProjects = HandlerCustom(async (data?: { category?: string }) => {
  const query: any = { $or: [ { status: 'published' }, { status: { $exists: false } } ] };
  if (data?.category) {
    query.category = data.category;
  }
  const projects = await Project
    .find(query)
    .sort({ createdAt: -1 })
    .exec();

  return projects;
});

export const handleGetProjectById = HandlerCustom(async (data: { id: string }) => {
  const projects = await Project
    .findById({ _id: data.id })
    .exec();

  return projects;
});