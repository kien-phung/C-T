import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { ErrorCustom } from "../custom.js";

/**
 * Middleware ghi log các request
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const isProd = process.env.NODE_ENV === 'production';
    const verbose = process.env.LOG_VERBOSE === 'true';
    const logRequests = process.env.LOG_REQUESTS === 'true';
    const skipPaths = [
        '/favicon.ico',
        '/api/socket.io/', // websocket handshake + polls
    ];
    const shouldSkip = skipPaths.some(p => req.path.startsWith(p)) || req.method === 'OPTIONS' || req.method === 'HEAD';

    // Minimal, non-blocking logging
    if (!shouldSkip && logRequests) {
        const start = Date.now();
        res.on('finish', () => {
            const ms = Date.now() - start;
            console.log(`📨 ${req.method} ${req.originalUrl} → ${res.statusCode} (${ms}ms)`);
            if (!isProd && verbose) {
                if (Object.keys(req.query).length > 0) console.log('  • Query:', req.query);
                if (Object.keys(req.body).length > 0) console.log('  • Body:', req.body);
                // Headers only when explicitly verbose to avoid noise
                console.log('  • UA:', req.headers['user-agent']);
            }
        });
    }
    next();
};

/**
 * Middleware xử lý và trả về lỗi
 */
export const errorResponse: ErrorRequestHandler = (err: ErrorCustom, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    // Log compact error to reduce terminal noise
    console.error(`❌ Error ${status} ${req.method} ${req.originalUrl}: ${message}`);

    return res.status(status).json({
        success: false,
        status,
        message,
    });
};

/**
 * Biến đếm số lượng request
 */
let requests = 0;

/**
 * Middleware đếm và ghi nhận số lượng request
 */
export const checkQPS = (req: Request, res: Response, next: NextFunction) => {
    requests++;
    next();
};