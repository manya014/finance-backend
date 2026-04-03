#💰 Finance Backend API

A professional REST API backend for a finance dashboard system built with Node.js, Express, and PostgreSQL. The system supports financial record management, role-based access control, and dashboard analytics.

🚀 Live API
👉 https://finance-backend-production-b864.up.railway.app
---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js + Express | Server and REST API |
| PostgreSQL | Relational database |
| Sequelize ORM | Database modeling and queries |
| JWT | Authentication |
| Joi | Input validation |
| Bcryptjs | Password hashing |
| Express Rate Limit | Rate limiting |
| Helmet | Security headers |
| Morgan | HTTP request logging |

---

## Project Structure
```
finance-backend/
├── src/
│   ├── config/
│   │   └── db.js                         # Database connection and model registration
│   ├── middleware/
│   │   ├── auth.middleware.js             # JWT verification
│   │   ├── rateLimiter.js                # Rate limiting
│   │   ├── roleGuard.js                  # Role-based access control
│   │   └── validate.js                   # Joi validation middleware
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.validation.js
│   │   ├── users/
│   │   │   ├── user.controller.js
│   │   │   ├── user.model.js
│   │   │   ├── user.routes.js
│   │   │   ├── user.service.js
│   │   │   └── user.validation.js
│   │   ├── records/
│   │   │   ├── record.controller.js
│   │   │   ├── record.model.js
│   │   │   ├── record.query.validation.js
│   │   │   ├── record.routes.js
│   │   │   ├── record.service.js
│   │   │   └── record.validation.js
│   │   └── dashboard/
│   │       ├── dashboard.controller.js
│   │       ├── dashboard.routes.js
│   │       ├── dashboard.service.js
│   │       └── dashboard.validation.js
│   ├── utils/
│   │   └── constants.js                  # Role and record type constants
│   └── server.js                         # Entry point
├── .env.example
├── .gitignore
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/finance-backend.git
cd finance-backend
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Update `.env` with your credentials
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finance_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

5. Create the database in PostgreSQL
```sql
CREATE DATABASE finance_db;
```

6. Run the server
```bash
npm run dev
```

Tables are created automatically on startup via Sequelize sync.

---

## Role System

| Role | Level | Permissions |
|------|-------|------------|
| Admin | 3 | Full access — manage users, records, dashboard |
| Analyst | 2 | Read records, access dashboard insights |
| Viewer | 1 | View records list and dashboard summary |

Access control is enforced at the middleware level using a role hierarchy system. Every protected route requires a valid JWT token and sufficient role level.

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All protected routes require this header:
```
Authorization: Bearer <token>
```

---

### Auth Routes

#### Register
```
POST /api/auth/register
```
Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "admin"
}
```
Response:
```json
{
  "success": true,
  "message": "User registered",
  "data": {
    "id": "uuid",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

#### Login
```
POST /api/auth/login
```
Body:
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```
Response:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGci...",
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "role": "admin"
    }
  }
}
```

---

### Financial Records Routes

#### Create Record (Admin only)
```
POST /api/records
```
Body:
```json
{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "date": "2026-04-01",
  "notes": "April salary"
}
```

#### Get All Records (Viewer+)
```
GET /api/records
```
Query params:
```
?type=income
?category=salary
?startDate=2026-01-01&endDate=2026-12-31
?search=salary
?page=1&limit=10
```

#### Get Single Record (Analyst+)
```
GET /api/records/:id
```

#### Update Record (Admin only)
```
PUT /api/records/:id
```
Body (all fields optional):
```json
{
  "amount": 6000,
  "category": "freelance"
}
```

#### Delete Record (Admin only, soft delete)
```
DELETE /api/records/:id
```

---

### Dashboard Routes

#### Get Summary (Viewer+)
```
GET /api/dashboard/summary
```
Query params:
```
?startDate=2026-01-01&endDate=2026-12-31
```
Response:
```json
{
  "success": true,
  "data": {
    "totalIncome": 10000,
    "totalExpense": 3000,
    "netBalance": 7000,
    "byCategory": [...],
    "recentActivity": [...],
    "monthlyTrends": [...]
  }
}
```

---

### User Management Routes (Admin only)

#### Get All Users
```
GET /api/users
```

#### Update User Role
```
PATCH /api/users/:id/role
```
Body:
```json
{
  "role": "analyst"
}
```

#### Update User Status
```
PATCH /api/users/:id/status
```
Body:
```json
{
  "isActive": false
}
```

---

## Access Control Matrix

| Endpoint | Viewer | Analyst | Admin |
|----------|--------|---------|-------|
| POST /api/auth/register | ✅ | ✅ | ✅ |
| POST /api/auth/login | ✅ | ✅ | ✅ |
| GET /api/records | ✅ | ✅ | ✅ |
| GET /api/records/:id | ❌ | ✅ | ✅ |
| POST /api/records | ❌ | ❌ | ✅ |
| PUT /api/records/:id | ❌ | ❌ | ✅ |
| DELETE /api/records/:id | ❌ | ❌ | ✅ |
| GET /api/dashboard/summary | ✅ | ✅ | ✅ |
| GET /api/users | ❌ | ❌ | ✅ |
| PATCH /api/users/:id/role | ❌ | ❌ | ✅ |
| PATCH /api/users/:id/status | ❌ | ❌ | ✅ |

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Resource created |
| 400 | Bad request / invalid input |
| 401 | Unauthorized — missing or invalid token |
| 403 | Forbidden — insufficient role |
| 404 | Resource not found |
| 409 | Conflict — email already exists |
| 429 | Too many requests |
| 500 | Internal server error |

---

## Rate Limiting

| Route | Limit |
|-------|-------|
| All routes | 100 requests per 15 minutes |
| Auth routes | 10 requests per 15 minutes |

---

## Assumptions and Design Decisions

1. **PostgreSQL over MongoDB** — Financial data is relational by nature. PostgreSQL provides ACID compliance, precise DECIMAL types for money, and powerful aggregation queries for dashboard analytics.

2. **Role hierarchy system** — Instead of checking exact role names, a numeric hierarchy (admin=3, analyst=2, viewer=1) allows clean and flexible access control with a single middleware.

3. **Service layer** — Business logic is separated from controllers into dedicated service files. Controllers handle only request/response, services handle business rules, models handle database.

4. **Soft delete** — Records are never permanently deleted. Sequelize's paranoid mode adds a deletedAt timestamp instead of removing rows, preserving financial history.

5. **Data isolation** — Users can only access their own records. Admins can view all data across users for management purposes.

6. **Constants file** — Role names and record types are defined once in a constants file and imported everywhere, ensuring consistency and easier maintenance.

7. **UUID primary keys** — UUIDs are used instead of sequential integers to prevent ID enumeration attacks and follow production best practices.

---


## Scripts
```bash
npm run dev    # Run in development mode with nodemon
npm start      # Run in production mode
```
##Author
Manya Rawat
