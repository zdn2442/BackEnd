const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtValidateMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  const bearerHeader = auth.split(" ");
  const token = bearerHeader[1];
  if (!auth) {
    return res.sendStatus(401).json({
      message: "token nya gk ada",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "Fail",
        err: err,
      });
    } else {
      req.id = decoded.id;
      req.nama = decoded.nama;
      req.email = decoded.email;
      next()
    }
  });
};

module.exports = jwtValidateMiddleware;
