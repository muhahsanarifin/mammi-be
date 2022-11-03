const redis = require("redis");

const client = redis.createClient({
  url: process.env.URL_REDIS,
  username: process.env.USERNAME_REDIS,
  password: process.env.PASSWORD_REDIS,
});

client.on("connect", () => {
  console.log("Client was connected to redis");
});

client.on("ready", () => {
  console.log("Client was connected to redis ready to use");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", () => {
  console.log("Client was disconnected from redis");
});

process.on("SIGINT", () => {
  client.quit();
});

client.connect().then();

module.exports = client;
