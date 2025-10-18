import multer from 'multer';

// Sử dụng memoryStorage để lưu trữ tệp trong bộ nhớ thay vì trên đĩa
// Điều này ngăn chặn việc tạo các tệp tạm thời trong thư mục uploads
const storage = multer.memoryStorage();

// Lọc file upload
const fileFilter = (req: any, file: any, cb: any) => {
    // Chấp nhận hình ảnh và các file phổ biến
    const allowedFileTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Định dạng file không được hỗ trợ!'), false);
    }
};

// Cấu hình upload
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Giới hạn 5MB
    }
});

// Hàm chuyển đổi formdata sang object
export const formDataToObject = (req: any) => {
    const result = { ...req.body };

    // Thêm các file đã upload vào object (nếu có)
    if (req.file) {
        result.file = {
            fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            size: req.file.size,
            buffer: req.file.buffer
        };
    }

    if (req.files && Array.isArray(req.files)) {
        // Xử lý files là một mảng (từ upload.any())
        result.files = req.files.map((file: any) => ({
            fieldname: file.fieldname,
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            size: file.size,
            buffer: file.buffer
        }));
    }

    return result;
};

// Hàm xử lý các loại dữ liệu khác nhau
export const parseRequestData = (req: any) => {
    const contentType = req.headers['content-type'] || '';

    if (contentType.includes('multipart/form-data')) {
        return formDataToObject(req);
    } else if (contentType.includes('application/json')) {
        return req.body;
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
        return req.body;
    }

    return { ...req.body, ...req.query };
};
