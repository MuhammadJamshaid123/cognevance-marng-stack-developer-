# Cognevance MERN Stack Developer Projects

Three industry-oriented MERN stack projects for Cognevance Technologies submission.

## Projects

| # | Project | Level | Folder | Ports |
|---|---------|-------|--------|-------|
| 1 | Personal Portfolio Website | Easy | `cognevance_personal-portfolio` | FE:5173 BE:5001 |
| 2 | Task Management System | Intermediate | `cognevance_task-management-system` | FE:5174 BE:5002 |
| 3 | E-Commerce Platform | Advanced | `cognevance_ecommerce-platform` | FE:5175 BE:5003 |

## Repository Naming (for GitHub)

Create separate repositories with these names:
- `cognevance_personal-portfolio`
- `cognevance_task-management-system`
- `cognevance_ecommerce-platform`

## Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)

### Run Any Project

```bash
# Backend
cd <project-folder>/backend
npm install
cp .env.example .env
npm run dev

# Frontend (new terminal)
cd <project-folder>/frontend
npm install
cp .env.example .env
npm run dev
```

### E-Commerce Seed Data

```bash
cd cognevance_ecommerce-platform/backend
npm run seed
# Admin: admin@cognevance.com / admin123
```

## Live Demo (Netlify)

| Project | Live URL |
|---------|----------|
| Personal Portfolio | https://cognevance-portfolio-jamshaid.netlify.app |
| Task Management | https://cognevance-tasks-jamshaid.netlify.app |
| E-Commerce Platform | https://cognevance-ecommerce-jamshaid.netlify.app |

> **Note:** Frontends are live on Netlify. Deploy backends on [Render](https://render.com) using `render.yaml` and set `VITE_API_URL` in Netlify env vars for full API functionality. See [NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md).

## Submission Checklist

- [ ] Separate GitHub repo for each project (`cognevance_projectName`)
- [x] README with setup, workflow, technologies, outputs
- [x] API documentation (all projects)
- [x] Database schema documentation
- [ ] Screenshots in `docs/screenshots/` folder (capture locally)
- [ ] Deploy frontend (Vercel/Netlify) and backend (Render)
- [ ] Submit links to support@cognevance.online

## Requirements Status

| Project | Level | Status |
|---------|-------|--------|
| Personal Portfolio | Easy | Complete — responsive UI, routing, contact form, MongoDB |
| Task Management | Intermediate | Complete — JWT auth, CRUD, filtering, deadlines |
| E-Commerce Platform | Advanced | Complete — auth, cart, orders, Stripe, admin, analytics |

## Contact

For support: **support@cognevance.online**
