const express = require("express");
const { uploadFile } = require("./file.controller");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();
const multer = require("multer");
const upload = require("../../middleware/upload");

router.post("/upload", authMiddleware, upload.single("image"), uploadFile);

module.exports = router;
