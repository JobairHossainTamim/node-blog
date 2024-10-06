const express = require("express");
const { uploadFile, getImageUrl, deleteFile } = require("./file.controller");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();
const multer = require("multer");
const upload = require("../../middleware/upload");
const uploadSize = require("../../middleware/uploadSize");

// array upload 3 file upload.array("image",2)
// upload.array("image", 3)
router.post("/upload", authMiddleware, uploadSize.single("image"), uploadFile);

router.get("/image-url", authMiddleware, getImageUrl);

router.delete("/image-del", authMiddleware, deleteFile);

module.exports = router;
