const cron = require("node-cron");
const { client } = require("../configs/database");
const mail = require("./mailSender");

exports.checkUser = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const result = await client.query(
        `SELECT email FROM users WHERE last_login_time <= CURRENT_TIMESTAMP - INTERVAL '7 days' AND last_login_time > CURRENT_TIMESTAMP - INTERVAL '14 days';`
      );
      const emails = result.rows;
      // console.log(emails);
      mail.sendMailToUser(emails);
    } catch (err) {
      console.log(err);
    }
  });
};

exports.checkUserP2 = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const result = await client.query(
        `SELECT email FROM users WHERE last_login_time <= CURRENT_TIMESTAMP - INTERVAL '14 days' AND last_login_time > CURRENT_TIMESTAMP - INTERVAL '19 DAYS';`
      );
      const emails = result.rows;
      mail.sendMailToUserP2(emails);
    } catch (err) {
      console.log(err);
    }
  });
};
