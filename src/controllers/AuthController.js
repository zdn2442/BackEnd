const UserModel = require("../models").user;
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
require("dotenv").config();

//register
async function register(req, res) {
  try {
    const payload = req.body;
    const { nama, email, password } = payload;
    let hashPassword = await bcrypt.hashSync(password, 10);
    await UserModel.create({
      nama,
      email,
      password: hashPassword,
    });
    res.json({
      status: "Success",
      message: "Register berhasil",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "There is something wrong",
    });
  }
}

//login
async function login(req, res) {
    try {
      const payload = req.body;
      const {email, password } = payload;
      const user = await UserModel.findOne({
       where:{
        email,
       }
      });
      if (user === null) {
        return res.status(422).json({
            status: "Fail",
            message: "Email tidak terdaftar, register dulu lah kocak"
        })
      } 
      if (password === null) {
        return res.status(422).json({
            status: "Fail",
            message: "cocokin dulu email sama passwordnya"
        })
      }
      const verify = await bcrypt.compareSync(password, user.password)
      if (verify === false) {
        return res.status(422).json({
            status: "Fail",
            message: "cocokin dulu email sama passwordnya"
        })
      }
      const token = jwt.sign({
        id: user?.id,
        email: user?.email,
        nama: user?.nama
      }
      ,process.env.JWT_SECRET,
      {
        expiresIn: "30d"
      })
      res.json({
        status: "Success",
        message: "login berhasil",
        token: token,
        data: user
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
  register,
  login
};
