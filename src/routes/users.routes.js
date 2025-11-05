import { Router } from "express";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserRoutines,
  getUserRoutineSets,
  createUserRoutineSet,
  updateUserRoutineSet,
  deleteUserRoutineSet,
  createUserRoutine,
  updateUserRoutine,
  deleteUserRoutine,
} from "../controllers/users.controller.js";
import {
  validateCreateUser,
  validateUpdateUser,
} from "../middlewares/validators/userValidator.js";
import { validateBody } from "../middlewares/validators/bodyValidator.js";
import { validateId } from "../utils/validators.js";

const router = Router();

// USUARIOS
router.get("/:id", validateId, getUser);
router.get("/", getUsers);
router.post("/", validateBody, validateCreateUser, createUser);
router.put("/:id", validateId, validateBody, validateUpdateUser, updateUser);
router.delete("/:id", validateId, deleteUser);

// RUTINAS DEL USUARIO
router.get("/:id/routines", validateId, getUserRoutines);
router.post("/:id/routines", validateBody, createUserRoutine);
router.put(
  "/:id/routines/:routineId",
  validateId,
  validateBody,
  updateUserRoutine
);
router.delete("/:id/routines/:routineId", validateId, deleteUserRoutine);

// SETS DE RUTINAS DEL USUARIO
router.get("/:id/routines/:routineId/sets", validateId, getUserRoutineSets);
router.post(
  "/:id/routines/:routineId/sets",
  validateId,
  validateBody,
  createUserRoutineSet
);
router.put(
  "/:id/routines/:routineId/sets/:setId",
  validateId,
  validateBody,
  updateUserRoutineSet
);
router.delete(
  "/:id/routines/:routineId/sets/:setId",
  validateId,
  deleteUserRoutineSet
);

export default router;
