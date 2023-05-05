const NilaiModel = require("../models").nilai;
const models = require("../models");
const { checkQuery } = require("../utils");
const { Op } = require("sequelize");

async function getlistNilai(req, res) {
  const { page, pageSize } = req.query;
  try {
    const nilai = await NilaiModel.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: models.user,
          as: "user",
          attributes: ["nama"],
        },
      ],
    });
    res.json({
      status: "Success",
      message: "Nilai ditemukan",
      pagination: {
        currentPage: page,
        pageSize: pageSize,
      },
      data: nilai,
      query: {
        page,
        pageSize,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "there are something wrong",
    });
  }
}

module.exports = {
  getlistNilai,
};
