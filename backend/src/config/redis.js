import { createClient } from "redis";

export let redisClient;

let redisUnavailable = false;

const createRedisClient = () => {

  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {

    redisUnavailable = true;

    return null;
  }

  const client = createClient({
    url: redisUrl,

    socket: {
      reconnectStrategy: (retries) =>
        Math.min(retries * 50, 500)
    }
  });

  client.on("error", (err) => {
    console.log(
      "Redis Error:",
      err.message || err
    );
  });

  client.on("connect", () => {
    console.log("Redis Connected");
  });

  return client;
};

export const connectRedis = async () => {

  try {

    if (redisUnavailable) {
      return null;
    }

    if (!redisClient) {
      redisClient = createRedisClient();
    }

    if (!redisClient) {

      console.log(
        "Redis unavailable: REDIS_URL is not set"
      );

      return null;
    }

    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    return redisClient;

  } catch (error) {

    redisUnavailable = true;

    console.log(
      "Redis unavailable:",
      error.message
    );

    return null;
  }
};