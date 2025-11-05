import { Router } from "express";
import { getExercises} from "../controllers/exercises.controller.js";

const router = Router();
console.log("entrea");

router.get("/", getExercises);

export default router;
