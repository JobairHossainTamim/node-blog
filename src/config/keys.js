const { PORT, MONGO_URL, JWT_SECRET, ClOUD_NAME, ClOUD_API_KEY, CLOUD_SECRET } =
  process.env;

module.exports = {
  port: PORT,
  connectionUrl: MONGO_URL,
  jwtSecret: JWT_SECRET,
  cloudName: ClOUD_NAME,
  cloudApiKey: ClOUD_API_KEY,
  cloudSecret: CLOUD_SECRET,
};
