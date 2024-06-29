import jwt from "jsonwebtoken";
import database from "../configs/database";

const verifyToken = (req: any, res: any, next: any) => {
  const token: string = req.headers.authorization;
  const secret = process.env.SECRET_KEY!;

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        error: "Server Error Occurred From Middleware",
      });
    }

    const userEmail: string = (decoded as jwt.JwtPayload).email;

    database.client
      .query(`SELECT * FROM users WHERE email = '${userEmail}';`)
      .then((data) => {
        const isValid = data.rows;

        if (isValid.length === 0) {
          res.status(400).json({ message: "Invalid Token" });
        } else {
          req.email = userEmail;
          req.uid = isValid[0].u_id;
          next();
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: "Database error occurred!!",
        });
      });
  });
};

export default verifyToken;
