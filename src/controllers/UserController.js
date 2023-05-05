const { where } = require("sequelize");
const models = require("../models");
const { Op } = require("sequelize");
const {checkQuery} = require("../utils")

const UserModel = require("../models").user;

async function getListUser(req, res) {
  const {mapel} = req.query
  try {
    const users = await UserModel.findAll({
      include: [
        {
          model: models.identitas,
          require: true,
          as: "identitas",
          attributes: ["golonganDarah", "alamat"],
        },
        {
          model: models.nilai,
          require: true,
          as: "nilai",
          attributes: ["mapel", "nilai"],
          where: {
            ...(checkQuery(mapel) && {
              mapel: {
                [Op.substring]: mapel,
              },
            }),
          },
        },
      ],
    });
    res.json({
      status: "success",
      message: "Data User Ditemukan",
      data: users,
    });
    console.log(users);
  } catch (error) {
    console.log(error
      );
    res.status(404).json({
      status: "Fail",
      message: "Rute tidak ditemukan",
    });
  }
}

//create data ke database
async function createUser(req, res) {
  try {
    const payload = req.body;
    let { nama, email, tempatLahir, tanggalLahir } = payload;
    let user = await UserModel.create({
      nama: nama,
      email: email,
      isActive: true,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
    });
    res.status(201).json({
      status: "Success",
      message: "Saved",
    });
  } catch (error) {
    res.status(404 || 403).json({
      status: "Fail",
      message: "There is something wrong",
    });
  }
}

//get pake id
async function getDetailUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: models.identitas,
          require: true,
          as: "identitas",
          attributes: ["golonganDarah", "alamat"],
        },
        {
          model: models.nilai,
          require: true,
          as: "nilai",
          attributes: ["mapel", "nilai"],
        },
      ],
    });
    if (user === null) {
      res.status(404).json({
        status: "Fail",
        message: "User not found",
      });
    }
    res.json({
      status: "success",
      message: "Data detail user didapat",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "There is something wrong",
    });
  }
}

//get pake params
async function getDetailUserByParams(req, res) {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (user === null) {
      res.status(404).json({
        status: "Fail",
        message: "User not found",
      });
    }
    res.json({
      status: "success",
      message: "Data detail user didapat",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "There is something wrong",
    });
  }
}

//update
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { nama, tempatLahir, tanggalLahir } = payload;
    const user = await UserModel.findByPk(id);
    if (user === null) {
      res.status(404).json({
        status: "Fail",
        message: "User not found",
      });
    }
    await UserModel.update(
      {
        nama,
        tempatLahir,
        tanggalLahir,
      },
      {
        where: {
          id: id,
        },
      }
    );
    // await UserModel.update(
    //   {
    //     nama: nama,
    //     tempatLahir :tempatLahir,
    //     tanggalLahir: tanggalLahir
    //   },
    //   {
    //     where: {
    //       id: id
    //     }
    //   }
    // )
    res.json({
      status: "Success",
      message: "Updated",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "There is something wrong",
    });
  }
}

//delete
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (user === null) {
      res.status(404).json({
        status: "Fail",
        message: "User not found",
      });
    }
    await UserModel.destroy({
      where: {
        id: id,
      },
    });
    res.json({
      status: "Success",
      message: "user dihapus",
      id: id,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "There is something wrong",
    });
  }
}

module.exports = {
  getListUser,
  createUser,
  getDetailUserById,
  getDetailUserByParams,
  updateUser,
  deleteUser,
};
