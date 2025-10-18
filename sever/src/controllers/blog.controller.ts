import { handleGetBlogById, handleGetBlogs } from "../repositories/blog.repository.js";
import { RequestHandlerCustom } from "../utils/configs/custom.js";

export const getAllBlogs = RequestHandlerCustom(
  async (req, res) => {
    const blogs = await handleGetBlogs({});

    res.status(200).json({
      message: "Get all blogs successfully",
      blogs: blogs
    });
  }
);

export const getBlog = RequestHandlerCustom(
  async (req, res) => {
    const id = (req.params.id || req.query.id) as string;

    const blog = await handleGetBlogById({ id });

    res.status(200).json({
      message: "Get blog successfully",
      blog: blog
    });
  }
);