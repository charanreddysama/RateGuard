# RateGuard Frontend Dashboard

The user interface for RateGuard. Built to look and feel like a modern, premium SaaS application using a dark-mode focused UI.

## 🚀 Technologies

- **Framework**: React.js (Vite)
- **Routing**: React Router DOM
- **Styling**: Vanilla CSS with CSS Variables (Tailwind-style utility classes without the bloat)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts

## 📁 Directory Structure

```text
/frontend-v2/src
├── /components      // Reusable UI components
│   ├── /auth        // Login/Register layout wrappers
│   ├── /dashboard   // Layout, Sidebar, Navbar, and Modals
│   └── /ui          // Buttons, Inputs, Cards, Toggles
├── /context         // React Context providers (Auth, Projects, Theme)
├── /lib             // Utility functions (e.g. cn for class merging)
├── /pages           // Main route views
│   ├── /auth        // Authentication pages
│   ├── /dashboard   // Dashboard, Projects, Analytics, Docs views
│   └── /landing     // The public-facing landing page
└── /services        // Axios API client calls separating logic from UI
```

## 🎨 Design System

We use CSS variables defined in `index.css` to manage theming (light/dark mode) globally. Components use these variables via `var(--color-name)` ensuring consistent visual aesthetics across the entire platform.

## 🏃‍♂️ Running Locally

```bash
npm install
# Ensure you have a .env with VITE_API_URL=http://localhost:4000
npm run dev
```
