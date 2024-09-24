const path = require("path");
const { validExtension } = require("./file.validator");
const uploadCloudFile = require("./cloud.upload");

const uploadFile = async (req, res, next) => {
  try {
    const { file } = req;

    if (!file) {
      res.code = 400;
      throw new Error("File Is Not selected ");
    }
    const ext = path.extname(file.originalname);
    const isValidExt = validExtension(ext);

    if (!isValidExt) {
      res.code = 400;
      throw new Error("Only jpeg , png, jpg allowed");
    }

    const key = await uploadCloudFile({ file, ext });

    res.status(201).json({
      code: 201,
      status: true,
      message: "File upload Successfully",
      data: { key },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile };
