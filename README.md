# 🚨 Code Police

> **Competitive Programming Tracker**
> *Track. Compete. Grind.*

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Node](https://img.shields.io/badge/node-v20%2B-green) ![Status](https://img.shields.io/badge/status-deployed-brightgreen)

**Code Police** is a real-time dashboard for competitive programmers. It automatically tracks your progress on **Codeforces** and **LeetCode**, maintains a live leaderboard among your peers, and helps you maintain consistency with daily coding goals.

---

## ⚡ Key Features

* **🕵️ Live Leaderboard:** Real-time ranking based on Codeforces Rating & LeetCode Solved count.
* **🎯 Daily Goals:** Set a daily target (e.g., 3 questions). The system automatically detects new solves and updates your progress bar.
* **🔄 Auto-Sync:** Cron jobs run in the background to fetch fresh stats every few hours.
* **🎨 Cyber-Aesthetic:** A clean, dark-mode UI with terminal vibes, glassmorphism, and smooth Framer Motion animations.
* **🛡️ Secure Auth:** JWT-based authentication with password hashing.

---

## 🛠️ Tech Stack

### **Frontend**
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **State/Data:** Axios, SWR (or standard React Hooks)
* **Icons:** Lucide React

### **Backend**
* **Runtime:** Node.js & Express
* **Database:** PostgreSQL (Neon DB)
* **Services:** Node-Cron (Scheduled tasks)
* **API:** Axios (External fetching)

---

## 🚀 Build & Start Mini-Guide

Follow these steps to run the project locally on your machine.

### **1. Prerequisites**
* Node.js (v18 or higher)
* PostgreSQL Database URL (Neon or Local)

### **2. Backend Setup**

# Clone the repo
git clone https://github.com/dev-harshvats/Code_Police.git
cd code-police/backend

# Install dependencies
npm install

# Create .env file
touch .env

# Configure .env (Backend)
PORT=

DATABASE_URL=

JWT_SECRET=

FRONTEND_URL=http://localhost:3000

# Start Server
npm run dev

### **3. Frontend Setup**

# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Create .env file
touch .env

# Configure .env (Frontend)
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# Start Client
npm run dev

App will run at http://localhost:3000

---

## 📡 App Routes & Packages

/signup	: User registration. Auto-validates Handles (CF/LC) to ensure they exist.
/login	: Secure login to access your dashboard.
/dashboard	: Main hub. View live stats, daily goal progress, and the global leaderboard.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the Project

2. Create your Feature Branch (git checkout -b feature/AmazingFeature)

3. Commit your Changes (git commit -m 'Add some AmazingFeature')

4. Push to the Branch (git push origin feature/AmazingFeature)

5. Open a Pull Request

---

## 👨‍💻 Author

Harsh Vats

DTU, Electronics & Communication Engineering