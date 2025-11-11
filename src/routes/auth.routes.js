import { Router } from "express";
import {loginUser, logout, validateToken} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginUser);
router.post("/logout", logout)
router.get("/validate", validateToken);

export default router;