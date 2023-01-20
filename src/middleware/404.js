const notFound = (req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "Route Not Found"
    })
}

module.exports = notFound