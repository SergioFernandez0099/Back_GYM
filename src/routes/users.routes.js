import {Router} from "express";
import {
    createTrainingSessionExercise,
    createTrainingSessionSerie,
    createUser,
    createUserRoutine,
    createUserRoutineSet,
    createUserTrainingSession,
    deleteTrainingSessionExercise,
    deleteTrainingSessionSerie,
    deleteUser,
    deleteUserRoutine,
    deleteUserRoutineSet,
    deleteUserTrainingSession,
    getTrainingSessionExercises,
    getTrainingStats,
    getUser,
    getUserRoutines,
    getUserRoutineSets,
    getUsers,
    getUserTrainingSession,
    getUserTrainingSessions,
    updateTrainingSession,
    updateTrainingSessionExerciseOrder,
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
router.patch(
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
router.patch(
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
router.patch(
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
router.delete("/:id/sessions/:sessionId/exercises/:exerciseInSessionId", authenticate, validateId, deleteTrainingSessionExercise);

// SERIES DE UN EJERCICIO EN SESIÓN
router.post("/:id/sessions/:sessionId/exercises/:exerciseInSessionId/series",
    authenticate,
    validateId,
    createTrainingSessionSerie
);

router.delete("/:id/sessions/:sessionId/exercises/:exerciseInSessionId/series/:serieId",
    authenticate,
    validateId,
    deleteTrainingSessionSerie
);
router.patch(
    "/:id/sessions/:sessionId/exercises/order",
    authenticate,
    validateId,
    validateBody,
    updateTrainingSessionExerciseOrder
);

// ESTE ES PARA MODIFICAR LA DESCRIPCIÓN Y LAS SERIES
router.patch(
    "/:id/sessions/:sessionId/exercises/:exerciseInSessionId",
    authenticate,
    validateId,
    validateBody,
    updateTrainingSession
);

// ESTADÍSTICAS
router.get("/:id/stats/training", authenticate, validateId, getTrainingStats);

export default router;
