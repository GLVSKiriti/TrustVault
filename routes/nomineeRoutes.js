const express = require("express");
const router = express.Router();
const { email, otpVerify, vaultData } = require("../controllers/nominee");

router.post("/email", email);
router.post("/otpVerify/:v_id", otpVerify);
router.post("/vaultData/:v_id", vaultData);

module.exports = router;
