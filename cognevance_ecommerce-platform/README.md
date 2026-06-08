# Full-Scale E-Commerce Platform

**Level 3 - Advanced | Cognevance MERN Stack Project**

Complete e-commerce platform with authentication, product management, cart, orders, payments, and analytics.

## Technologies Used

- **Frontend:** React.js, React Router, Stripe.js, Vite, CSS3
- **Backend:** Node.js, Express.js, JWT, bcrypt, Multer, Stripe
- **Database:** MongoDB, Mongoose

## Features

1. **Authentication & Authorization** - JWT auth with customer/admin roles
2. **Product Management** - Admin CRUD with image uploads (Multer)
3. **Cart & Orders** - Shopping cart and order management system
4. **Payment Integration** - Stripe payment gateway
5. **Responsive Frontend** - Mobile-friendly React UI
6. **Storage Integration** - Local image uploads (extensible to Cloudinary)
7. **Analytics Dashboard** - Revenue, orders, top products, monthly sales
8. **Deployment Ready** - Configured for Render/Vercel

## Setup Instructions

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Add MongoDB URI and Stripe keys
npm run seed    # Creates admin user and sample products
npm run dev
```

**Admin credentials:** admin@cognevance.com / admin123

Runs on `http://localhost:5003`

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Runs on `http://localhost:5175`

## Documentation

- [API Documentation](docs/API_DOCUMENTATION.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [Project Report](docs/PROJECT_REPORT.md)
- [Screenshots Guide](docs/screenshots/README.md)

## Deployment

- Frontend: Vercel / Netlify
- Backend: Render
- Database: MongoDB Atlas
- Payments: Stripe (test mode)

## Outputs / Results

- Full MERN e-commerce application
- Admin dashboard with product/order/analytics management
- Stripe-integrated checkout flow
- REST API with role-based access control
