const ArtikelModel = require("../models").artikel;

async function getArtikel(req, res) {
  try {
    const artikels = await ArtikelModel.findAll({
      where: {
        userId: req.id,
      },
    });
    if (artikels === null) {
      return res.status(404).json({
        status: "Fail",
        message: "artikel not found",
      });
    }
    res.json({
      status: "success",
      message: "Data Artikel Ditemukan",
      data: artikels,
    });
    console.log(artikels);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "Fail",
      message: "Rute tidak ditemukan",
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
      message: "Artikel Created",
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
  deleteArtikel
};
