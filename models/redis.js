require("dotenv").config();
const redis = require("redis");

const publisher = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

(async () => {
  await publisher.connect();
})();
publisher.on("connect", () =>
  console.log("Redis 클라이언트가 서버에 연결되었습니다.")
);
publisher.on("error", (err) =>
  console.error("Redis 클라이언트 연결 에러:", err)
);

module.exports = publisher;
