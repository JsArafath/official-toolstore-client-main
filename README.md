<<<<<<< HEAD
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
=======
# 🛒 Official Tool Store (ToolStore)

A full-stack MERN eCommerce web application for selling legally authorized digital tools and software subscriptions.

---

## 🚀 Live Features

* 🔐 User Authentication (Register/Login with JWT)
* 👤 Role-based Access (Admin & User)
* 🛍️ Product Management (Admin can Add/Delete Products)
* 🛒 Cart System (Add/Remove/Clear Cart using LocalStorage)
* 💳 Online Payment Integration (SSLCommerz Sandbox)
* 📦 Order Management (User Orders + Admin Panel)
* ⭐ Review & Rating System (Planned)
* 🎨 Premium Responsive UI (React + Tailwind CSS)

---

## 🏗️ Tech Stack

### Frontend

* ⚛️ React (Vite)
* 🎨 Tailwind CSS + DaisyUI
* 🔄 Context API (Auth + Cart)
* 🌐 Axios

### Backend

* 🟢 Node.js
* 🚀 Express.js
* 🍃 MongoDB (Atlas)
* 🔐 JWT Authentication
* 🔑 Bcrypt (Password Hashing)

### Payment Gateway

* 💳 SSLCommerz (Sandbox Integration)

---

## 📁 Project Structure

```
official-toolstore/
│
├── officialtoolstore-server/   # Backend (Node + Express)
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── officialtoolstore-client/   # Frontend (React)
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
>>>>>>> ab75eac (Auth)
```

---

## ⚙️ Environment Variables

<<<<<<< HEAD
Create a `.env` file in the frontend root folder:

```env
VITE_API_URL=http://localhost:5000/api
=======
### Backend (.env)

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

SSLC_STORE_ID=offic69eba16397a5b
SSLC_STORE_PASSWORD=offic69eba16397a5b@ssl
SSLC_IS_LIVE=false

CLIENT_URL=http://localhost:5173
>>>>>>> ab75eac (Auth)
```

---

<<<<<<< HEAD
## 🔧 Installation & Run

```bash
=======
## 🔧 Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/official-toolstore.git
cd official-toolstore
```

---

### 2️⃣ Backend Setup

```
cd officialtoolstore-server
>>>>>>> ab75eac (Auth)
npm install
npm run dev
```

<<<<<<< HEAD
Then open:

```bash
http://localhost:5173
=======
---

### 3️⃣ Frontend Setup

```
cd officialtoolstore-client
npm install
npm run dev
>>>>>>> ab75eac (Auth)
```

---

<<<<<<< HEAD
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
=======
## 🔐 Authentication System

* JWT-based login system
* Token stored in localStorage
* Protected routes (Admin & User)
* Middleware:

  * `authMiddleware.js`
  * `adminMiddleware.js`

---

## 💳 Payment Flow (SSLCommerz)

1. User clicks **Checkout**
2. Order created with `pending` status
3. Redirect to SSLCommerz Gateway
4. Payment Success → `/payment/success`
5. Backend verifies transaction
6. Order status updated to `paid`

---

## 📦 Order System

* Users can view **My Orders**
* Admin can view **All Orders**
* Order includes:

  * Products
  * Total Amount
  * Transaction ID
  * Status (pending/paid)

---

## 🛠️ API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Products

* `GET /api/products`
* `POST /api/products` (Admin)
* `DELETE /api/products/:id` (Admin)

### Orders

* `GET /api/orders/my-orders`
* `GET /api/orders` (Admin)

### Payment

* `POST /api/payment/init`
* `POST /api/payment/verify`

---

## 🎯 Upcoming Features

* ⭐ Product Review System
* 📊 Admin Dashboard (Analytics)
* 🔒 Payment Validation Security Upgrade
* 🎨 Premium UI Improvements
* 🌍 Deployment (Vercel + Render)

---

## 🧠 Challenges Faced

* MongoDB Atlas SRV connection issue (fixed using non-SRV)
* SSLCommerz integration handling
* JWT auth + role management
* Frontend-backend API sync

---

## 📸 Screenshots

(Add your project screenshots here)

---

## 👨‍💻 Developer

**MD. Mohaiminul Islam**
📧 [mohaiminulislam077777@gmail.com](mailto:mohaiminulislam077777@gmail.com)
📞 01725713593

---

## 📄 License

This project is for educational and commercial use (authorized tools only).

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
>>>>>>> ab75eac (Auth)
