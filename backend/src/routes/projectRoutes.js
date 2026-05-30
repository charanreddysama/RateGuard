import express from "express";

import {
  authMiddleware
} from "../middlewares/authMiddleware.js";

import {
  createProject,
  getProjects,
  deleteProject
}
from "../controllers/projectController.js";

const router =
express.Router();

router.post(
  "/create",
  authMiddleware,
  createProject
);

router.get(
  "/my-projects",
  authMiddleware,
  getProjects
);

router.delete(
  "/:projectId",
  authMiddleware,
  deleteProject
);

export default router;