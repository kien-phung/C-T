import { DATABASE_MONGO_URL } from "../configs/constants.js";
import mongoose from 'mongoose';
import { createClient } from 'redis';

export const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 500)
    }
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

redisClient.on('connect', () => {
    console.log('Connected to Redis successfully');
});

export const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
        // Don't exit - Redis is optional for now
    }
};

export const connectMongoDB = async (maxRetries = 5, delay = 5000) => {
    let retries = 0;
    while (retries < maxRetries) {
        try {
            await mongoose.connect(DATABASE_MONGO_URL, {
                serverSelectionTimeoutMS: 5000,
                connectTimeoutMS: 10000
            });
            console.log('Connected to MongoDB successfully');
            return;
        } catch (err) {
            console.error(`Failed to connect to MongoDB (Attempt ${retries + 1}/${maxRetries}):`, err);
            retries++;
            if (retries >= maxRetries) {
                console.error('Max MongoDB retries reached. Exiting.');
                process.exit(1);
            }
            console.log(`Retrying MongoDB in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

export default async function connectDatabase() {
    await connectRedis();
    await connectMongoDB();
}