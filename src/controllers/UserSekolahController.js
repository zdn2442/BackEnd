const UserModel = require("../models").userSekolah;
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

async function register(req, res) {
  try {
    const payload = req.body;
    const { nama, email, password, role } = payload;
    let hashPassword = await bcrypt.hashSync(password, 10);
    await UserModel.create({
      nama,
      email,
      password: hashPassword,
      role,
    });
    res.status(201).json({
      status: "Success",
      message: "User Saved",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "There is something wrong",
    });
  }
}

async function login(req, res) {
  try {
    const payload = req.body;
    const { email, password } = payload;
    const user = await UserModel.findOne({
      where: {
        email,
      },
    });
    if (user === null) {
      return res.status(422).json({
        status: "Fail",
        message: "Email not found, please register",
      });
    }
    if (password === null) {
      return res.status(422).json({
        status: "Fail",
        message: "Password and Email doesn't match",
      });
    }
    const verify = await bcrypt.compareSync(password, user.password);
    if (verify === false) {
      return res.status(422).json({
        status: "Fail",
        message: "Password and Email doesn't match",
      });
    }
    const token = jwt.sign(
      {
        id: user?.id,
        role: user?.role,
        email: user?.email,
        nama: user?.nama,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.status(201).json({
      status: "Success",
      message: "Logged in",
      token: token,
      data: user,
    });
  } catch (error) {}
}

module.exports = {
  register,
  login,
};
