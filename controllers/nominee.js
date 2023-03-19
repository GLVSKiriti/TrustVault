const { client } = require("../configs/database");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { emailtemplate4 } = require("../assets/htmlvars");

exports.email = async (req, res) => {
  const { email } = req.body;
  //verify moblenumber exist in database or not

  //if exists then follow below code

  const otp = Math.floor(Math.random() * (99999 - 10000 + 1) + 100000);
  //   console.log(otp);
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "trustvault2023sem4@gmail.com",
      pass: "gsfgtopjgiyzuitp",
    },
  });

  let htmlcontent = emailtemplate4.replace("{{otp}}", otp);

  let details = {
    from: "trustvault2023sem4@gmail.com",
    to: email,
    subject: "OTP Verification",
    html: htmlcontent,
  };

  mailTransporter.sendMail(details, async (err) => {
    if (err) {
      console.log(err);
      console.log("There is an error");
    } else {
      console.log("Email has been sent");
      await client.query(
        `INSERT INTO otps (email,otp) VALUES ('${email}','${otp}');`
      );

      var o_id = await client.query(
        `SELECT MAX(o_id) FROM otps WHERE email = '${email}';`
      );

      o_id = o_id.rows[0].max;

      const token = jwt.sign(
        {
          o_id: o_id,
        },
        process.env.Secret_key
      );

      res.status(200).json({
        message: "OTP sent Sucessfully",
        token: token,
      });
    }
  });
};

exports.otpVerify = (req, res) => {
  const token = req.headers.authorization;
  const inp_otp = req.body.otp;

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        error: "Internal Server Occurred",
      });
    }

    const o_id = decoded.o_id;

    let otp = await client.query(
      `SELECT otp FROM otps WHERE o_id = '${o_id}';`
    );
    otp = otp.rows[0].otp;
    // console.log(otp);
    if (otp === inp_otp) {
      res.status(200).json({
        message: "Success",
      });
    } else {
      res.status(400).json({
        message: "Entered Incorrect OTP please enter again",
      });
    }
  });
};

exports.vaultData = (req, res) => {};
