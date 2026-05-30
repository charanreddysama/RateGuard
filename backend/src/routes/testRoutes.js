import express from "express";

import { projectMiddleware }
from "../middlewares/projectMiddleware.js";

import { rateLimiterMiddleware }
from "../middlewares/rateLimiterMiddleware.js";

const router = express.Router();

router.use(projectMiddleware);

router.use(rateLimiterMiddleware);

router.get("/products", (req, res) => {
  res.json({
    message: "Products API Success"
  });
});

router.get("/weather", (req, res) => {
  res.json({
    message: "Weather API Success"
  });
});

export default router;
