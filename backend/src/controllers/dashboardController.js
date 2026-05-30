import Analytics from "../models/Analytics.js";
import Project from "../models/Project.js";

export const getDashboardStats =
async (req, res) => {

  try {

    const projects =
      await Project.find({
        userId: req.user.id
      });

    const projectIds =
      projects.map(
        p => p._id
      );

    const totalProjects = projects.length;

    const totalRequests = await Analytics.countDocuments({ projectId: { $in: projectIds } });

    const blockedRequests = await Analytics.countDocuments({
      projectId: { $in: projectIds },
      allowed: false
    });

    const successfulRequests = await Analytics.countDocuments({
      projectId: { $in: projectIds },
      allowed: true
    });

    const recentProjects = await Project.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(3);

    const topRoutes = await Analytics.aggregate([
      { $match: { projectId: { $in: projectIds } } },
      { $group: { _id: "$route", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);

    const recentActivity = await Analytics.find({ projectId: { $in: projectIds } })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('projectId', 'name');

    res.json({
      totalProjects,
      totalRequests,
      blockedRequests,
      successfulRequests,
      recentProjects,
      topRoutes,
      recentActivity
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};