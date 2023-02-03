const UserModel = require("../models").user;
const ForPassModel = require("../models").password;
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { sendEmailHandle } = require("../mail");
const crypto = require("crypto");
const dayjs = require("dayjs");
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
    const { email, password } = payload;
    const user = await UserModel.findOne({
      where: {
        email,
      },
    });
    if (user === null) {
      return res.status(422).json({
        status: "Fail",
        message: "Email tidak terdaftar, register dulu lah kocak",
      });
    }
    if (password === null) {
      return res.status(422).json({
        status: "Fail",
        message: "cocokin dulu email sama passwordnya",
      });
    }
    const verify = await bcrypt.compareSync(password, user.password);
    if (verify === false) {
      return res.status(422).json({
        status: "Fail",
        message: "cocokin dulu email sama passwordnya",
      });
    }
    const token = jwt.sign(
      {
        id: user?.id,
        email: user?.email,
        nama: user?.nama,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.json({
      status: "Success",
      message: "login berhasil",
      token: token,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "There is something wrong",
    });
  }
}

async function updatePass(req, res) {
  try {
    const payload = req.body;
    let { email, password, new_password } = payload;
    const users = await UserModel.findOne({
      where: {
        email,
      },
    });
    const verify = await bcrypt.compareSync(password, users.password);
    if (users === null) {
      return res.status(404).json({
        status: "Fail",
        message: "email not found",
      });
    }
    if (verify) {
      let hashPassword = await bcrypt.hash(new_password, 10);
      await UserModel.update(
        { password: hashPassword },
        {
          where: {
            id: users.id,
          },
        }
      );
      res.status(201).json({
        status: "Success",
        message: "password updated",
      });
    } else {
      res.json({
        message: "old password doesn't match",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "there are something wrong in update password",
    });
  }
}

async function forPass(req, res) {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({
      where: {
        email,
      },
    });
    if (user === null) {
      return res.status(422).json({
        status: "Fail",
        message: "Email tidak terdaftar, register dulu lah kocak",
      });
    }
    const currentToken = ForPassModel.findOne({
      where: {
        userId: user.id,
      },
    });
    if (currentToken !== null) {
      await ForPassModel.destroy({
        where: {
          userId: user.id,
        },
      });
    }
    const token = crypto.randomBytes(32).toString("hex");
    //expire date token
    const date = new Date();
    const expire = date.setHours(date.getHours() + 1);
    await ForPassModel.create({
      userId: user.id,
      token: token,
      expireDate: dayjs(expire).format("DD/MM/YYYY HH:mm:ss"),
    });
    const context = {
      link: `${process.env.MAIL_CLIENT_URL}/forgot-password/${user.id}/${token}`,
      link2: "https://gamepress.gg/",
      link3: "https://youtube.com",
    };
    try {
      const sendMail = await sendEmailHandle(email, "forgot password", "forPass", context);
      if (sendMail === "success") {
        res.json({
          status: "Success",
          message: "Check your email",
        });
      } else {
        res.status(400).json({
          status: "Fail",
          message: "Use registered email",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: "Fail",
        message: "Can't send the email, please try again",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "there are something wrong ",
    });
  }
}

async function forPassEmail(req, res) {
  try {
    let { userId, token } = req.params;
    let { newPassword } = req.body;
    const tokenLama = await ForPassModel.findOne({
      where: {
        userId: userId,
        token: token,
      },
    });
    const user = UserModel.findOne({
      where: {
        id: userId,
      },
    });
    if (tokenLama === null) {
      return res.status(422).json({
        status: "Fail",
        message: "Token invalid",
      });
    } else {
      let userExpired = user.expiredDate;
      let expire = dayjs(Date());
      let difference = expire.diff(userExpired, "hour");
      if (difference !== 0) {
        res.json({
          status: "Fail",
          msg: "Token has expired",
        });
      } else {
        let hashPassword = await bcrypt.hash(newPassword, 10);

        if (newPassword === null) {
          res.status(403).json({
            status: "Fail",
            message: "Password must be filled",
          });
        } else {
          await UserModel.update(
            {
              password: hashPassword,
            },
            {
              where: {
                id: userId,
              },
            }
          );
          await ForPassModel.destroy({
            where: {
              token: token,
            },
          });
          res.status(201).json({
            status: "Success",
            message: "Password changed",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      message: "there are something wrong ",
      error: error,
    });
  }
}
//
/** 
 * 1. reset pass with email
 - token & userId exist?
 - error res
 - is it expire?
 - error res
 - reset with getting payload
 - yatta
 **/

module.exports = {
  updatePass,
  register,
  login,
  forPass,
  forPassEmail,
};
