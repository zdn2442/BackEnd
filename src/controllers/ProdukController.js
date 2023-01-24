const ProdukModel = require("../models").Produk

async function getListProduk(req, res) {
    try {
        const produks = await ProdukModel.findAll()
        res.json({
            status: "success",
            message: "Data Produk Ditemukan",
            data: produks
        })
        console.log(produks);
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "Rute tidak ditemukan"
        })
        console.log(error);
    }
}

//create data ke database
async function createProduk(req, res) {
    try {
      const payload = req.body;
      let { namaProduk, brand, jumlah, harga, stok } = payload;
      let produk = await ProdukModel.create({
        namaProduk: namaProduk,
        brand: brand,
        jumlah: jumlah,
        harga: harga,
        stok: stok,
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
  async function getDetailProdukById(req, res) {
    try {
      const id = req.params.id;
      const produk = await ProdukModel.findByPk(id);
      if (produk === null) {
        res.status(404).json({
          status: "Fail",
          message: "produk not found",
        });
      }
      res.json({
        status: "success",
        message: "Data detail produk didapat",
        data: produk,
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
  async function getDetailProdukByParams(req, res) {
    try {
      const { brand } = req.params;
      const produk = await ProdukModel.findOne({
        where: {
          brand: brand,
        },
      });
      if (produk === null) {
        res.status(404).json({
          status: "Fail",
          message: "produk not found",
        });
      }
      res.json({
        status: "success",
        message: "Data detail produk didapat",
        data: produk,
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
    getListProduk,
    createProduk,
    getDetailProdukById,
    getDetailProdukByParams
};

