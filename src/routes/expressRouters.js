const express = require("express");
const getListProduk = require("../controllers/ProdukController");
const getListUser = require("../controllers/UserController");
const routers = express.Router();

//user
routers.get("/user/list", getListUser);

//produk
routers.get("/produk/list", getListProduk);

module.exports = routers;
