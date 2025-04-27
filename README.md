# 🥦 Bulk Vegetable/Fruit Ordering Platform

A web app to browse, order, and track bulk vegetable/fruit purchases. Admins can manage products and order statuses.  
Built with **Next.js**, **PostgreSQL**, and deployed on **Vercel**.

---

## 🚀 Features

### Buyers
- Browse product catalog
- Place bulk orders with delivery details
- Track order status (Pending, In Progress, Delivered)

### Admins
- Manage orders and update status
- Add, edit, delete products

---

## 🛠️ Tech Stack

- **Frontend**: Next.js
- **Backend**: Next.js API Routes
- **Hosting**: Vercel

---

## 📄 API Endpoints

- `GET /api/products` – Get products
- `POST /api/orders` – Place order
- `GET /api/orders/:id` – Check order status
- `PUT /api/admin/orders/:id` – Update order
- `POST/PUT/DELETE /api/admin/products` – Manage products

---

## 📋 Setup

```bash
git clone https://github.com/your-username/bulk-ordering-platform.git
cd bulk-ordering-platform
npm install
cp .env.example .env.local
npm run dev


## 📢 Submission
GitHub Repo: https://github.com/tejaskumavat08/fruits-vegetables-bulk-order-web-app.git

Live App: https://fruits-vegetables-bulk-order-web-app.vercel.app/
