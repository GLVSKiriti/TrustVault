import express from "express";
const {
  getAllVaults,
  addVault,
  displayVault,
  updateVault,
  deleteVault,
} = require("../controllers/vaults");

import verifyToken from "../middlewares/authMiddleware";

const router = express.Router();
router.get("/getAllVaults", verifyToken, getAllVaults);
router.post("/addVault", verifyToken, addVault);
router.post("/displayVault", verifyToken, displayVault);
router.put("/updateVault/:vId", verifyToken, updateVault);
router.delete("/deleteVault/:vId", verifyToken, deleteVault);

export default router;
