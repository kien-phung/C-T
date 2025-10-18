import express from "express";
import { getAllProjects, getProject } from "../controllers/project.controller.js";

const projectRoute = express.Router();

// GET /api/projects - get all projects (supports category query param)
projectRoute.get("/", getAllProjects);

// GET /api/projects/:id - get a specific project by ID
projectRoute.get("/:id", getProject);

export default projectRoute;