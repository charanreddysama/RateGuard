import express from "express";

import {
  authMiddleware
}
from "../middlewares/authMiddleware.js";

import {
  getProjectAnalytics
}
from "../controllers/analyticsController.js";

const router = express.Router();

router.get(
  "/:projectId",
  authMiddleware,
  getProjectAnalytics
);

export default router;