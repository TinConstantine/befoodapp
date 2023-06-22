import express from "express";
import { accountController } from "../controllers/index.js";
const router = express.Router();
router.post("/login", accountController.login);
router.post("/register", accountController.register);
export default router;
