import cookieParser from "cookie-parser";
import express, { Application, RequestHandler } from 'express';
import { CORSGuard, injectionGuard } from "./security.middleware.js";
import { checkQPS, requestLogger } from "./logging.middleware.js";
import { acceptFormdata } from "./upload.middleware.js";

export const applyMiddlewares = (app: Application): void => {
    // Security middlewares
    app.use(CORSGuard);                        // CORS protection
    app.use(cookieParser() as unknown as RequestHandler);                   // Parse cookies
    app.use(express.json());                   // Parse JSON bodies
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

    // Upload middleware
    app.use(acceptFormdata);                   // Handle multipart/form-data

    // Logging middleware
    app.use(requestLogger);                    // Log requests

    // Performance middleware
    app.use(checkQPS);                         // Count requests per second

    // Security middleware
    app.use(injectionGuard);                   // Protect against NoSQL injection
}