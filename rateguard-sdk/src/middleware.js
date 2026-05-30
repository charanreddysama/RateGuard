import { checkRateLimit } from "./client.js";

export function rateGuard({ apiKey, baseUrl, identifier }) {
  if (!apiKey) {
    throw new Error("[RateGuard] apiKey is required to initialize the middleware. Get your API key from the RateGuard Dashboard.");
  }

  return async (req, res, next) => {
    try {
      const resolvedIdentifier = typeof identifier === 'function' ? await identifier(req) : (identifier || req.ip);

      const result = await checkRateLimit({
        apiKey,
        baseUrl,
        route: req.route?.path || req.path,
        identifier: resolvedIdentifier
      });

      // Set standard Rate Limiting headers if provided by the backend
      if (result.limit !== undefined) {
        res.setHeader("X-RateLimit-Limit", result.limit);
      }
      if (result.remaining !== undefined) {
        res.setHeader("X-RateLimit-Remaining", result.remaining);
      }

      if (!result.allowed) {
        return res.status(429).json({
          message: "Too many requests",
          limit: result.limit,
          algorithm: result.algorithm
        });
      }

      next();
    } catch (error) {
      console.error("[RateGuard] Error checking rate limit:", error.message);
      // In case of an infrastructure error, fail open or fail closed?
      // Usually, it's safer to fail open (allow) so we don't break the user's app if our backend is down
      next();
    }
  };
}