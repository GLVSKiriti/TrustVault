import express from "express";
const router = express.Router();

import authentication from "../controllers/authentication";

router.post("/signin", authentication.signin);
router.post("/signup", authentication.signup);

export default router;
