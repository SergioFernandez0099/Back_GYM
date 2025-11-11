import { Router } from "express";
import { getExercises} from "../controllers/exercises.controller.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();
console.log("entrea");

router.get("/", authenticate, getExercises);

export default router;
