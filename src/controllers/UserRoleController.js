const UserModel = require("../models").user;
const models = require("../models");
const UserRoleModel = require("../models").userRole

async function userRole(req, res) {
  try {
    const data = UserModel.findAndCountAll({
      attributes: ["id", "nama", "email"],
      include: [
        {
          model: models.role,
          require: true,
          as: "roles",
          attributes: ["id", "namaRole"],
          through: {
            attributes: ["id", "userId", "roleId"],
          },
        },
      ],
    });
    console.log("data user", data);
    return res.json({
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
}

async function getUserRole(req, res) {
    try {
      const data = UserRoleModel.findAndCountAll({
        attributes: ["id",],
        include: [
          {
            model: models.role,
            require: true,
            as: "roles",
            attributes: ["id", "namaRole"],
          },
          {
            model: models.user,
            require: true,
            as: "users",
            attributes: ["id", "nama"],
          },
        ],
      });
      console.log("data user", data);
      return res.json({
        status: "Success",
        message: "Bearhasil mendapat data",
        data: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        status: "Fail",
        message: "there something wrong",
        whatWhenWrong: error
      })
    }
  }

async function getUser(req, res) {
  try {
    const data = UserModel.findAll();
    return res.json({
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
}

module.exports = {
  userRole,
  getUser,
  getUserRole
};
