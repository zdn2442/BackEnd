const express = require("express");
const { createArtikel, getArtikel, updateArtikel, deleteArtikel, createArtikelBulk, createArtikelMulti, deleteArtikelMulti } = require("../controllers/artikelController");
const { createMult, update, deleteMult, getAllMateri, getPersonalMateri } = require("../controllers/materiController");
// const { register, login, updatePass, forPass, forPassEmail } = require("../controllers/AuthController");
const { getListProduk, createProduk, getDetailProdukById, getDetailProdukByParams } = require("../controllers/ProdukController");
const { getListUser, createUser, getDetailUserById, getDetailUserByParams, updateUser, deleteUser} = require("../controllers/UserController");
const { register, login } = require("../controllers/UserSekolahController");
const jwtValidateMiddleware = require("../middleware/JwtValidateMiddleware");
const validationResultMiddleware = require("../middleware/validationResultMiddleware.js");
const createProdukValidator = require("../validators/produkValidator");
const { createUserValidator, updateUserValidator, updatePassValidator } = require("../validators/userValidator");
const routers = express.Router();

//auth
// routers.post("/register", register);
// routers.post("/login", login);
// routers.post("/forgot-password", forPass);
// routers.post("/forgot-password/:userId/:token", forPassEmail);
// routers.put("/update-password", updatePassValidator, validationResultMiddleware, updatePass);

//auth ujian
routers.post("/register", createUserValidator, validationResultMiddleware, register)
routers.post("/login", login);

//jwt
routers.use(jwtValidateMiddleware)

//materi
// routers.post("/materi/create", createMult)
// routers.put("/materi/update/:id", update)
// routers.delete("/materi/delete/:id", deleteMult)
// routers.get("/materi/all", getAllMateri)
// routers.get("/materi/personal", getPersonalMateri)

// //artikel
// routers.post("/artikel/create", createArtikel)
// routers.post("/artikel/create/bulk", createArtikelBulk)
// routers.post("/artikel/create/multi", createArtikelMulti)
// routers.get("/artikel", getArtikel)
// routers.post("/artikel/update/:id", updateArtikel)
// routers.delete("/artikel/delete/:id", deleteArtikel)
// routers.delete("/artikel/delete/try/multi", deleteArtikelMulti)

// //user
// routers.get("/user/list", getListUser);
// routers.post("/user/create", createUserValidator, validationResultMiddleware, createUser);
// routers.get("/user/detail/:id", getDetailUserById);
// routers.put("/user/update/:id", updateUserValidator, validationResultMiddleware, updateUser);
// routers.get("/user/list/:email", getDetailUserByParams);
// routers.delete("/user/delete/:id", deleteUser);

// //produk
// routers.get("/produk/list", getListProduk);
// routers.post("/produk/create", createProdukValidator, validationResultMiddleware, createProduk);
// routers.get("/produk/detail/:id", getDetailProdukById);
// routers.get("/produk/list/:brand", getDetailProdukByParams);

// module.exports = routers;
