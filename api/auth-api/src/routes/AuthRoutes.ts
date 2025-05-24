import express, { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authMiddleware } from "../middleware/AuthMiddleware";

const authController = new AuthController();
const router: Router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/validate-token", authMiddleware, authController.validateToken);

export default router; 
