import Project from "../models/Project.js";

export const projectMiddleware = async (
  req,
  res,
  next
) => {
  try {

    const apiKey =
      req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        message: "API Key missing"
      });
    }

    const project =
      await Project.findOne({ apiKey });

    if (!project) {
      return res.status(401).json({
        message: "Invalid API Key"
      });
    }

    req.project = project;

    next();

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};