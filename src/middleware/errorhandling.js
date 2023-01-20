const errorHandling = (err, req, res, next) => {
    res.status(500).json({
        status: "error",
        message: "Server lagi Error"
    })
}

module.exports = errorHandling;
