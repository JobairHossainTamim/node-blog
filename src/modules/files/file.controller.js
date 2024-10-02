const path = require("path");
const { validExtension } = require("./file.validator");
const {
  uploadCloudFile,
  getUrlImage,
  CloudDeleteFile,
} = require("./cloud.upload");
const fileModel = require("./file.model");

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

    if (key) {
      const newFile = new fileModel({
        key: key.public_id,
        size: file.size,
        mimetype: file.mimetype,
        createdBy: req.user._id,
      });

      await newFile.save();
    }

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

const getImageUrl = async (req, res, next) => {
  try {
    const { key } = req.query;
    const getData = await getUrlImage(key);
    res.status(201).json({
      code: 201,
      status: true,
      message: "File Url Successfully fetch",
      data: {
        url: getData?.url,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const { key } = req.query;
    const cloudDel = await CloudDeleteFile(key);
    const mongoDel = await fileModel.findOneAndDelete({ key });
    res.status(201).json({
      code: 201,
      status: true,
      message: "File Url Successfully fetch",
      data: {
        CloudDelete: cloudDel,
        MongoDelete: mongoDel,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile, getImageUrl, deleteFile };
