import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT!;
export const NODE_ENV = process.env.NODE_ENV!;
export const CLIENT_URL = process.env.CLIENT_URL!;

export const DATABASE_MONGO_URL = process.env.DATABASE_MONGO_URL!;

export const EMAIL_USER = process.env.EMAIL_USER!;
export const EMAIL_PASS = process.env.EMAIL_PASS!;

export const ROOT_EMAIL = process.env.ROOT_EMAIL!;
export const ROOT_PASSWORD = process.env.ROOT_PASSWORD!;

export const TOTAL_MS_IN_DAY = 24 * 60 * 60 * 1000;

export const PRIVATE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";