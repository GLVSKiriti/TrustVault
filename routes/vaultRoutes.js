const express = require("express");
const router = express.Router();
const {
  getAllVaults,
  addVault,
  displayVault,
  updateVault,
} = require("../controllers/vaults");

const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/getAllVaults", verifyToken, getAllVaults);
router.post("/addVault", verifyToken, addVault);
router.get("/displayVault/:vId", verifyToken, displayVault);
router.put("/updateVault/:vId", verifyToken, updateVault);

module.exports = router;
