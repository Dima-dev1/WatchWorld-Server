# WatchWorld — Full-Stack E-Commerce Watch Store

![Node.js](https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-20232A?style=for-the-badge&logo=ejs&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-20232A?style=for-the-badge&logo=sqlite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-20232A?style=for-the-badge&logo=javascript&logoColor=white)

A secure, database-driven **e-commerce platform for selling watches** — customers can register, browse a
catalogue stored in a relational database, search and filter products, manage a basket and favourites,
and complete a checkout. A separate **admin panel** provides full CRUD over the catalogue and order
management, protected by **role-based access control**.

> Built as my **A-Level Computer Science NEA** — a full software-engineering project with formal
> analysis, relational database design, implementation and systematic testing.

### 🔗 Live demo
**https://watch-world-pykp.onrender.com**
*(hosted on Render's free tier — the first load may take ~30s while the server wakes)*

---

# WatchWorld — Setup Instructions

## Getting Started

**Step 1** — Install dependencies

```
npm install
```

**Step 2** — Start the server

```
npm run dev
```

**Step 3** — Open in browser

```
http://localhost:3000
```

---

## Test Accounts

| Role               | Email                | Password |
| ------------------ | -------------------- | -------- |
| Admin (superadmin) | admin@watchworld.com | admin123 |
| Standard user      | dima@gmail.com       | dima123  |

---

## Features

**Storefront**
- Watch catalogue with product images, prices and detail pages, rendered dynamically from the database
- **Search and filtering** by name and price range, with pagination
- **Basket and favourites** with instant feedback, persisted client-side via `localStorage`
- **Checkout** with form validation, order summary and a confirmation page

**Accounts & security**
- Registration and login with **bcrypt-hashed passwords** (never stored in plain text)
- **Session-based authentication** (express-session)
- **Role-based access control** (customer / admin / super-admin) enforced by custom middleware
- All database queries use **parameterised SQL** to prevent SQL injection

**Admin panel**
- Create, edit and delete products, including **image upload** (Multer)
- View and manage customer orders and order status

## Tech stack

| Layer | Technology |
|-------|------------|
| Server | Node.js, Express |
| Views | EJS (server-side rendering) |
| Database | SQLite (`sqlite3`), 4 related tables |
| Auth & security | bcrypt, express-session, role-based middleware, parameterised SQL |
| Uploads | Multer (product images) |
| Client | HTML5, CSS3, JavaScript, `localStorage` |
| Tooling / hosting | npm, nodemon, Prettier, Render |
