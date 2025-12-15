import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { PORT } from './utils/configs/constants.js';
import { createServer } from 'http';
import { initSocket } from './utils/libs/socket.js';
import connectDatabase from './utils/libs/database.js';
import { errorResponse } from './utils/configs/middlewares/logging.middleware.js';
import { applyMiddlewares } from './utils/configs/middlewares/middlewares.js';
import router from './routes/routes.js';

const app = express();
const httpServer = createServer(app);

// Áp dụng tất cả middleware
applyMiddlewares(app);

// Kết nối đến cơ sở dữ liệu và khởi tạo root user
connectDatabase();

// Đăng ký tất cả các route với tiền tố /api
app.use("/api", router);

// Serve uploaded files statically at /files
app.use('/files', express.static(path.resolve('uploads')));

// Add error handling middleware AFTER routes
app.use(errorResponse);

// Khởi tạo Socket.IO sau khi tạo HTTP server
initSocket(httpServer);

httpServer.listen(parseInt(PORT), '0.0.0.0', () => {
  console.log(`🚀 Sever đang chạy trên cổng ${PORT} (0.0.0.0)`);
  console.log(`📱 Accessible from: http://192.168.100.254:${PORT}`);
});
