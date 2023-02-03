const express = require("express");
const { createArtikel, getArtikel, updateArtikel, deleteArtikel } = require("../controllers/artikelController");
const { register, login, updatePass, forPass, forPassEmail } = require("../controllers/AuthController");
const { getListProduk, createProduk, getDetailProdukById, getDetailProdukByParams } = require("../controllers/ProdukController");
const { getListUser, createUser, getDetailUserById, getDetailUserByParams, updateUser, deleteUser} = require("../controllers/UserController");
const jwtValidateMiddleware = require("../middleware/JwtValidateMiddleware");
const validationResultMiddleware = require("../middleware/validationResultMiddleware.js");
const createProdukValidator = require("../validators/produkValidator");
const { createUserValidator, updateUserValidator, updatePassValidator } = require("../validators/userValidator");
const routers = express.Router();

//auth
routers.post("/register", register);
routers.post("/login", login);
routers.post("/forgot-password", forPass);
routers.post("/forgot-password/:userId/:token", forPassEmail);
routers.put("/update-password", updatePassValidator, validationResultMiddleware, updatePass);

//jwt
routers.use(jwtValidateMiddleware)

//artikel
routers.post("/artikel/create", createArtikel)
routers.get("/artikel", getArtikel)
routers.post("/artikel/update/:id", updateArtikel)
routers.delete("/artikel/delete/:id", deleteArtikel)

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
