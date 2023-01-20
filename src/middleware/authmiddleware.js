function authMiddleware(req, res, next) {
  console.log("middleware called");
  console.log("header", req.headers);

  if (req?.headers?.authorization === "123") {
    next();
  } else if(req?.headers?.authorization === undefined){
    return res.status(401).json({
      status: "fail",
      msg: "Token unrecieve",
    });
  } else {
    return res.status(401).json({
      status: "fail",
      msg: "Token invalid",
    });
  }
}

module.exports = authMiddleware;
