import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import database from "./configs/database";
import authRoutes from "./routes/authRoutes";
import vaultRoutes from "./routes/vaultRoutes";
import cronRoutes from "./routes/cronRoutes";
import nomineeRoutes from "./routes/nomineeRoutes";
import cronJob from "./cronJobs/checkUser";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://trustvault.vercel.app",
      /^https:\/\/trustvault\.vercel\.app$/,
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

const port = process.env.PORT || 4000;

database.client.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected To Database!");
});

database.client2.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected To Database2!!");
});

app.get("/", (req, res) => {
  res.status(200).send("Server is up and running!!");
});

app.use("/auth", authRoutes);
app.use("/vault", vaultRoutes);
app.use("/cron", cronRoutes);
app.use("/nominee", nomineeRoutes);

cronJob.checkUser();
cronJob.checkUserP2();
cronJob.checkUserNomineePhase();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
