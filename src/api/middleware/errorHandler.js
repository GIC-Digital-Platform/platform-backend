const multer = require('multer');
const { AppError } = require('./errors');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Known application errors — messages are intentionally user-facing
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // Joi validation errors
  if (err.isJoi || err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: err.details ? err.details[0].message : err.message,
    });
  }

  // Multer errors (file upload)
  if (err instanceof multer.MulterError) {
    const multerMessages = {
      LIMIT_FILE_SIZE: 'File is too large. Maximum allowed size is 2MB.',
      LIMIT_UNEXPECTED_FILE: 'Unexpected file field.',
      LIMIT_FILE_COUNT: 'Too many files uploaded.',
    };
    return res.status(400).json({
      success: false,
      error: multerMessages[err.code] || 'File upload error.',
    });
  }

  // PostgreSQL errors
  const pgErrors = {
    '23505': { status: 409, message: 'A record with the same unique value already exists.' },
    '23503': { status: 409, message: 'Operation failed due to a related record dependency.' },
    '23502': { status: 400, message: 'A required field is missing.' },
    '23514': { status: 400, message: 'A value failed a constraint check.' },
  };
  if (err.code && pgErrors[err.code]) {
    const { status, message } = pgErrors[err.code];
    return res.status(status).json({ success: false, error: message });
  }

  // Catch-all — log internally, never expose details to client
  console.error('[Unhandled Error]', err);

  return res.status(500).json({
    success: false,
    error: 'An internal server error occurred.',
  });
}

module.exports = errorHandler;
