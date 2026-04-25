# 🛒 Official Tool Store — Frontend

A responsive React frontend for an eCommerce website that sells legally authorized digital tools and software subscriptions.

---

## 🚀 Features

* Modern React + Vite setup
* Responsive premium UI
* User Register & Login pages
* JWT auth support with Auth Context
* Product listing page
* Product details page
* Cart system with localStorage
* Checkout page
* Payment success, fail, and cancel pages
* Admin dashboard UI
* Add/Delete product UI for admin
* My Orders page UI
* Review section UI

---

## 🧰 Tech Stack

* React
* Vite
* React Router DOM
* Axios
* Tailwind CSS
* DaisyUI
* Context API
* LocalStorage

---

## 📁 Frontend Folder Structure

```bash
officialtoolstore-client/
│
├── public/
├── src/
│   ├── components/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── PaymentSuccess.jsx
│   │   ├── PaymentFail.jsx
│   │   ├── PaymentCancel.jsx
│   │   ├── MyOrders.jsx
│   │   └── AdminDashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the frontend root folder:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🔧 Installation & Run

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:5173
```

---

## 🔗 Main Routes

```bash
/                 Home
/login            Login
/register         Register
/products         Product List
/products/:id     Product Details
/cart             Cart
/checkout         Checkout
/my-orders        My Orders
/admin            Admin Dashboard
/payment/success  Payment Success
/payment/fail     Payment Fail
/payment/cancel   Payment Cancel
```

---

## 🛒 Cart System

* Add product to cart
* Remove product from cart
* Clear full cart
* Cart data saved in browser localStorage

---

## 🔐 Authentication

* User login/register UI
* JWT token stored in localStorage
* AuthContext used globally
* Admin UI shown based on user role

---

## 💳 Payment Pages

This frontend includes pages for:

* Payment Success
* Payment Failed
* Payment Cancelled

Payment processing is handled by backend API.

---


## 📌 Project Status

Frontend is currently under development.

Completed:

* React setup
* Routing
* Auth UI
* Product UI
* Cart UI
* Checkout UI
* Admin UI
* Payment result pages

Upcoming:

* Better dashboard UI
* Review UI improvement
* Mobile design polishing
* Deployment on Vercel/Netlify
