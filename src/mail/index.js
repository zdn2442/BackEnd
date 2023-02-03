const nodemailer = require("nodemailer");
require("dotenv").config();
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const sendEmailHandle = async (email, subject, template, context) => {
  try {
    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./src/mail"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./src/mail"),
    };
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    transporter.use("compile", hbs(handlebarOptions));
    transporter.verify(function (error, success) {
      if (error) {
        console.log("Server transporter error ", error);
      } else {
        console.log("Server transporter connected, ready to send the mail");
      }
    });

    try {
      await transporter.sendMail({
        form: "no-reply@belajar-express.com",
        to: email,
        subject: subject,
        template: template,
        context: context,
      });
      return "success"
    } catch (error) {
      console.log(error);
      return "failed"
    }

  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports ={ sendEmailHandle};
