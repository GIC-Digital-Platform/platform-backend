const multer = require('multer');
const path = require('path');
const { ValidationError } = require('./errors');

const storage = multer.memoryStorage();

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
