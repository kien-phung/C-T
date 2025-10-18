import express from "express";
import {
  getAllBlogs,
  getBlog,
} from "../controllers/blog.controller.js";

const blogRoute = express.Router();

// GET /api/blogs - get all blogs with query parameters
blogRoute.get("/", getAllBlogs);

// GET /api/blogs/:id - get blog by id
blogRoute.get("/:id", getBlog);

export default blogRoute;