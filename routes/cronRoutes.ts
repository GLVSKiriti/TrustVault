import express from "express";
const router = express.Router();
const { statusCheck } = require("../controllers/cronCycles");

router.post("/statusCheck", statusCheck);

export default router;
