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

module.exports = getListProduk
