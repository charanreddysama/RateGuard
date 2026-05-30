import { redisClient }
from "../config/redis.js";

export const slidingWindow = async (
  key,
  limit,
  windowTime
) => {

  const now = Date.now();

  const windowStart =
    now - windowTime * 1000;

  // remove old timestamps

  await redisClient.zRemRangeByScore(
    key,
    0,
    windowStart
  );

  // count current requests

  const currentCount =
    await redisClient.zCard(key);

  if (currentCount >= limit) {

    return {
      allowed: false,
      remaining: 0
    };
  }

  // add current request

  await redisClient.zAdd(
    key,
    {
      score: now,
      value: `${now}-${Math.random()}`
    }
  );

  // set expiry

  await redisClient.expire(
    key,
    windowTime
  );

  return {
    allowed: true,
    remaining:
      limit - currentCount - 1
  };
};