import express from "express";

import {
  authMiddleware
} from "../middlewares/authMiddleware.js";

import {
  createRule,
  getProjectRules,
  deleteRule
}
from "../controllers/rateLimitController.js";

const router =
express.Router();

router.post(
  "/create",
  authMiddleware,
  createRule
);

router.get(
  "/project/:projectId",
  authMiddleware,
  getProjectRules
);

router.delete(
  "/:ruleId",
  authMiddleware,
  deleteRule
);

export default router;