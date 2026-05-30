# RateGuard - Enterprise API Rate Limiting Infrastructure

RateGuard is a production-grade, distributed rate limiting SaaS platform built to protect your APIs from DDoS attacks and unwanted traffic spikes using Redis-backed algorithms. 

## 🚀 Architecture

RateGuard is built on a modern MERN stack architecture + Redis:

- **Frontend**: React + Vite, styled with CSS Variables and Tailwind-inspired utility classes. 
- **Backend**: Express + Node.js RESTful API.
- **Database**: MongoDB (Mongoose ORM) for managing users, projects, and rule configurations.
- **Cache**: Redis for distributed, high-speed rate limiting data stores.

## 📦 Project Structure

The monorepo is structured as follows:

- `/frontend-v2` - The React application (SaaS Dashboard & Landing Page).
- `/backend` - The Node.js Express server.
- `/rateguard-sdk` - A lightweight Node.js SDK used to seamlessly integrate RateGuard middleware into your own API servers.

## ✨ Core Features

- **Multi-Algorithm Support**: Choose between Fixed Window, Sliding Window, Token Bucket, and Leaky Bucket algorithms per route.
- **Real-time Analytics**: Monitor total requests, blocked requests, and successful requests in a sleek dashboard.
- **Project Workspaces**: Isolate your rules and API keys into dedicated projects.
- **DDoS Protection**: Block aggressive crawlers and malicious bots automatically.

## 🛠 Getting Started

### Prerequisites
- Node.js v16+
- MongoDB instance (local or Atlas)
- Redis instance (local or Upstash)

### 1. Setup Backend
```bash
cd backend
npm install
# Set up .env with MONGO_URI, JWT_SECRET, REDIS_URL
npm run dev
```

### 2. Setup Frontend
```bash
cd frontend-v2
npm install
# Set up .env with VITE_API_URL
npm run dev
```

## 📖 Documentation
For comprehensive instructions on creating projects, setting up rules, and integrating the middleware, navigate to the **Docs** section within your RateGuard dashboard.
