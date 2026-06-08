# API Documentation - Task Management System

Base URL: `http://localhost:5002/api`

## Authentication

All task endpoints require `Authorization: Bearer <token>` header.

### POST /auth/register

Register a new user.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token_here"
  }
}
```

### POST /auth/login

Login existing user.

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### GET /auth/me

Get current logged-in user. Requires auth token.

---

## Tasks

### GET /tasks

Get all tasks for logged-in user.

**Query Parameters:**
| Param    | Type   | Description                    |
|----------|--------|--------------------------------|
| status   | string | pending, in-progress, completed |
| priority | string | low, medium, high              |
| search   | string | Search title/description       |

### GET /tasks/:id

Get single task by ID.

### POST /tasks

Create a new task.

**Body:**
```json
{
  "title": "Complete project",
  "description": "Finish MERN assignment",
  "status": "pending",
  "priority": "high",
  "deadline": "2026-06-15"
}
```

### PUT /tasks/:id

Update an existing task.

### DELETE /tasks/:id

Delete a task.

---

## Health Check

### GET /health

Returns API status.
