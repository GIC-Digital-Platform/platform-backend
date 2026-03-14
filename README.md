# Café Digital Platform - Backend

Node.js REST API for the Café Employee Manager.

## Tech Stack

- **Core**: Node.js, Express.js
- **Database**: PostgreSQL (via Knex.js)
- **Deploy**: Docker

## Prerequisites

- Node.js 22+
- PostgreSQL 14+

## Local Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
# Edit .env with your PostgreSQL credentials
```

### 3. Create the database
```sql
CREATE DATABASE cafe_db;
```

### 4. Run migrations and seed data
```bash
npm run migrate
npm run seed
```

### 5. Start the server
```bash
npm run dev
npm start
```

The API will be available at `http://localhost:4000`.

## API Endpoints

| Method | Endpoint            | Description                                 |
|--------|---------------------|---------------------------------------------|
| GET    | /cafes              | List cafes (filter by `?location=`)         |
| POST   | /cafes              | Create a new cafe (multipart/form-data)     |
| PUT    | /cafes/:id          | Update a cafe                               |
| DELETE | /cafes/:id          | Delete cafe and all its employees           |
| GET    | /employees          | List employees (filter by `?cafe=`)         |
| POST   | /employees          | Create a new employee                       |
| PUT    | /employees/:id      | Update an employee                          |
| DELETE | /employees/:id      | Delete an employee                          |
| GET    | /health             | Health check                                |

## Docker

### Run with Docker Compose (includes PostgreSQL)
```bash
docker-compose up --build
```

This will:
1. Start a PostgreSQL container
2. Build and start the backend
3. Run migrations and seed data automatically

## Database Design

- **cafes**: id (UUID), name, description, logo (nullable), location
- **employees**: id (UI+7alphanum), name, email_address, phone_number, gender
- **cafe_employees**: employee_id (PK → one cafe per employee), cafe_id, start_date
