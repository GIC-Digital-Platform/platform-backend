# Café Employee Manager — Backend

Node.js REST API for managing cafes and employees, built with Express and PostgreSQL.

---

## Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js 22 |
| Framework | Express.js |
| Database | PostgreSQL 14 |
| Query Builder | Knex.js (migrations + queries) |
| Validation | Joi |
| File Uploads | Multer (disk storage) |
| Image Storage | Cloudinary |
| Dependency Injection | Awilix |
| Security | Helmet, CORS, express-rate-limit |
| Logging | Morgan |
| Containerisation | Docker |

---

## Architecture & Design Patterns

### Mediator Pattern
Controllers do not call repositories directly. Every operation is encapsulated as a `Command` or `Query` and dispatched through a central `Mediator`, which routes it to the correct handler. This decouples the HTTP layer from business logic.

```
Controller → Mediator → Handler → Repository → Database
```

### CQRS (Command Query Responsibility Segregation)
Read operations use `Query` objects (`GetCafesQuery`, `GetEmployeesQuery`) and write operations use `Command` objects (`CreateCafeCommand`, `UpdateCafeCommand`, etc.), keeping reads and writes clearly separated.

---

## Security Features

| Feature | Implementation |
|---|---|
| Security headers | `helmet` sets X-Content-Type, X-Frame-Options, HSTS, etc. |
| CORS | Whitelist-based origin validation via `CORS_ORIGIN` env var |
| Rate limiting | Global: 100 req/15 min · Write endpoints: 30 req/15 min |
| Input validation | Joi schemas on all POST/PUT request bodies, Multer enforces image-only MIME types and 2MB size cap |
| Error sanitisation | Raw database/stack errors are never exposed to clients, instead all errors return clean JSON messages |

---

## Database Design

```
cafes
├── id           UUID, primary key (auto-generated)
├── name         VARCHAR(255), not null
├── description  TEXT, not null
├── logo         VARCHAR(500) -- Cloudinary URL
├── location     VARCHAR(255), not null
├── created_at   TIMESTAMP
└── updated_at   TIMESTAMP

employees
├── id           VARCHAR(10), primary key -- format: UIXXXXXXX
├── name         VARCHAR(255), not null
├── email_address VARCHAR(255), not null, unique
├── phone_number VARCHAR(8), not null
├── gender       VARCHAR(10), not null
├── cafe_id      UUID, foreign key → cafes.id (CASCADE DELETE)
├── start_date   DATE, not null
├── created_at   TIMESTAMP
└── updated_at   TIMESTAMP
```

**Relationships:**
- One cafe has many employees (one-to-many)
- One employee can only work in one cafe
- Deleting a cafe automatically deletes all its employees (`CASCADE`)
- `days_worked` is derived at query time: `current date − start_date`

---

## API Endpoints

[Backend API URL](https://cafe-backend-9c04.onrender.com)

### Cafes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/cafes` | List all cafes, sorted by employee count desc |
| `GET` | `/cafes?location=<value>` | Filter cafes by location |
| `POST` | `/cafes` | Create a new cafe |
| `PUT` | `/cafes/:id` | Update an existing cafe |
| `DELETE` | `/cafes/:id` | Delete a cafe and all its employees |

### Employees

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/employees` | List all employees, sorted by days worked desc |
| `GET` | `/employees?cafe=<name>` | Filter employees by cafe name |
| `POST` | `/employees` | Create a new employee |
| `PUT` | `/employees/:id` | Update an employee |
| `DELETE` | `/employees/:id` | Delete an employee |

### Other

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check |

---

## Local Setup

### Prerequisites
- Node.js 22+
- PostgreSQL 14+

### 1. Clone and install dependencies
```bash
git clone <your-repo-url>
cd platform-backend
npm install
```

### 2. Create the database
```sql
CREATE DATABASE cafe_db;
```

### 3. Configure environment
Create a `.env` file in the root:
```env
PORT=4000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=cafe_db
DB_USER=postgres
DB_PASSWORD=your_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

UPLOAD_DIR=uploads
MAX_FILE_SIZE=2097152
CORS_ORIGIN=http://localhost:3000
```

### 4. Run migrations and seed data
```bash
npm run migrate   # creates tables
npm run seed      # inserts sample data
```

### 5. Start the server
```bash
npm run dev    # development (nodemon, auto-restart)
npm start      # production
```

API runs at `http://localhost:4000`.

---

## Docker (Full Stack)

Runs backend and PostgreSQL together:

```bash
cd platform-backend
docker-compose up --build
```

Migrations and seeds run automatically on startup.

To stop:
```bash
docker-compose down
```

To stop and wipe the database:
```bash
docker-compose down -v
```
