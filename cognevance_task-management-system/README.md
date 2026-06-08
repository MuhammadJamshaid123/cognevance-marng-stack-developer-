# Task Management System

**Level 2 - Intermediate | Cognevance MERN Stack Project**

Full-stack task management application with JWT authentication and CRUD operations.

## Technologies Used

- **Frontend:** React.js, React Router, Vite, CSS3
- **Backend:** Node.js, Express.js, JWT, bcrypt
- **Database:** MongoDB, Mongoose

## Features

- User registration and login with JWT + bcrypt password hashing
- Full CRUD for tasks (Create, Read, Update, Delete)
- Task filtering by status, priority, and search
- Status updates (pending, in-progress, completed)
- Deadline tracking with overdue highlighting
- Protected routes and user-specific tasks

## Setup Instructions

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Runs on `http://localhost:5002`

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Runs on `http://localhost:5174`

## Workflow

1. User registers or logs in → receives JWT token
2. Token stored in localStorage and sent with API requests
3. User creates, edits, deletes tasks from dashboard
4. Tasks filtered by status/priority/search in real time
5. Status updated inline; deadlines shown with overdue alerts

## Documentation

- [API Documentation](docs/API_DOCUMENTATION.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [Project Report](docs/PROJECT_REPORT.md)
- [Screenshots Guide](docs/screenshots/README.md)

## Deployment

- Frontend: Vercel / Netlify
- Backend: Render
- Database: MongoDB Atlas

## Outputs / Results

- Secure authenticated task management system
- RESTful API with full CRUD
- React dashboard with filtering and deadline management
