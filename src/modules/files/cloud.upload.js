const cloudinary = require("cloudinary").v2;
const generateCode = require("../../utils/generateCode");

// Configure Cloudinary
cloudinary.config({
  cloud_name: `dtrgwsenn`,
  api_key: `242253624825968`,
  api_secret: `TLs5pFPX903YihGSTObXqVW-SeQ`,
});

const uploadCloudFile = async ({ file, ext }) => {
  const key = `${generateCode(12)}_${Date.now()}_${ext}`;

  try {
    // Upload using the file path from Multer
    const result = await cloudinary.uploader.upload(file.path, {
      public_id: key,
    });

    return result;
  } catch (error) {
    throw new Error("File upload failed.");
  }
};

const getUrlImage = async (key) => {
  try {
    const result = await cloudinary.api.resource(key);

    return result;
  } catch (error) {
    throw new Error("Get Url failed.");
  }
};

module.exports = { uploadCloudFile, getUrlImage };
