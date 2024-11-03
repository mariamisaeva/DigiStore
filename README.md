# DigiStore - E-commerce Platform

## Overview

DigiStore is an e-commerce platform built with Strapi as the backend CMS, utilizing Clerk for authentication, Stripe for payments, and Resend for email services. The frontend is powered by Next.js, providing a fast and responsive interface for browsing, searching, and purchasing products.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Live Demo](#live-demo)
- [Getting Started](#getting-started)
- [Setup & Development](#setup--development)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)

---

## Features

- **Product Catalog**: Browse products with categories, prices, and images.
- **Search and Filter**: Search products and filter by category.
- **User Authentication**: Sign up, login, and account management with Clerk.
- **Payment Integration**: Secure checkout and payments powered by Stripe.
- **Order Notifications**: Email notifications via Resend for order updates.

---

## Tech Stack

- **Frontend**: Next.js, TypeScript, React
- **Backend**: Strapi CMS
- **Authentication**: Clerk
- **Payments**: Stripe
- **Email Service**: Resend
- **Hosting**: Vercel for frontend, Render for Strapi backend.

---

## Live Demo

Check out the live version of DigiStore at: [DigiStore Live](https://digi-store-alpha.vercel.app)

---

## Getting Started

### Prerequisites

- A modern web browser with JavaScript enabled.

### Using DigiStore

1. Visit the live demo link above.
2. Sign up or log in to your account.
3. Browse and search products in the catalog.
4. Add items to your cart and proceed to checkout.
5. Complete the purchase using Stripe's secure payment gateway.
6. Receive email confirmation and updates on your order.

---

## Setup & Development

### Prerequisites

- Node.js (version >= 14)
- Yarn or npm
- Accounts for Clerk, Stripe, and Resend services (API keys required)

### Local Development Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/DigiStore.git
   cd DigiStore
   ```

2. **Install Dependencies**

   - For the frontend:

   ```bash
       cd client
       npm install
   ```

   - For the backend:

   ```bash
       cd server
       npm install
   ```

3. **Environment Variables**

   - Create .env.local in both client and server folders based on .env.example.
   - Fill in environment variables, such as API keys for Clerk, Stripe, and Resend, and database URLs.

4. **Running the Application**

   - For the frontend:

   ```bash
       cd client
       npm run dev
   ```

   - For the backend:

   ```bash
       cd server
       npm run develop
   ```

5. **Access the Application**

   - Frontend: `http://localhost:3000`

   - Backend (Strapi): `http://localhost:1337/admin`

6. **Database Setup**

   - The backend requires a database (e.g., PostgreSQL or SQLite for local development).
   - Configure the database connection in the .env file in the server folder.

---

## Configuration

### Environment Variables

#### Frontend (`client/.env.local`)

- `NEXT_PUBLIC_CLERK_FRONTEND_API`: Your Clerk frontend API key
- `NEXT_PUBLIC_STRAPI_API_URL`: Backend URL for Strapi API
- `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`: Your Stripe public key

#### Backend (`server/.env`)

- `STRAPI_ADMIN_JWT_SECRET`: JWT secret for Strapi Admin
- `DATABASE_URL`: Database connection URL
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `RESEND_API_KEY`: Your Resend API key for email notifications

### CORS Setup

In the Strapi backend configuration, ensure CORS settings allow requests from the frontend domain (e.g., `https://digi-store-alpha.vercel.app`).

---

## Usage

### User Roles and Permissions

- **Admin**: Can manage products, categories, orders, and user accounts.
- **Customer**: Can browse products, make purchases, and manage their account.

### API Endpoints (for Developer Reference)

- `GET /api/products`: Retrieve all products with optional query filters.
- `GET /api/products/:id`: Retrieve product details by ID.
- `POST /api/orders`: Create a new order.after payment completion.
- `POST /api/auth`: User login and registration with Clerk.
- `POST /api/carts`: Add items to the cart.
- `GET /api/carts`: Retrieve cart items for the current user.
- `DELETE /api/carts/:id`: Remove an item from the cart.

### Frontend Components

- **ProductList**: Renders the list of products with details.
- **SearchBar**: Allows users to search and filter products.
- **Checkout**: Integrates Stripe for handling payments.

---

## Screenshots

![Image1](/client/public/Screenshots/screencapture-digi-store-alpha-vercel-app-2024-11-03-19_39_46.png)
![Image2](/client/public/Screenshots/screencapture-digi-store-alpha-vercel-app-all-products-2024-11-03-19_41_42.png)
![Image3](/client/public/Screenshots/screencapture-digi-store-alpha-vercel-app-product-details-1-2024-11-03-19_43_01.png)
![Image4](/client/public/Screenshots/screencapture-digi-store-alpha-vercel-app-sign-in-2024-11-03-19_40_35.png)
![Image5](/client/public/Screenshots/screencapture-digi-store-alpha-vercel-app-cart-2024-11-03-19_54_13.png)
![Image6](/client/public/Screenshots/screencapture-digi-store-alpha-vercel-app-product-details-6-2024-11-03-19_44_11.png)
![Image7](/client/public/Screenshots/screencapture-digi-store-alpha-vercel-app-cart-2024-11-03-19_44_47.png)
![Image8](/client/public/Screenshots/screencapture-digi-store-alpha-vercel-app-checkout-2024-11-03-19_45_08.png)
![Image9](/client/public/Screenshots/screencapture-digi-store-alpha-vercel-app-payment-success-2024-11-03-19_45_32.png)

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the project repository.
2. **Create a new branch** with a descriptive name.
3. **Commit and push** your changes.
4. **Open a pull request** for review.
