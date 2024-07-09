const notFound = (req, res, next) => {
  return res.status(404).json({
    code: 404,
    status: false,
    message: "Api Not found",
  });
};


module.exports = notFound;
