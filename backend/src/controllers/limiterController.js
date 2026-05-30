import RateLimitRule
from "../models/RateLimitRule.js";

import Project
from "../models/Project.js";

import {
  algorithmFactory
}
from "../algorithms/algorithmFactory.js";

import {
  trackAnalytics
}
from "../services/analyticsService.js";

export const checkRateLimit =
async (req, res) => {

  try {

    // api key

    const apiKey =
      req.headers["x-api-key"];

    if (!apiKey) {

      return res.status(401).json({
        allowed: false,
        message:
          "API key missing"
      });
    }

    // find project

    const project =
      await Project.findOne({
        apiKey
      });

    if (!project) {

      return res.status(401).json({
        allowed: false,
        message:
          "Invalid API key"
      });
    }

    // request data

    const {
      route,
      identifier
    } = req.body;

    if (!route) {

      return res.status(400).json({
        allowed: false,
        message:
          "Route required"
      });
    }

    // find rule

    const rule =
      await RateLimitRule.findOne({

        projectId:
          project._id,

        route
      });

    // no rule → allow

    if (!rule) {

      return res.json({
        allowed: true,
        message:
          "No rule configured"
      });
    }

    // unique identifier

    const uniqueIdentifier =
      identifier ||
      req.ip;

    // redis key

    const redisKey =
`rate_limit:${project._id}:${route}:${uniqueIdentifier}`;

    // select algorithm

    const algorithm =
      algorithmFactory(
        rule.algorithm
      );

    // execute algorithm

    const result =
      await algorithm(
        redisKey,
        rule.limit,
        rule.window
      );

    // analytics

    await trackAnalytics({

      projectId:
        project._id,

      route,

      identifier:
        uniqueIdentifier,

      algorithm:
        rule.algorithm,

      allowed:
        result.allowed
    });

    // block

    if (!result.allowed) {

      return res.status(429).json({

        allowed: false,

        message:
          "Too many requests",

        remaining: 0,

        limit:
          rule.limit,

        algorithm:
          rule.algorithm
      });
    }

    // allow

    res.json({

      allowed: true,

      remaining:
        result.remaining,

      limit:
        rule.limit,

      algorithm:
        rule.algorithm
    });

  } catch (error) {

    res.status(500).json({

      allowed: false,

      message:
        error.message
    });
  }
};