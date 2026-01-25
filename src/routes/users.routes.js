import {Router} from "express";
import {
    createTrainingSessionExercise,
    createTrainingSessionSerie,
    createUserRoutine,
    createUserRoutineSet,
    createUserTrainingSession,
    deleteTrainingSessionExercise,
    deleteTrainingSessionSerie,
    deleteUserRoutine,
    deleteUserRoutineSet,
    deleteUserTrainingSession,
    getTrainingSessionExercises,
    getTrainingStats,
    getUserRoutines,
    getUserRoutineSets,
    getUserTrainingSession,
    getUserTrainingSessions,
    updateRoutineSetsOrder,
    updateTrainingSession,
    updateTrainingSessionExerciseOrder,
    updateUserRoutine,
    updateUserRoutineSet,
} from "../controllers/users.controller.js";
import {validateBody} from "../middlewares/validators/bodyValidator.js";
import {validateId} from "../utils/validators.js";
import {authenticateAndAuthorize} from "../middlewares/authMiddleware.js";

const router = Router();

// USUARIOS
// router.get("/:id", authenticate, validateId, getUser);
// router.get("/", authenticate, getUsers);
// router.post("/", authenticate, validateBody, validateCreateUser, createUser);
// router.patch(
//     "/:id",
//     authenticate,
//     validateId,
//     validateBody,
//     validateUpdateUser,
//     updateUser
// );
// router.delete("/:id", authenticate, validateId, deleteUser);

// RUTINAS DEL USUARIO
router.get("/:id/routines", authenticateAndAuthorize, validateId, getUserRoutines);
router.post("/:id/routines", authenticateAndAuthorize, validateBody, createUserRoutine);
router.patch(
    "/:id/routines/:routineId",
    validateId,
    validateBody,
    updateUserRoutine
);
router.delete(
    "/:id/routines/:routineId",
    authenticateAndAuthorize,
    validateId,
    deleteUserRoutine
);

// SETS DE RUTINAS DEL USUARIO
router.get(
    "/:id/routines/:routineId/sets",
    authenticateAndAuthorize,
    validateId,
    getUserRoutineSets
);
router.post(
    "/:id/routines/:routineId/sets",
    authenticateAndAuthorize,
    validateId,
    validateBody,
    createUserRoutineSet
);
router.put(
    "/:id/routines/:routineId/sets/order",
    authenticateAndAuthorize,
    validateId,
    validateBody,
    updateRoutineSetsOrder
);
router.patch(
    "/:id/routines/:routineId/sets/:setId",
    authenticateAndAuthorize,
    validateId,
    validateBody,
    updateUserRoutineSet
);
router.delete(
    "/:id/routines/:routineId/sets/:setId",
    authenticateAndAuthorize,
    validateId,
    deleteUserRoutineSet
);

// SESIONES DE ENTRENAMIENTO
router.get("/:id/sessions", authenticateAndAuthorize, validateId, getUserTrainingSessions);
router.get("/:id/sessions/:sessionId", authenticateAndAuthorize, validateId, getUserTrainingSession);
router.post("/:id/sessions", authenticateAndAuthorize, validateId, validateBody, createUserTrainingSession);
router.delete("/:id/sessions/:sessionId", authenticateAndAuthorize, validateId, deleteUserTrainingSession);

// EJERCICIOS DE UNA SESIÓN
router.get("/:id/sessions/:sessionId/exercises", authenticateAndAuthorize, validateId, getTrainingSessionExercises);
router.post("/:id/sessions/:sessionId/exercises", authenticateAndAuthorize, validateId, validateBody, createTrainingSessionExercise);
router.delete("/:id/sessions/:sessionId/exercises/:exerciseInSessionId", authenticateAndAuthorize, validateId, deleteTrainingSessionExercise);

// SERIES DE UN EJERCICIO EN SESIÓN
router.post("/:id/sessions/:sessionId/exercises/:exerciseInSessionId/series",
    authenticateAndAuthorize,
    validateId,
    createTrainingSessionSerie
);

router.delete("/:id/sessions/:sessionId/exercises/:exerciseInSessionId/series/:serieId",
    authenticateAndAuthorize,
    validateId,
    deleteTrainingSessionSerie
);
router.patch(
    "/:id/sessions/:sessionId/exercises/order",
    authenticateAndAuthorize,
    validateId,
    validateBody,
    updateTrainingSessionExerciseOrder
);

// ESTE ES PARA MODIFICAR LA DESCRIPCIÓN Y LAS SERIES
router.patch(
    "/:id/sessions/:sessionId/exercises/:exerciseInSessionId",
    authenticateAndAuthorize,
    validateId,
    validateBody,
    updateTrainingSession
);

// ESTADÍSTICAS
router.get("/:id/stats/training", authenticateAndAuthorize, validateId, getTrainingStats);

export default router;
