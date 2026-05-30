import {
  redisClient
} from "../config/redis.js";

export const fixedWindow =
async (
  key,
  limit,
  windowTime
) => {

  // current count

  let currentCount =
    await redisClient.get(key);

  currentCount =
    Number(currentCount);

  console.log(
    "CURRENT COUNT:",
    currentCount
  );

  // first request

  if (!currentCount) {

    await redisClient.set(
      key,
      1,
      {
        EX: windowTime
      }
    );

    return {
      allowed: true,
      remaining:
        limit - 1
    };
  }

  // limit exceeded

  if (currentCount >= limit) {

    return {
      allowed: false,
      remaining: 0
    };
  }

  // increment

  const updatedCount =
    await redisClient.incr(key);

  console.log(
    "UPDATED COUNT:",
    updatedCount
  );

  return {
    allowed: true,
    remaining:
      limit - updatedCount
  };
};