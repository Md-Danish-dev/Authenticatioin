# 🔐 MERN Stack Authentication System

A complete authentication system built using the MERN stack (MongoDB, Express, React, Node.js).  
This project demonstrates real-world authentication features such as JWT authentication, email verification, protected routes, and secure user management.

---

## ✨ Features

- User Signup & Login
- JWT Authentication
- Email Verification
- Password Hashing using bcrypt
- Protected Routes
- Logout Functionality
- Environment-based Configuration

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Axios
- React Router DOM

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT
- bcrypt
- Nodemailer (Mailtrap)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
cd client
npm install
npm run dev

Create a .env file inside the server folder:

MONGODB_URL=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
MAILTRAP_TOKEN=your_mailtrap_token
CLIENT_URL=http://localhost:5173

cd server
npm install
npm run dev
```
