const errorHandler = (req, res, next) => {
  const code = res.code ? res.code : 500;
  return res.status(code).json({
    code,
    status: false,
    stack: error.stack,
  });
};

module.exports = errorHandler;
