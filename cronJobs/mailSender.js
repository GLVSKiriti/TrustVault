const { client } = require("../configs/database");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const { emailtemplate, emailtemplate2 } = require("../assets/htmlvars");

exports.sendMailToUser = (emails) => {
  //   console.log(emails[0].email);
  if (emails) {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "trustvault2023sem4@gmail.com",
        pass: "gsfgtopjgiyzuitp",
      },
    });

    emails.forEach((element) => {
      let details = {
        from: "trustvault2023sem4@gmail.com",
        to: element.email,
        subject: "Status Verification",
        html: emailtemplate,
      };

      mailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log(err);
          console.log("There is an error");
        } else {
          console.log("Email has been sent");
        }
      });
    });
  }
};

exports.sendMailToUserP2 = (emails) => {
  if (emails) {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "trustvault2023sem4@gmail.com",
        pass: "gsfgtopjgiyzuitp",
      },
    });
    emails.forEach((element) => {
      let details = {
        from: "trustvault2023sem4@gmail.com",
        to: element.email,
        subject: "Status Verification",
        html: emailtemplate2,
      };

      mailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log(err);
          console.log("There is an error");
        } else {
          console.log("Email has been sent");
        }
      });
    });
  }
};
