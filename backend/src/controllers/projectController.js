import Project
from "../models/Project.js";

import crypto from "crypto";

export const createProject =
async (req, res) => {

  try {

    const { name } = req.body;

    const apiKey =
      crypto.randomUUID();

    const project =
      await Project.create({

        userId: req.user.id,

        name,

        apiKey
      });

    res.status(201).json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

export const getProjects =
async (req, res) => {

  try {

    const projects =
      await Project.find({
        userId: req.user.id
      });

    res.json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteProject =
async (req, res) => {

  try {

    const { projectId } =
      req.params;

    await Project.findByIdAndDelete(
      projectId
    );

    res.json({
      message:
        "Project deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};