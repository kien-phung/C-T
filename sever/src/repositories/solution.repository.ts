import { Solution } from "../models/solution.model.js";
import { Admin } from "../models/admin.model.js";
import { HandlerCustom } from "../utils/configs/custom.js";
import bcrypt from 'bcrypt';

export const handleGetSolutions = HandlerCustom(async () => {
    const solutions = await Solution
        .find()
        .sort({ createdAt: -1 })
        .exec();

    return solutions;
});

export const handleGetSolutionBySlug = HandlerCustom(async (data: { slug: string }) => {
    const solution = await Solution
        .findOne({ slug: data.slug })
        .exec();

    return solution;
});

// User/Admin authentication functions
export const handleCreateUser = HandlerCustom(async (data: { email: string; password: string; full_name?: string }) => {
    const existingUser = await Admin.findOne({ email: data.email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await Admin.create({
        email: data.email,
        password: hashedPassword,
        full_name: data.full_name || 'Administrator',
        is_active: true
    });

    return newUser;
});

export const handleGetUserByEmail = HandlerCustom(async (data: { email: string }) => {
    const user = await Admin.findOne({ email: data.email });
    return user;
});