# Personal Portfolio Website

**Level 1 - Easy | Cognevance MERN Stack Project**

A responsive personal portfolio website built with React.js, Node.js, Express, and MongoDB.

## Technologies Used

- **Frontend:** React.js, React Router, CSS3, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose

## Features

- Responsive UI with About, Skills, Projects, and Contact sections
- Client-side routing with React Router
- Contact form connected to Node.js REST API
- Contact submissions stored in MongoDB

## Project Structure

```
cognevance_personal-portfolio/
├── backend/          # Express API server
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/         # React application
│   └── src/
│       ├── components/
│       ├── pages/
│       └── styles/
└── docs/             # Documentation & screenshots
```

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

Server runs at `http://localhost:5001`

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

App runs at `http://localhost:5173`

## Workflow

1. User navigates portfolio pages via React Router
2. User fills contact form on Contact page
3. Frontend sends POST request to `/api/contact`
4. Backend validates and saves data to MongoDB
5. Success/error response displayed to user

## API Endpoints

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| GET    | /api/health    | Health check             |
| POST   | /api/contact   | Submit contact form      |
| GET    | /api/contact   | Get all submissions      |

## Documentation

- [API Documentation](docs/API_DOCUMENTATION.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [Project Report](docs/PROJECT_REPORT.md)
- [Screenshots Guide](docs/screenshots/README.md)

## Live Demo

**Frontend:** https://cognevance-portfolio-jamshaid.netlify.app

## Deployment

- **Frontend:** Deploy to Vercel or Netlify
- **Backend:** Deploy to Render
- Set environment variables: `MONGODB_URI`, `CLIENT_URL`, `VITE_API_URL`

## Outputs / Results

- Fully responsive portfolio website
- Working contact form with database persistence
- REST API for contact management

## Author

Cognevance MERN Stack Developer Project
