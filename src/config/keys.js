const { PORT, MONGO_URL, JWT_SECRET } = process.env;

module.exports = {
  port: PORT,
  connectionUrl: MONGO_URL,
  jwtSecret: JWT_SECRET,
};
