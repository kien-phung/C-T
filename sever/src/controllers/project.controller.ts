import { handleGetProjectById, handleGetProjects } from "../repositories/project.repository copy.js";
import { RequestHandlerCustom } from "../utils/configs/custom.js";

export const getAllProjects = RequestHandlerCustom(
  async (req, res) => {
    const projects = await handleGetProjects();

    res.status(200).json({
      message: "Get all projects successfully",
      projects: projects
    });
  }
);

export const getProject = RequestHandlerCustom(
  async (req, res) => {
    const id = (req.params.id || req.query.id) as string;

    const project = await handleGetProjectById({ id });

    res.status(200).json({
      message: "Get project successfully",
      project: project
    });
  }
);