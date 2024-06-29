import express from "express";
const router = express.Router();
const { email, otpVerify, vaultData } = require("../controllers/nominee");

router.post("/email", email);
router.post("/otpVerify", otpVerify);
router.post("/vaultData", vaultData);

export default router;
