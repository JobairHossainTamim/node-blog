const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

const authMiddleware = async (req, res, next) => {
  try {
    const authorization =
      req.headers.authorization && req.headers.authorization.split(" ");

    const token = authorization.length > 1 ? authorization[1] : null;

    if (token) {
      const payload = jwt.verify(token, jwtSecret);
      if (payload) {
        req.user = {
          _id: payload._id,
          name: payload.name,
          email: payload.email,
          role: payload.role,
        };
        next();
      } else {
        res.status(401);
        throw new Error("Unauthorized");
      }
    } else {
      res.status(400);
      throw new Error("Token is required");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
