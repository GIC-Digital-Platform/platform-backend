const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const cafeRoutes = require('./api/routes/cafeRoutes');
const employeeRoutes = require('./api/routes/employeeRoutes');
const errorHandler = require('./api/middleware/errorHandler');
const { globalLimiter } = require('./api/middleware/rateLimiter');

function createApp(container) {
  const app = express();

  // Security & logging middleware
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  const allowedOrigins = (process.env.CORS_ORIGIN || '*').split(',').map((o) => o.trim());
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS: origin ${origin} not allowed`));
        }
      },
      credentials: true,
    }),
  );
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
  app.use(globalLimiter);

  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve uploaded files (logos)
  app.use('/uploads', express.static(path.resolve(process.env.UPLOAD_DIR || 'uploads')));

  // Health check
  app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

  // API routes — resolve controllers from DI container
  const { cafeController, employeeController } = container.cradle;
  app.use('/cafes', cafeRoutes(cafeController));
  app.use('/employees', employeeRoutes(employeeController));

  // 404 handler
  app.use((req, res) => res.status(404).json({ success: false, error: 'Route not found' }));

  // Global error handler (must be last)
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
