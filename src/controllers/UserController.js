const UserModel = require("../models").user

async function getListUser(req, res) {
    try {
        const users = await UserModel.findAll()
        res.json({
            status: "success",
            message: "Data User Ditemukan",
            data: users
        })
        console.log(users);
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Rute tidak ditemukan"
        })
    }
}

module.exports = getListUser
