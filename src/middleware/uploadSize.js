const multer = require("multer");

const uploadSize = multer({
  storage: multer.diskStorage({}),
  // for aws memory storage
  limits: { fileSize: 1024 * 1024 * 50 },
});

module.exports = uploadSize;
