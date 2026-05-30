import { redisClient } from "../config/redis.js";

// ==========================================
// TOKEN BUCKET ALGORITHM
// Imagine a literal bucket that holds a certain number of "tokens" (limit).
// Every time a user makes a request, they take 1 token out of the bucket.
// If the bucket is empty, their request is blocked.
// The bucket slowly refills with tokens over time.
// ==========================================

export const tokenBucket = async (key, limit, windowTime) => {
  // 1. Get the current exact time in milliseconds
  const now = Date.now();

  // 2. Look up the user's "bucket" in the Redis database using their unique key
  const data = await redisClient.hGetAll(key);

  // 3. How many tokens do they have right now? (If they don't have a bucket yet, give them the max limit)
  let tokens = Number(data.tokens || limit);

  // 4. When was the last time they made a request? (If first time, use current time)
  let lastRefill = Number(data.lastRefill || now);

  // 5. Calculate how many seconds have passed since their last request
  const elapsed = (now - lastRefill) / 1000;

  // 6. Calculate how fast the bucket refills (e.g. 100 requests per 60 seconds = 1.66 tokens per second)
  const refillRate = limit / windowTime;

  // 7. Add new tokens based on how much time has passed, but never exceed the maximum bucket limit!
  tokens = Math.min(limit, tokens + elapsed * refillRate);

  // 8. If the bucket has less than 1 full token, they are making requests too fast!
  if (tokens < 1) {
    return {
      allowed: false, // Block the request
      remaining: 0
    };
  }

  // 9. Otherwise, they have enough tokens! Subtract 1 token for this current request.
  tokens -= 1;

  // 10. Save their updated token count and the current time back into the Redis database
  await redisClient.hSet(key, {
    tokens,
    lastRefill: now
  });

  // 11. Optional: Tell Redis to automatically delete this bucket after the windowTime passes to save memory
  await redisClient.expire(key, windowTime);

  // 12. Allow the request to go through!
  return {
    allowed: true,
    remaining: Math.floor(tokens)
  };
};