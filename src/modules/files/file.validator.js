const validExtension = (ext) => {
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
    return true;
  } else {
    return false;
  }
};

module.exports = { validExtension };