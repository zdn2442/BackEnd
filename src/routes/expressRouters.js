const express = require("express");
const { register, login } = require("../controllers/AuthController");
const { getListProduk, createProduk, getDetailProdukById, getDetailProdukByParams } = require("../controllers/ProdukController");
const { getListUser, createUser, getDetailUserById, getDetailUserByParams, updateUser, deleteUser} = require("../controllers/UserController");
const validationResultMiddleware = require("../middleware/validationResult.jsMiddleware");
const createProdukValidator = require("../validators/produkValidator");
const { createUserValidator, updateUserValidator } = require("../validators/userValidator");
const routers = express.Router();

//auth
routers.post("/register", register);
routers.post("/login", login);

//user
routers.get("/user/list", getListUser);
routers.post("/user/create", createUserValidator, validationResultMiddleware, createUser);
routers.get("/user/detail/:id", getDetailUserById);
routers.put("/user/update/:id", updateUserValidator, validationResultMiddleware, updateUser);
routers.get("/user/list/:email", getDetailUserByParams);
routers.delete("/user/delete/:id", deleteUser);

//produk
routers.get("/produk/list", getListProduk);
routers.post("/produk/create", createProdukValidator, validationResultMiddleware, createProduk);
routers.get("/produk/detail/:id", getDetailProdukById);
routers.get("/produk/list/:brand", getDetailProdukByParams);

module.exports = routers;
