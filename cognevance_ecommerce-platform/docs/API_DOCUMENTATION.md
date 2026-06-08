# API Documentation - E-Commerce Platform

Base URL: `http://localhost:5003/api`

## Authentication

### POST /auth/register
Register customer account.

### POST /auth/login
Login and receive JWT token.

### GET /auth/me
Get current user (requires token).

---

## Products

### GET /products
List products. Query: `category`, `search`, `featured`

### GET /products/:id
Get single product.

### POST /products (Admin)
Create product with multipart form (image upload).

### PUT /products/:id (Admin)
Update product.

### DELETE /products/:id (Admin)
Delete product.

---

## Cart (Auth Required)

### GET /cart
Get user cart.

### POST /cart/add
Body: `{ productId, quantity }`

### PUT /cart/update/:productId
Body: `{ quantity }`

### DELETE /cart/remove/:productId
Remove item from cart.

### DELETE /cart/clear
Clear entire cart.

---

## Orders

### POST /orders/create (Auth)
Create order from cart. Body: `{ shippingAddress }`

### GET /orders/my (Auth)
Get user's orders.

### GET /orders (Admin)
Get all orders.

### PUT /orders/:id/status (Admin)
Update order status.

---

## Payment (Auth)

### POST /payment/create-intent
Create Stripe payment intent. Body: `{ orderId }`

### POST /payment/confirm
Confirm payment. Body: `{ orderId, paymentId }`

---

## Analytics (Admin)

### GET /analytics/dashboard
Returns revenue, orders, top products, monthly sales.
