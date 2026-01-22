import { Router } from "express";
import { getExercises } from "../controllers/exercises.controller.js";
import {authenticate, authenticateAndAuthorize} from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authenticate, getExercises);

export default router;
