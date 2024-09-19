const fs = require("fs");
const multer = require("multer");
const path = require("path");
const generateCode = require("../utils/generateCode");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = path.join(__dirname, "../uploads"); // Correct path handling
    // Check if directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Create directory if not exists
    }
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const fileName = originalName.replace(extension, "");
    const compressFilename = fileName.split(" ").join("_");
    const lowerCaseFileName = compressFilename.toLowerCase();
    const code = generateCode(12);

    const finalFile = `${lowerCaseFileName}_${code}${extension}`;
    callback(null, finalFile);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
