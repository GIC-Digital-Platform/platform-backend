require('dotenv').config();

const createApp = require('./app');
const buildContainer = require('./container');

const PORT = process.env.PORT || 4000;

async function start() {
  const container = buildContainer();
  const app = createApp(container);

  app.listen(PORT, () => {
    console.log(`[Server] Listening on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
  });

  process.on('SIGTERM', async () => {
    console.log('[Server] SIGTERM received — shutting down gracefully');
    process.exit(0);
  });
}

start().catch((err) => {
  console.error('[Server] Failed to start:', err);
  process.exit(1);
});
