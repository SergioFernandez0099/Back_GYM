import { Router } from "express";
import { getMuscleGroups } from "../controllers/muscleGroups.controller.js";
import {authenticate, authenticateAndAuthorize} from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authenticate, getMuscleGroups);

export default router;
