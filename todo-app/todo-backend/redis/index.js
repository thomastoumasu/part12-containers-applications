const redis = require("redis");
const { promisify } = require("util");
const { REDIS_URL } = require("../util/config");

let getAsync;
let setAsync;

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log("No REDIS_URL set, Redis is disabled");
    return null;
  };
  getAsync = redisIsDisabled;
  setAsync = redisIsDisabled;
} else {
  console.log("before creating redis client");
  const client = redis.createClient({
    url: REDIS_URL,
    // url: "redis://redis:6379",
    // legacyMode: true,
  });
  console.log("after creating redis client");

  getAsync = promisify(client.get).bind(client);
  setAsync = promisify(client.set).bind(client);
}

module.exports = {
  getAsync,
  setAsync,
};
