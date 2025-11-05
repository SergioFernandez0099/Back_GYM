import { Router } from "express";
import { getUser, getUsers, createUser, updateUser, deleteUser, getUserRoutines, getUserRoutineSets } from "../controllers/users.controller.js";
import { validateCreateUser, validateUpdateUser } from "../middlewares/validators/userValidator.js";
import { validateBody } from "../middlewares/validators/bodyValidator.js";
import { validateId } from "../utils/validators.js";

const router = Router();
router.get("/:id/routines/:routineId", validateId, getUserRoutineSets);
router.get("/:id/routines", validateId, getUserRoutines);
router.get("/:id", validateId, getUser);
router.get("/", getUsers);
router.post("/", validateBody, validateCreateUser, createUser);
router.put("/:id", validateId, validateBody, validateUpdateUser, updateUser);
router.delete("/:id", validateId, deleteUser);

export default router;
