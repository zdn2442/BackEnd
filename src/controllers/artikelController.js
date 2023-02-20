const { Op } = require("sequelize");

const ArtikelModel = require("../models").artikel;

// async function getArtikel(req, res) {
//   try {
//     const artikels = await ArtikelModel.findAll({
//       where: {
//         userId: req.id,
//       },
//     });
//     if (artikels === null) {
//       return res.status(404).json({
//         status: "Fail",
//         message: "artikel not found",
//       });
//     }
//     res.json({
//       status: "success",
//       message: "Data Artikel Ditemukan",
//       data: artikels,
//     });
//     console.log(artikels);
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({
//       status: "Fail",
//       message: "Rute tidak ditemukan",
//     });
//   }
// }

// async function getArtikel(req, res) {
//   const { title, dari_tahun, sampai_tahun } = req.query;
//   try {
//     const artikels = await ArtikelModel.findAll({
//       attributes: ["id", ["userId", "owner"], "title", "year", "description"],
//       where: {
//         title: {
//           [Op.substring]: title,
//         },
//         year: {
//           [Op.between]: [dari_tahun, sampai_tahun],
//         },
//       },
//     });
//     res.json({
//       status: "success",
//       message: "Article founded",
//       data: artikels,
//     });
//     console.log(artikels);
//   } catch (error) {
//     console.log(error);
//     res.status(403).json({
//       status: "Fail",
//       message: "Article not found",
//     });
//   }
// }

async function getArtikel(req, res) {
  const {keyword, year, title, offset, page, pageSize, sortBy = 'id', orderBy = 'asc' } = req.query;
  try {
    const artikels = await ArtikelModel.findAndCountAll({
      attributes: ["id", ["userId", "owner"], "title", "year", "description"],
      // where: {
      //  [Op.or]:[
      //   {
      //     title: {
      //       [Op.substring]: keyword
      //     }
      //   },
      //   {
      //     description: {
      //       [Op.substring] : keyword
      //     }
      //   }
      //  ],
      //  year: {
      //   [Op.gt] : year
      //  }
      // },
      order: [[sortBy, orderBy]],
      limit: pageSize,
      offset: offset
    });
    res.json({
      status: "success",
      message: "Article founded",
      data: artikels,
      pagination:{
        currentPage: page,
        pageSize: pageSize,
        totalData: artikels.count,
      }
    });
    console.log(artikels);
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "Article not found",
    });
  }
}

async function createArtikel(req, res) {
  const payload = req.body;
  const { title, year, description } = payload;
  await ArtikelModel.create({
    title,
    year,
    description,
    userId: req.id,
  });
  try {
    res.status(201).json({
      status: "Success",
      message: "Article Created",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "There is something wrong",
    });
  }
}

async function createArtikelBulk(req, res) {
  try {
    const { data } = req.body;
    data.map((item, index) => {
      item.userId = req.id;
    });
    await ArtikelModel.bulkCreate(data);
    res.status(201).json({
      status: "Success",
      message: "Artikel bulk Created",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "There is something wrong",
    });
  }
}

async function createArtikelMulti(req, res) {
  try {
    const { data } = req.body;
    let success = 0;
    let fail = 0;
    let jumlah = data.length;
    await Promise.all(
      data.map(async (item) => {
        try {
          await ArtikelModel.create({
            title: item.title,
            year: item.year,
            description: item.description,
            userId: req.id,
          });
          success = success + 1;
        } catch (error) {
          fail = fail + 1;
        }
      })
    );
    res.status(201).json({
      status: "Success",
      message: `Artikel multi Created ${success} from ${jumlah} and fail ${fail}`,
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

async function deleteArtikelMulti(req, res) {
  try {
    const { data } = req.body;
    let success = 0;
    let fail = 0;
    let jumlah = data.length;
    await Promise.all(
      data.map(async (item) => {
        try {
          const idNya = await ArtikelModel.findOne({
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
          await ArtikelModel.destroy({
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
      message: `Artikel multi deleted ${success} from ${jumlah} and fail ${fail}`,
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

async function updateArtikel(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { title, year, description } = payload;
    const artikel = await ArtikelModel.findByPk(id);
    if (artikel === null) {
      return res.status(404).json({
        status: "Fail",
        message: "artikel not found",
      });
    }
    if (artikel.userId != req.id) {
      return res.status(422).json({
        status: "Fail",
        message: "artikel is not belong to you, you can't update it",
      });
    }
    await ArtikelModel.update(
      {
        title,
        year,
        description,
      },
      {
        where: {
          userId: req.id,
          id: id,
        },
      }
    );
    res.json({
      status: "Success",
      message: "Updated",
      // data: artikel,
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

async function deleteArtikel(req, res) {
  try {
    const { id } = req.params;
    const artikel = await ArtikelModel.findByPk(id);
    if (artikel === null) {
      res.status(404).json({
        status: "Fail",
        message: "artikel not found",
      });
    }
    if (artikel.userId != req.id) {
      return res.status(422).json({
        status: "Fail",
        message: "artikel is not belong to you, you can't delete it",
      });
    }
    await ArtikelModel.destroy({
      where: {
        userId: req.id,
        id: id,
      },
    });
    res.json({
      status: "Success",
      message: "artikel dihapus",
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
  createArtikel,
  getArtikel,
  updateArtikel,
  deleteArtikel,
  createArtikelBulk,
  createArtikelMulti,
  deleteArtikelMulti,
};
