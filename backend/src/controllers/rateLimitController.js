import RateLimitRule
from "../models/RateLimitRule.js";

import Project
from "../models/Project.js";

export const createRule =
async (req, res) => {

  try {

    const {
      projectId,
      route,
      algorithm,
      limit,
      window
    } = req.body;

    const project =
      await Project.findById(
        projectId
      );

    if (!project) {

      return res.status(404).json({
        message: "Project not found"
      });
    }

    const existingRule =
      await RateLimitRule.findOne({
        projectId,
        route
      });

    if (existingRule) {

      return res.status(400).json({
        message:
          "Rule already exists for this route"
      });
    }

    const rule =
      await RateLimitRule.create({
        projectId,
        route,
        algorithm,
        limit,
        window
      });

    res.status(201).json(rule);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

export const getProjectRules =
async (req, res) => {

  try {

    const { projectId } =
      req.params;

    const rules =
      await RateLimitRule.find({
        projectId
      });

    res.json(rules);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteRule =
async (req, res) => {

  try {

    const { ruleId } =
      req.params;

    await RateLimitRule
      .findByIdAndDelete(ruleId);

    res.json({
      message:
        "Rule deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};