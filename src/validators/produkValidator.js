const { check } = require("express-validator");
const ProdukModel = require("../models").produk;

const createProdukValidator = [
  check("namaProduk")
    .isLength({
      min: 1,
    })
    .withMessage("Wajib Isi woy")
    .custom((value) => {
      return ProdukModel.findOne({
        where: {
          email: value,
        },
      }).then((produk) => {
        if (produk) {
          return Promise.reject("Produk sudah ditambahakn");
        }
      });
    }),
  check("brand")
    .isLength({
      min: 1,
    })
    .withMessage("Ini juga harus diisi"),
  check("jumlah")
    .isLength({
      min: 1,
    })
    .withMessage("Ini juga"),
  check("harga")
    .isLength({
      min: 1,
    })
    .withMessage("Yang Ini juga"),
  check("stok")
    .isLength({
      min: 1,
    })
    .withMessage("semuanya harus diisi yah.."),
];

module.exports = createProdukValidator;
