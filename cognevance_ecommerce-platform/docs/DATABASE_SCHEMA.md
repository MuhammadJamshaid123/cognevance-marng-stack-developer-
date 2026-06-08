# Database Schema - E-Commerce Platform

## users

| Field     | Type   | Required | Description                |
|-----------|--------|----------|----------------------------|
| name      | String | Yes      | User name                  |
| email     | String | Yes      | Unique email               |
| password  | String | Yes      | bcrypt hashed              |
| role      | String | No       | customer (default), admin  |

## products

| Field       | Type    | Required | Description          |
|-------------|---------|----------|----------------------|
| name        | String  | Yes      | Product name         |
| description | String  | Yes      | Product description  |
| price       | Number  | Yes      | Price in USD         |
| category    | String  | Yes      | Product category     |
| stock       | Number  | Yes      | Available quantity   |
| image       | String  | No       | Image URL path       |
| featured    | Boolean | No       | Featured on homepage |

## carts

| Field  | Type       | Description                    |
|--------|------------|--------------------------------|
| user   | ObjectId   | Reference to user (unique)     |
| items  | Array      | [{ product, quantity }]        |

## orders

| Field           | Type     | Description                              |
|-----------------|----------|------------------------------------------|
| user            | ObjectId | Reference to user                        |
| items           | Array    | [{ product, name, price, quantity, image }] |
| totalAmount     | Number   | Order total                              |
| status          | String   | pending, paid, shipped, delivered, cancelled |
| paymentId       | String   | Stripe payment ID                        |
| shippingAddress | Object   | { street, city, state, zip, country }    |

## Relationships

- User → Cart (1:1)
- User → Orders (1:N)
- Product → Cart Items (N:M via cart.items)
- Product → Order Items (referenced in order.items)
