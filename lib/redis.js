const Redis = require("ioredis");

const getRedisURL = () => {
  if (process.env.REDIS_URL) return process.env.REDIS_URL;
  throw new Error("Redis URL not found");
};

module.exports = new Redis(getRedisURL());
