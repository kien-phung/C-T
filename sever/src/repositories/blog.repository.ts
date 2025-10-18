import { Blog } from "../models/blog.model.js";
import { HandlerCustom } from "../utils/configs/custom.js";

export const handleGetBlogs = HandlerCustom(async (data: { limit?: number }) => {
    const query = Blog.find();

    if (data.limit) {
        query.sort({ createdAt: -1 }).limit(data.limit);
    }

    const blogs = await query.exec();

    return blogs;
});



export const handleGetBlogById = HandlerCustom(async (data: { id: string }) => {
    const blog = await Blog
        .findById({ _id: data.id })
        .exec();

    return blog;
});