const MateriModel = require("../models").materi;
const UserModel = require("../models").userSekolah;

async function createMult(req, res) {
  try {
    const { data } = req.body;
    let success = 0;
    let fail = 0;
    let total = data.length;
    console.log(req.role);
    console.log(req.id);
    if (req.role === "Guru") {
      await Promise.all(
        data.map(async (item) => {
          try {
            await MateriModel.create(
              {
                mataPelajaran: item.mataPelajaran,
                materi: item.materi,
                kelas: item.kelas,
                userId: req.id,
              },
              {
                where: {
                  userId: req.id,
                },
              }
            );
            success = success + 1;
          } catch (error) {
            fail = fail + 1;
          }
        })
      );
    } else {
      return res.status(422).json({
        status: "Fail",
        message: "you don't have permission because you are a student",
      });
    }
    res.status(201).json({
      status: "Success",
      message: `Created ${success}, fail ${fail}. Total create is ${total}`,
      // data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "There is something wrong",
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { mataPelajaran, materi, kelas } = payload;
    const Materi = await MateriModel.findByPk(id);
    if (Materi === null) {
      return res.status(404).json({
        status: "Fail",
        message: "Materi not found",
      });
    }
    if (req.role === "Guru") {
      if (Materi.userId != req.id) {
        return res.status(422).json({
          status: "Fail",
          message: "Materi is not belong to you, you can't update it",
        });
      }
      await MateriModel.update(
        {
          mataPelajaran,
          materi,
          kelas,
        },
        {
          where: {
            userId: req.id,
            id: id,
          },
        }
      );
    } else {
      return res.status(422).json({
        status: "Fail",
        message: "you don't have permission because you are a student",
      });
    }
    res.json({
      status: "Success",
      message: "Updated",
      // data: Model,
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

async function deleteMult(req, res) {
  try {
    const { data } = req.body;
    let success = 0;
    let fail = 0;
    let jumlah = data.length;
    if (req.role === "Guru") {
      await Promise.all(
        data.map(async (item) => {
          try {
            const idNya = await MateriModel.findOne({
              where: {
                id: item.id,
              },
            });
            if (idNya.userId !== req.id) {
              // res.status(403).json({
              //   status: "Fail",
              //   message: "No such as article",
              // });
              fail = fail + 1;
            }
            await MateriModel.destroy({
              where: {
                id: item.id,
              },
            });
            console.log(item.id);
            console.log(id);
            success = success + 1;
          } catch (error) {
            // fail = fail + 1;
            console.log(error);
          }
        })
      );
      res.status(200).json({
        status: "Success",
        message: `Materi multi deleted ${success} from ${jumlah} and fail ${fail}`,
        // data: data,
      });
    } else {
      return res.status(422).json({
        status: "Fail",
        message: "you don't have permission because you are a student",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "There is something wrong",
    });
  }
}

async function getPersonalMateri(req, res) {
  try {
    const materi = await MateriModel.findAll({
      where: {
        userId: req.id,
      },
    });
    if (materi === null) {
      return res.status(404).json({
        status: "Fail",
        message: "artikel not found",
      });
    }
    res.json({
      status: "success",
      message: "Data Artikel Ditemukan",
      data: materi,
    });
    console.log(materi);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "Fail",
      message: "Rute tidak ditemukan",
    });
  }
}

async function getAllMateri(req, res) {
  try {
    const materi = await MateriModel.findAll();
    if (materi === null) {
      return res.status(404).json({
        status: "Fail",
        message: "artikel not found",
      });
    }
    res.json({
      status: "success",
      message: "Data Artikel Ditemukan",
      data: materi,
    });
    console.log(materi);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "Fail",
      message: "Rute tidak ditemukan",
    });
  }
}

module.exports = {
  createMult,
  update,
  deleteMult,
  getAllMateri,
  getPersonalMateri,
};
