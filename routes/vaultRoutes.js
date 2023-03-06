const express = require("express");
const router = express.Router();
const {
  getAllVaults,
  addVault,
  displayVault,
} = require("../controllers/vaults");

const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/getAllVaults", verifyToken, getAllVaults);
router.post("/addVault", verifyToken, addVault);
router.get("/displayVault/:vId", verifyToken, displayVault);

module.exports = router;
