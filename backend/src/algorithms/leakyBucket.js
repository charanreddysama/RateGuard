import { redisClient }
from "../config/redis.js";

export const leakyBucket = async (
  key,
  limit,
  windowTime
) => {

  const now = Date.now();

  const data =
    await redisClient.hGetAll(key);

  let water =
    Number(data.water || 0);

  let lastLeak =
    Number(data.lastLeak || now);

  const leakRate =
    limit / windowTime;

  const elapsed =
    (now - lastLeak) / 1000;

  water = Math.max(
    0,
    water - elapsed * leakRate
  );

  if (water >= limit) {

    return {
      allowed: false,
      remaining: 0
    };
  }

  water += 1;

  await redisClient.hSet(key, {
    water,
    lastLeak: now
  });

  await redisClient.expire(
    key,
    windowTime
  );

  return {
    allowed: true,
    remaining:
      Math.floor(limit - water)
  };
};