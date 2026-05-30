import RateLimitRule
from "../models/RateLimitRule.js";

import {
  algorithmFactory
}
from "../algorithms/algorithmFactory.js";

import {
  trackAnalytics
}
from "../services/analyticsService.js";

export const rateLimiterMiddleware =
async (req, res, next) => {

  try {

    const route = req.path;

    const projectId =
      req.project._id;

    // find rule

    const rule =
      await RateLimitRule.findOne({
        projectId,
        route
      });

    // no rule → allow request

    if (!rule) {
      return next();
    }

    // identify user/client

    const identifier =
      req.headers["x-forwarded-for"] ||
      req.ip;

    // redis key

    const redisKey =
`rate_limit:${projectId}:${route}:${identifier}`;

    // select algorithm dynamically

    const algorithm =
      algorithmFactory(
        rule.algorithm
      );

    // run algorithm

    const result =
      await algorithm(
        redisKey,
        rule.limit,
        rule.window
      );

    // analytics tracking

    await trackAnalytics({
      projectId,
      route,
      identifier,
      algorithm: rule.algorithm,
      allowed: result.allowed
    });

    // standard headers

    res.setHeader(
      "X-RateLimit-Limit",
      rule.limit
    );

    res.setHeader(
      "X-RateLimit-Remaining",
      result.remaining
    );

    res.setHeader(
      "X-RateLimit-Algorithm",
      rule.algorithm
    );

    // blocked request

    if (!result.allowed) {

      res.setHeader(
        "Retry-After",
        rule.window
      );

      return res.status(429).json({
        success: false,
        message:
          "Too many requests"
      });
    }

    // allow request

    next();

  } catch (error) {

    console.log(
      "Rate Limiter Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};