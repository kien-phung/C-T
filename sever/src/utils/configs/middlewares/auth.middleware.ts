import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

export interface JWTPayload {
    userId: string;
    email: string;
    isAdmin: boolean;
}

// Extend Express Request to include user info
declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
            userId?: string;
            isAuth?: boolean;
        }
    }
}

/**
 * Middleware to verify JWT token and authenticate user
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get token from Authorization header or cookies
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith('Bearer ')
            ? authHeader.substring(7)
            : req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Không có token xác thực. Vui lòng đăng nhập.'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

        // Attach user info to request
        req.user = decoded;
        req.userId = decoded.userId;
        req.isAuth = true;

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: 'Token đã hết hạn. Vui lòng đăng nhập lại.'
            });
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: 'Token không hợp lệ.'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Lỗi xác thực.'
        });
    }
};

/**
 * Middleware to check if user is admin
 */
export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.isAdmin) {
        return res.status(403).json({
            success: false,
            message: 'Bạn không có quyền truy cập.'
        });
    }
    next();
};

/**
 * Generate JWT token
 */
export const generateToken = (payload: JWTPayload): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '7d' // Token expires in 7 days
    });
};

/**
 * Optional auth middleware - doesn't fail if no token
 */
export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith('Bearer ')
            ? authHeader.substring(7)
            : req.cookies?.token;

        if (token) {
            const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
            req.user = decoded;
            req.userId = decoded.userId;
            req.isAuth = true;
        }
    } catch (error) {
        // Ignore errors for optional auth
    }
    next();
};
