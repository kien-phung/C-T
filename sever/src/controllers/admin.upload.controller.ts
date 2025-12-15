import { RequestHandlerCustom } from "../utils/configs/custom.js";
import fs from 'fs';
import path from 'path';

const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const sanitizeName = (name: string) => {
  return String(name || '')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .slice(0, 80);
};

/**
 * Upload multiple PDF files and return accessible URLs
 * Accepts multipart/form-data with files in any field (middleware uses upload.any())
 */
export const uploadPdfFiles = RequestHandlerCustom(async (req, res) => {
  // Log thông tin để debug khi cần
  try {
    const ct = req.headers['content-type'];
    const filesDebug = (req as any).files || [];
    console.log('[Upload] content-type:', ct);
    console.log('[Upload] files length:', Array.isArray(filesDebug) ? filesDebug.length : 0);
    if (Array.isArray(filesDebug)) {
      for (const f of filesDebug) {
        console.log('[Upload] file:', { fieldname: f.fieldname, originalname: f.originalname, mimetype: f.mimetype, size: f.size });
      }
    }
  } catch {}
  // Thu thập cả danh sách files và trường hợp đơn lẻ (nếu có)
  const filesRaw: any[] = Array.isArray((req as any).files) ? (req as any).files : [];
  const single = (req as any).file ? [(req as any).file] : [];
  const files: any[] = [...filesRaw, ...single];
  if (!files.length) {
    return res.status(400).json({ success: false, message: 'Không có file nào được tải lên' });
  }

  const root = path.resolve('uploads');
  const pdfDir = path.join(root, 'pdfs');
  ensureDir(pdfDir);

  const savedUrls: string[] = [];

  for (const file of files) {
    // Chấp nhận PDF theo mimetype hoặc theo phần mở rộng .pdf (trường hợp mimetype bị trống)
    const isPdfByMime = file.mimetype === 'application/pdf';
    const isPdfByExt = String(file.originalname || '').toLowerCase().endsWith('.pdf');
    if (!isPdfByMime && !isPdfByExt) continue;
    const base = sanitizeName(path.basename(file.originalname, path.extname(file.originalname)));
    const ext = '.pdf';
    const stamp = Date.now();
    const filename = `${base}_${stamp}${ext}`;
    const absPath = path.join(pdfDir, filename);
    fs.writeFileSync(absPath, file.buffer);
    const url = `/files/pdfs/${filename}`;
    savedUrls.push(url);
  }

  if (!savedUrls.length) {
    return res.status(400).json({ success: false, message: 'Không có file PDF hợp lệ' });
  }

  return res.status(200).json({ success: true, urls: savedUrls });
});
