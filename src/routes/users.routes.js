import {Router} from "express";
import {
    createRepetition,
    createTrainingSessionExercise,
    createUser,
    createUserRoutine,
    createUserRoutineSet, createUserTrainingSession,
    deleteUser,
    deleteUserRoutine,
    deleteUserRoutineSet, deleteUserTrainingSession, getTrainingSessionExercises,
    getUser,
    getUserRoutines,
    getUserRoutineSets,
    getUsers, getUserTrainingSession, getUserTrainingSessions,
    updateUser,
    updateUserRoutine,
    updateUserRoutineSet,
} from "../controllers/users.controller.js";
import {validateCreateUser, validateUpdateUser,} from "../middlewares/validators/userValidator.js";
import {validateBody} from "../middlewares/validators/bodyValidator.js";
import {validateId} from "../utils/validators.js";
import {authenticate} from "../middlewares/authMiddleware.js";

const router = Router();

// USUARIOS
router.get("/:id", authenticate, validateId, getUser);
router.get("/", authenticate, getUsers);
router.post("/", authenticate, validateBody, validateCreateUser, createUser);
router.put(
    "/:id",
    authenticate,
    validateId,
    validateBody,
    validateUpdateUser,
    updateUser
);
router.delete("/:id", authenticate, validateId, deleteUser);

// RUTINAS DEL USUARIO
router.get("/:id/routines", authenticate, validateId, getUserRoutines);
router.post("/:id/routines", authenticate, validateBody, createUserRoutine);
router.put(
    "/:id/routines/:routineId",
    validateId,
    validateBody,
    updateUserRoutine
);
router.delete(
    "/:id/routines/:routineId",
    authenticate,
    validateId,
    deleteUserRoutine
);

// SETS DE RUTINAS DEL USUARIO
router.get(
    "/:id/routines/:routineId/sets",
    authenticate,
    validateId,
    getUserRoutineSets
);
router.post(
    "/:id/routines/:routineId/sets",
    authenticate,
    validateId,
    validateBody,
    createUserRoutineSet
);
router.put(
    "/:id/routines/:routineId/sets/:setId",
    authenticate,
    validateId,
    validateBody,
    updateUserRoutineSet
);
router.delete(
    "/:id/routines/:routineId/sets/:setId",
    authenticate,
    validateId,
    deleteUserRoutineSet
);

// SESIONES DE ENTRENAMIENTO
router.get("/:id/sessions", authenticate, validateId, getUserTrainingSessions);
router.get("/:id/sessions/:sessionId", authenticate, validateId, getUserTrainingSession);
router.post("/:id/sessions", authenticate, validateId, validateBody, createUserTrainingSession);
router.delete("/:id/sessions/:sessionId", authenticate, validateId, deleteUserTrainingSession);

// EJERCICIOS DE UNA SESIÓN
router.get("/:id/sessions/:sessionId/exercises", authenticate, validateId, getTrainingSessionExercises);
router.post("/:id/sessions/:sessionId/exercises", authenticate, validateId, validateBody, createTrainingSessionExercise);

// REPETICIONES DE UN EJERCICIO EN SESIÓN
router.post("/:id/sessions/:sessionId/exercises/:exerciseInSessionId/repetitions",
    authenticate,
    validateId,
    validateBody,
    createRepetition
);

export default router;
