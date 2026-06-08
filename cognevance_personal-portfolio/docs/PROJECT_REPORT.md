# Project Report - Personal Portfolio Website

## Overview

Responsive personal portfolio website built with React.js and a Node.js backend, fulfilling all Level 1 Easy requirements from Cognevance Technologies.

## Implemented Requirements

| Requirement | Implementation |
|-------------|----------------|
| Responsive UI | React.js with custom CSS, mobile-friendly layout |
| Content Sections | About, Skills, Projects, and Contact pages |
| Navigation | React Router with active link highlighting |
| Backend Connection | Contact form POST to Express REST API |
| Data Storage | MongoDB via Mongoose Contact model |
| Documentation | README, API docs, database schema |

## Architecture

```
React Frontend (Vite) → Express REST API → MongoDB
         ↓
   React Router (client-side routing)
```

## Testing Notes

1. Start backend: `cd backend && npm run dev` (port 5001)
2. Start frontend: `cd frontend && npm run dev` (port 5173)
3. Navigate through all pages via the navbar
4. Submit the contact form and verify success message
5. Check MongoDB for stored contact submissions

## Screenshots

Add application screenshots to the `docs/screenshots/` folder before submission:
- Home page (hero section)
- About page
- Skills page
- Projects page
- Contact form (success state)
