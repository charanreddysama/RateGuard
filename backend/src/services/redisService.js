const { connectRedis } = require('../config/redis');

async function getValue(key) {
  try {
    const client = await connectRedis();

    if (!client) return null;

    return await client.get(key);
  } catch (err) {
    console.log('Redis service getValue error:', err.message || err);
    return null;
  }
}

module.exports = { getValue };