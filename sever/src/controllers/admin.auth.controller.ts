import bcrypt from 'bcrypt';
import { RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";
import { Admin } from "../models/admin.model.js";
import { generateToken } from "../utils/configs/middlewares/auth.middleware.js";
import { sendMail, EmailTemplate } from "../utils/libs/mailer.js";
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

/**
 * Send OTP to current admin's email for password reset
 */
export const sendOtp = RequestHandlerCustom(async (req, res) => {
    const adminId = req.userId;
    const admin = await Admin.findById(adminId);

    if (!admin) {
        return res.status(404).json({ success: false, message: "Không tìm thấy admin" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    admin.otp_code = hashedOtp;
    admin.otp_expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await admin.save();

    // Send OTP email
    await sendMail(admin.email, "Mã xác minh (OTP)", EmailTemplate.SEND_OTP, [
        ["otp", otp],
        ["email", admin.email],
        ["expires", "10 phút"],
    ]);

    res.status(200).json({ success: true, message: "Đã gửi OTP đến email của bạn" });
});

/**
 * Reset password using OTP
 */
export const resetPasswordWithOtp = RequestHandlerCustom(async (req, res) => {
    const adminId = req.userId;
    const data = parseRequestData(req);
    const { otp, new_password } = data;

    if (!otp || !new_password) {
        return res.status(400).json({ success: false, message: "OTP và mật khẩu mới là bắt buộc" });
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
        return res.status(404).json({ success: false, message: "Không tìm thấy admin" });
    }

    if (!admin.otp_code || !admin.otp_expires || admin.otp_expires.getTime() < Date.now()) {
        return res.status(400).json({ success: false, message: "OTP không hợp lệ hoặc đã hết hạn" });
    }

    const otpValid = await bcrypt.compare(otp, admin.otp_code);
    if (!otpValid) {
        return res.status(400).json({ success: false, message: "OTP không đúng" });
    }

    // Update password
    const hashedPassword = await bcrypt.hash(new_password, 10);
    admin.password = hashedPassword;
    // Clear OTP fields
    admin.otp_code = undefined;
    admin.otp_expires = undefined;
    await admin.save();

    res.status(200).json({ success: true, message: "Đổi mật khẩu thành công" });
});

/**
 * Public: Send OTP to admin email (forgot password flow)
 * Accepts { email } without requiring authentication
 */
export const sendOtpByEmail = RequestHandlerCustom(async (req, res) => {
    const data = parseRequestData(req);
    const { email } = data as { email?: string };

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ success: false, message: 'Email là bắt buộc' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy admin' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    admin.otp_code = hashedOtp;
    admin.otp_expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await admin.save();

    await sendMail(admin.email, 'Mã xác minh (OTP)', EmailTemplate.SEND_OTP, [
        ['otp', otp],
        ['email', admin.email],
        ['expires', '10 phút'],
    ]);

    res.status(200).json({ success: true, message: 'Đã gửi OTP đến email của bạn' });
});

/**
 * Public: Reset password with email + OTP (forgot password flow)
 */
export const resetPasswordByEmail = RequestHandlerCustom(async (req, res) => {
    const data = parseRequestData(req);
    const { email, otp, new_password } = data as { email?: string; otp?: string; new_password?: string };

    if (!email || !otp || !new_password) {
        return res.status(400).json({ success: false, message: 'Email, OTP và mật khẩu mới là bắt buộc' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy admin' });
    }

    if (!admin.otp_code || !admin.otp_expires || admin.otp_expires.getTime() < Date.now()) {
        return res.status(400).json({ success: false, message: 'OTP không hợp lệ hoặc đã hết hạn' });
    }

    const otpValid = await bcrypt.compare(otp, admin.otp_code);
    if (!otpValid) {
        return res.status(400).json({ success: false, message: 'OTP không đúng' });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    admin.password = hashedPassword;
    admin.otp_code = undefined;
    admin.otp_expires = undefined;
    await admin.save();

    res.status(200).json({ success: true, message: 'Đổi mật khẩu thành công' });
});
