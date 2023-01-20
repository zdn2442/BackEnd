function consoleM(req, res, next) {
  console.log("console middleware");
  next();
}

module.exports = consoleM
