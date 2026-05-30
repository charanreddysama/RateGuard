import mongoose from "mongoose";

import Analytics
from "../models/Analytics.js";

export const getProjectAnalytics =
async (req, res) => {

  try {

    const { projectId } = req.params;

    const objectProjectId =
      new mongoose.Types.ObjectId(
        projectId
      );

    // total requests

    const totalRequests =
      await Analytics.countDocuments({
        projectId: objectProjectId
      });

    // blocked requests

    const blockedRequests =
      await Analytics.countDocuments({
        projectId: objectProjectId,
        allowed: false
      });

    // successful requests

    const successfulRequests =
      await Analytics.countDocuments({
        projectId: objectProjectId,
        allowed: true
      });

    // route stats

    const routeStats =
      await Analytics.aggregate([
        {
          $match: {
            projectId: objectProjectId
          }
        },
        {
          $group: {
            _id: "$route",

            count: {
              $sum: 1
            }
          }
        }
      ]);

    res.json({
      totalRequests,
      blockedRequests,
      successfulRequests,
      routeStats
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};