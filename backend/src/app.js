import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import rateLimitRoutes
from "./routes/rateLimitRoutes.js";

import analyticsRoutes
from "./routes/analyticsRoutes.js";

import limiterRoutes
from "./routes/limiterRoutes.js";

import dashboardRoutes
from "./routes/dashboardRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://rate-guard-alpha.vercel.app", // Live Vercel Frontend
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

app.use(helmet());

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/test", testRoutes);

app.use("/api/rules", rateLimitRoutes);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(
  "/api/limiter",
  limiterRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

export default app;