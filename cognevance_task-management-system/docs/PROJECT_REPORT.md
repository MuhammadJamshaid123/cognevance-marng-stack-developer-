# Project Report - Task Management System

## Overview

Full-stack task management application built with the MERN stack, fulfilling all Level 2 Intermediate requirements from Cognevance Technologies.

## Implemented Requirements

| Requirement | Implementation |
|-------------|----------------|
| User Authentication | JWT tokens with bcrypt password hashing (12 rounds) |
| REST APIs | Express.js + Node.js with protected routes |
| CRUD Operations | Full Create, Read, Update, Delete for tasks |
| MongoDB Database | User and Task collections with Mongoose schemas |
| React Dashboard | Vite + React with protected routing |
| Task Filtering | Filter by status, priority, and search text |
| Status Updates | Inline dropdown to change task status |
| Deadlines | Date picker with overdue highlighting |

## Architecture

```
React Frontend (Vite) → Express REST API → MongoDB
         ↓                      ↓
   AuthContext (JWT)      JWT Middleware + bcrypt
```

## Testing Notes

1. Start backend: `cd backend && npm run dev` (port 5002)
2. Start frontend: `cd frontend && npm run dev` (port 5174)
3. Register a new user or login with existing credentials
4. Create tasks with different statuses, priorities, and deadlines
5. Test filters and inline status updates

## API Endpoints

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

## Database Schema

See [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)

## Screenshots

Add application screenshots to the `docs/screenshots/` folder before submission:
- Login/Register pages
- Dashboard with tasks
- Task filtering in action
- Overdue deadline highlighting
