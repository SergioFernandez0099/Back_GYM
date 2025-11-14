import {ErrorIncorrectParam} from "../errors/businessErrors.js";
import bcrypt from "bcrypt";
import {configApp} from "../config/config.js";
import prisma from "../prisma/client.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            select: {id: true, name: true},
        });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const users = await prisma.user.findUniqueOrThrow({
            where: {id: Number(id)},
            select: {id: true, name: true},
        });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const {name, pin} = req.body;
        const hashedPin = await bcrypt.hash(pin, configApp.bcryptSaltRounds);
        const newUser = await prisma.user.create({
            data: {name: name, pin: hashedPin},
            select: {id: true, name: true},
        });
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const {name, pin} = req.body;

        if (!name && !pin) {
            throw new ErrorIncorrectParam(
                "Debes enviar al menos un campo para actualizar"
            );
        }

        const dataToUpdate = {
            ...(name !== undefined && {name}),
            ...(pin !== undefined && {
                pin: await bcrypt.hash(pin, configApp.bcryptSaltRounds),
            }),
        };

        const updatedUser = await prisma.user.update({
            where: {id},
            data: dataToUpdate,
            select: {id: true, name: true},
        });

        res.status(200).json({
            message: `Usuario con id ${updatedUser.id} actualizado correctamente`,
            user: updatedUser,
            pinUpdated: pin !== undefined,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const deletedUser = await prisma.user.delete({
            where: {id: id},
        });
        res.status(200).json({
            message: `Usuario con id ${deletedUser.id} borrado correctamente`,
        });
    } catch (error) {
        next(error);
    }
};

export const getUserRoutines = async (req, res, next) => {
    try {
        const userId = Number(req.params.id); // usamos :id de la URL

        const routines = await prisma.routine.findMany({
            where: {userId},
            select: {
                id: true,
                name: true,
            },
        });

        res.status(200).json(routines);
    } catch (error) {
        next(error);
    }
};

export const createUserRoutine = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const {name} = req.body;

        if (!name) {
            throw new ErrorIncorrectParam("El campo 'name' es obligatorio");
        }

        const newRoutine = await prisma.routine.create({
            data: {
                name,
                user: {connect: {id: userId}},
            },
            select: {id: true, name: true},
        });

        res.status(201).json(newRoutine);
    } catch (error) {
        next(error);
    }
};

export const updateUserRoutine = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const routineId = Number(req.params.routineId);
        const {name} = req.body;

        if (!name && !description) {
            throw new ErrorIncorrectParam(
                "Debes enviar al menos un campo para actualizar"
            );
        }

        // Primero verificamos que la rutina pertenece al usuario
        const existing = await prisma.routine.findFirstOrThrow({
            where: {id: routineId, userId},
        });

        const updatedRoutine = await prisma.routine.update({
            where: {id: existing.id},
            data: {
                ...(name && {name}),
            },
            select: {id: true, name: true},
        });

        res.status(200).json({
            message: `Rutina con id ${updatedRoutine.id} actualizada correctamente`,
            routine: updatedRoutine,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUserRoutine = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const routineId = Number(req.params.routineId);

        // Verificamos propiedad antes de borrar
        const routine = await prisma.routine.findFirstOrThrow({
            where: {id: routineId, userId},
        });

        await prisma.routine.delete({where: {id: routine.id}});

        res.status(200).json({
            message: `Rutina con id ${routine.id} eliminada correctamente`,
        });
    } catch (error) {
        next(error);
    }
};

export const getUserRoutineSets = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const routineId = Number(req.params.routineId);

        const sets = await prisma.routineSet.findMany({
            where: {
                routineId,
                routine: {
                    userId, // aseguramos que la rutina pertenece al usuario
                },
            },
            include: {
                exercise: true, // si quieres info del ejercicio (nombre, imagen, etc.)
            },
        });

        res.status(200).json(sets);
    } catch (error) {
        next(error);
    }
};

export const createUserRoutineSet = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const routineId = Number(req.params.routineId);
        const {exerciseId, series, repetitions, description} = req.body;

        if (!exerciseId || !series || !repetitions) {
            throw new ErrorIncorrectParam("Faltan parámetros obligatorios");
        }

        // Verificamos que la rutina pertenece al usuario
        const routine = await prisma.routine.findFirstOrThrow({
            where: {id: routineId, userId},
        });

        const newSet = await prisma.routineSet.create({
            data: {
                routineId: routine.id,
                exerciseId,
                series,
                repetitions,
                description,
            },
            include: {exercise: true},
        });

        res.status(201).json(newSet);
    } catch (error) {
        next(error);
    }
};

export const updateUserRoutineSet = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const routineId = Number(req.params.routineId);
        const setId = Number(req.params.setId);
        const {series, repetitions, description, exerciseId} = req.body;

        if (
            series === undefined &&
            repetitions === undefined &&
            description === undefined &&
            exerciseId === undefined
        ) {
            throw new ErrorIncorrectParam(
                "Debes enviar al menos un campo para actualizar"
            );
        }

        // Validamos que el set pertenece a una rutina del usuario
        const existing = await prisma.routineSet.findFirstOrThrow({
            where: {
                id: setId,
                routine: {
                    id: routineId,
                    userId,
                },
            },
        });

        const updatedSet = await prisma.routineSet.update({
            where: {id: existing.id},
            data: {
                ...(series !== undefined && {series}),
                ...(repetitions !== undefined && {repetitions}),
                ...(description !== undefined && {description}),
                ...(exerciseId !== undefined && {exerciseId}),
            },
            include: {exercise: true},
        });

        res.status(200).json({
            message: `Set con id ${updatedSet.id} actualizado correctamente`,
            set: updatedSet,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUserRoutineSet = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const routineId = Number(req.params.routineId);
        const setId = Number(req.params.setId);

        const existing = await prisma.routineSet.findFirstOrThrow({
            where: {
                id: setId,
                routine: {
                    id: routineId,
                    userId,
                },
            },
        });

        await prisma.routineSet.delete({where: {id: existing.id}});

        res.status(200).json({
            message: `Set con id ${existing.id} eliminado correctamente`,
        });
    } catch (error) {
        next(error);
    }
};

export const getUserTrainingSessions = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);

        const sessions = await prisma.trainingSession.findMany({
            where: {userId},
            select: {
                id: true,
                date: true,
                routineName: true,
                notes: true,
            }
        });

        res.status(200).json(sessions);
    } catch (error) {
        next(error);
    }
};

export const getUserTrainingSession = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const sessionId = Number(req.params.sessionId);

        const session = await prisma.trainingSession.findFirstOrThrow({
            where: {
                id: sessionId,
                userId: userId,
            },
            select: {
                id: true,
                date: true,
                routineName: true,
                notes: true,
                sessionExercises: {
                    select: {
                        id: true,
                        seriesNumber: true,
                        exercise: {
                            select: {
                                id: true,
                                name: true,
                                imageUrl: true,
                            }
                        },
                        series: {
                            select: {
                                id: true,
                                order: true,
                                reps: true,
                                weight: true,
                                intensity: true,
                                unit: {
                                    select: {
                                        id: true,
                                        name: true,
                                        symbol: true,
                                    }
                                },
                            },
                            orderBy: {
                                order: 'asc',
                            },
                        }
                    }
                }
            }
        });

        res.status(200).json(session);
    } catch (error) {
        next(error);
    }
};


export const createUserTrainingSession = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const {routineId, date} = req.body;

        const routine = await prisma.routine.findUnique({
            where: {
                id: routineId,
                userId: userId
            },
            include: {
                sets: {
                    include: {
                        exercise: true,
                    },
                },
                user: true,
            },
        });

        if (!routine) {
            throw new ErrorIncorrectParam("No se ha encontrado esa rutina");
        }

        const session = await prisma.trainingSession.create({
            data: {
                userId: userId,
                routineName: routine.name,
                date: date,
                notes: 'Sesión generada desde rutina',
                sessionExercises: {
                    create: routine.sets.map((set) => ({
                        exerciseId: set.exerciseId,
                        seriesNumber: set.series,
                        series: {
                            create: Array.from({ length: set.series }).map((_, i) => ({
                                order: i + 1, // solo orden
                                reps: 1
                            })),
                        },
                    })),
                },
            },
            include: {
                sessionExercises: {
                    include: { series: true },
                },
            },
        });
        console.log(session);

        res.status(201).json(session.id);
    } catch (error) {
        next(error);
    }
};

export const deleteUserTrainingSession = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const sessionId = Number(req.params.sessionId);

        const existing = await prisma.trainingSession.findFirstOrThrow({
            where: {id: sessionId, userId},
        });

        await prisma.trainingSession.delete({where: {id: existing.id}});

        res.status(200).json({
            message: `Sesión ${existing.id} eliminada correctamente`
        });
    } catch (error) {
        next(error);
    }
};

export const getTrainingSessionExercises = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const sessionId = Number(req.params.sessionId);

        const exercises = await prisma.trainingSessionExercise.findMany({
            where: {
                sessionId,
                session: {userId},
            },
            include: {
                exercise: true,
                repetitions: true,
            },
        });

        res.status(200).json(exercises);
    } catch (error) {
        next(error);
    }
};

export const createTrainingSessionExercise = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const sessionId = Number(req.params.sessionId);
        const {exerciseId, seriesNumber} = req.body;

        if (!exerciseId || !seriesNumber) {
            throw new ErrorIncorrectParam("Faltan parámetros obligatorios");
        }

        const session = await prisma.trainingSession.findFirstOrThrow({
            where: {id: sessionId, userId},
        });

        const newExercise = await prisma.trainingSessionExercise.create({
            data: {
                sessionId: session.id,
                exerciseId,
                seriesNumber,
            },
            include: {
                exercise: true,
            },
        });

        res.status(201).json(newExercise);
    } catch (error) {
        next(error);
    }
};

export const createRepetition = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const sessionId = Number(req.params.sessionId);
        const exerciseInSessionId = Number(req.params.exerciseInSessionId);
        const {weight, completed, notes} = req.body;

        const exerciseInSession = await prisma.trainingSessionExercise.findFirstOrThrow({
            where: {
                id: exerciseInSessionId,
                session: {id: sessionId, userId},
            },
        });

        const rep = await prisma.repetition.create({
            data: {
                trainingSessionExerciseId: exerciseInSession.id,
                weight: weight ?? null,
                completed,
                notes: notes ?? null,
            },
        });

        res.status(201).json(rep);
    } catch (error) {
        next(error);
    }
};


