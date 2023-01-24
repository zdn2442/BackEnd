const express = require("express");
const {getListProduk, createProduk, getDetailProdukById, getDetailProdukByParams} = require("../controllers/ProdukController");
const { getListUser, createUser, getDetailUserById, getDetailUserByParams } = require("../controllers/UserController");
const validationResultMiddleware = require("../middleware/validationResult.jsMiddleware");
const createProdukValidator = require("../validators/produkValidator");
const createUserValidator = require("../validators/userValidator");
const routers = express.Router();

//user
routers.get("/user/list", getListUser);
routers.post("/user/create", createUserValidator, validationResultMiddleware, createUser);
routers.get("/user/detail/:id", getDetailUserById);
routers.get("/user/list/:email", getDetailUserByParams);

//produk
routers.get("/produk/list", getListProduk);
routers.post("/produk/create",createProdukValidator, validationResultMiddleware, createProduk)
routers.get("/produk/detail/:id", getDetailProdukById);
routers.get("/produk/list/:brand", getDetailProdukByParams);

module.exports = routers;
