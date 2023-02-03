const { check } = require("express-validator");
const UserModel = require("../models").user;

const createUserValidator = [
  check("nama")
    .isLength({
      min: 1,
    })
    .withMessage("Wajib Isi"),
  check("email")
    .isEmail()
    .withMessage("Harus Tipe Email")
    .custom((value) => {
      return UserModel.findOne({
        where: {
          email: value,
        },
      }).then((user) => {
        if (user) {
          return Promise.reject("Email sudah digunakan");
        }
      });
    }),
];

const updateUserValidator = [
  check("nama")
  .isLength({
    min: 1,
  })
  .withMessage("Wajib Isi")
]

const updatePassValidator = [
  check("new_password")
  .isLength({
    min: 8,
  })
  .withMessage("Isi Wajib 8 karakter"),
  check("password")
  .isLength({
    min: 8,
  })
  .withMessage("Isi Wajib 8 karakter"),
  check("email")
  .isEmail()
  .withMessage("harus tipe email")
  .isLength({
    min: 1,
  })
  .withMessage("Wajib Isi")
]

module.exports = {
  createUserValidator,
  updateUserValidator,
  updatePassValidator
};

