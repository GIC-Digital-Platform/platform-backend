require('dotenv').config();

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './src/infrastructure/database/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './src/infrastructure/database/seeds',
  },
};

module.exports = {
  development: {
    ...baseConfig,
    connection: process.env.DATABASE_URL || {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'cafe_db',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
    },
    pool: { min: 2, max: 10 },
  },
  production: {
    ...baseConfig,
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
    ssl: { rejectUnauthorized: false },
  },
};
