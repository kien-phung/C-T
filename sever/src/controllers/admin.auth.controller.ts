import bcrypt from 'bcrypt';
import { RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";
import { Admin } from "../models/admin.model.js";
import { generateToken } from "../utils/configs/middlewares/auth.middleware.js";
import { ROOT_EMAIL, ROOT_PASSWORD } from "../utils/configs/constants.js";

export interface ILoginData {
    email: string;
    password: string;
}

/**
 * Admin Login
 */
export const adminLogin = RequestHandlerCustom(async (req, res) => {
    const data: ILoginData = parseRequestData(req);

    // Validate input
    if (!data.email || !data.password) {
        return res.status(400).json({
            success: false,
            message: "Email và mật khẩu là bắt buộc"
        });
    }

    // Check if this is root admin login (from .env)
    if (data.email === ROOT_EMAIL && data.password === ROOT_PASSWORD) {
        // Find or create root admin in database
        let admin = await Admin.findOne({ email: ROOT_EMAIL });

        if (!admin) {
            // Create root admin with hashed password
            const hashedPassword = await bcrypt.hash(ROOT_PASSWORD, 10);
            admin = await Admin.create({
                email: ROOT_EMAIL,
                password: hashedPassword,
                full_name: 'Root Administrator',
                is_active: true
            });
        }

        // Update last login
        admin.last_login = new Date();
        await admin.save();

        // Generate JWT token
        const token = generateToken({
            userId: admin._id.toString(),
            email: admin.email,
            isAdmin: true
        });

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: 'lax'
        });

        return res.status(200).json({
            success: true,
            message: "Đăng nhập thành công",
            data: {
                admin: {
                    id: admin._id,
                    email: admin.email,
                    full_name: admin.full_name
                },
                token
            }
        });
    }

    // Check database for admin
    const admin = await Admin.findOne({ email: data.email });

    if (!admin) {
        return res.status(401).json({
            success: false,
            message: "Email hoặc mật khẩu không đúng"
        });
    }

    // Check if admin is active
    if (!admin.is_active) {
        return res.status(403).json({
            success: false,
            message: "Tài khoản đã bị vô hiệu hóa"
        });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(data.password, admin.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            message: "Email hoặc mật khẩu không đúng"
        });
    }

    // Update last login
    admin.last_login = new Date();
    await admin.save();

    // Generate JWT token
    const token = generateToken({
        userId: admin._id.toString(),
        email: admin.email,
        isAdmin: true
    });

    // Set cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'lax'
    });

    res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        data: {
            admin: {
                id: admin._id,
                email: admin.email,
                full_name: admin.full_name
            },
            token
        }
    });
});

/**
 * Admin Logout
 */
export const adminLogout = RequestHandlerCustom(async (req, res) => {
    res.clearCookie('token');

    res.status(200).json({
        success: true,
        message: "Đăng xuất thành công"
    });
});

/**
 * Get current admin info
 */
export const getCurrentAdmin = RequestHandlerCustom(async (req, res) => {
    const adminId = req.userId;

    const admin = await Admin.findById(adminId).select('-password');

    if (!admin) {
        return res.status(404).json({
            success: false,
            message: "Không tìm thấy admin"
        });
    }

    res.status(200).json({
        success: true,
        data: {
            admin: {
                id: admin._id,
                email: admin.email,
                full_name: admin.full_name,
                last_login: admin.last_login
            }
        }
    });
});

/**
 * Verify token (check if still valid)
 */
export const verifyToken = RequestHandlerCustom(async (req, res) => {
    // If middleware passed, token is valid
    res.status(200).json({
        success: true,
        message: "Token hợp lệ",
        data: {
            user: req.user
        }
    });
});
