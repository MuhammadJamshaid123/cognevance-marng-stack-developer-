# Netlify Deployment Guide

Deploy all three frontend apps from your GitHub repo: [cognevance-marng-stack-developer-](https://github.com/MuhammadJamshaid123/cognevance-marng-stack-developer-)

> **Important:** Netlify hosts the **frontend** (React pages). Your **backend APIs** must be deployed separately on [Render](https://render.com) (free tier) so login, contact forms, and cart features work.

---

## Step 1 — Deploy Backends on Render (required for full functionality)

1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click **New → Blueprint**
3. Connect repo: `MuhammadJamshaid123/cognevance-marng-stack-developer-`
4. Render will read `render.yaml` and create 3 API services
5. Set these environment variables when prompted:
   - `MONGODB_URI` — your MongoDB Atlas connection string
   - `CLIENT_URL` — your Netlify frontend URL (update after Step 2)
   - `STRIPE_SECRET_KEY` — for e-commerce only (Stripe test key)

After deploy, note your 3 API URLs:
- Portfolio API: `https://cognevance-portfolio-api.onrender.com`
- Tasks API: `https://cognevance-tasks-api.onrender.com`
- E-commerce API: `https://cognevance-ecommerce-api.onrender.com`

---

## Step 2 — Deploy Frontends on Netlify

Create **3 separate sites** in Netlify (one per project):

### Site 1: Personal Portfolio

| Setting | Value |
|---------|-------|
| Base directory | `cognevance_personal-portfolio/frontend` |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Environment variable | `VITE_API_URL` = `https://cognevance-portfolio-api.onrender.com/api` |

### Site 2: Task Management

| Setting | Value |
|---------|-------|
| Base directory | `cognevance_task-management-system/frontend` |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Environment variable | `VITE_API_URL` = `https://cognevance-tasks-api.onrender.com/api` |

### Site 3: E-Commerce

| Setting | Value |
|---------|-------|
| Base directory | `cognevance_ecommerce-platform/frontend` |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Environment variables | `VITE_API_URL` = `https://cognevance-ecommerce-api.onrender.com/api` |
| | `VITE_STRIPE_PUBLISHABLE_KEY` = your Stripe publishable key |

### Netlify UI Steps

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site → Import an existing project**
3. Choose **GitHub** → select `cognevance-marng-stack-developer-`
4. Configure settings from the table above
5. Click **Deploy site**
6. Repeat for all 3 projects

Each `frontend/` folder already includes a `netlify.toml` with SPA routing rules.

---

## Step 3 — Update Backend CORS

After Netlify deploys, copy each live URL and set `CLIENT_URL` on the matching Render service:

```
CLIENT_URL=https://your-site-name.netlify.app
```

Then redeploy the backend on Render.

---

## Step 4 — CLI Deploy (optional)

If you have a [Netlify personal access token](https://app.netlify.com/user/applications):

```bash
# Portfolio
cd cognevance_personal-portfolio/frontend
npm run build
npx netlify-cli deploy --prod --dir=dist --auth YOUR_TOKEN

# Task Management
cd cognevance_task-management-system/frontend
npm run build
npx netlify-cli deploy --prod --dir=dist --auth YOUR_TOKEN

# E-Commerce
cd cognevance_ecommerce-platform/frontend
npm run build
npx netlify-cli deploy --prod --dir=dist --auth YOUR_TOKEN
```

---

## Expected Live URLs

After deployment you will have URLs like:

| Project | Example Netlify URL |
|---------|---------------------|
| Portfolio | `https://cognevance-portfolio.netlify.app` |
| Task Management | `https://cognevance-tasks.netlify.app` |
| E-Commerce | `https://cognevance-ecommerce.netlify.app` |

Add these links to each project's `README.md` and submit to **support@cognevance.online**.
