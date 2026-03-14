const { AppError } = require('./errors');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
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

  // Knex / postgres unique constraint violations
  if (err.code === '23505') {
    return res.status(409).json({
      success: false,
      error: 'A record with the same unique value already exists.',
    });
  }

  console.error('[Unhandled Error]', err);

  return res.status(500).json({
    success: false,
    error: 'An internal server error occurred.',
  });
}

module.exports = errorHandler;
