import { Router } from "express";
import { getMuscleGroups } from "../controllers/muscleGroups.controller.js";

const router = Router();

router.get("/", getMuscleGroups);

export default router;