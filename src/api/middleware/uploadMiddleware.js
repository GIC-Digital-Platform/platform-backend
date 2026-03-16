const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { ValidationError } = require('./errors');

const TEMP_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads', 'temp');
fs.mkdirSync(TEMP_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, TEMP_DIR),
  filename: (req, file, cb) => {
    const cafeName = (req.body.name || 'cafe').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const date = new Date().toISOString().slice(0, 10);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${cafeName}-${date}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
  const extOk = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeOk = allowedTypes.test(file.mimetype);

  if (extOk && mimeOk) {
    cb(null, true);
  } else {
    cb(new ValidationError('Only image files are allowed (jpeg, jpg, png, gif, webp, svg)'));
  }
};

const maxFileSize = parseInt(process.env.MAX_FILE_SIZE || '2097152'); // 2MB default

const upload = multer({
  storage,
  limits: { fileSize: maxFileSize },
  fileFilter,
});

module.exports = upload;
