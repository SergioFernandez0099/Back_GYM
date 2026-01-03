import {ErrorIncorrectParam} from "../errors/businessErrors.js";
import bcrypt from "bcrypt";
import {configApp} from "../config/config.js";
import prisma from "../prisma/client.js";
import respuesta from "../utils/responses.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            select: {id: true, name: true},
        });
        respuesta.success(res, users);
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
        respuesta.success(res, users);
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
        respuesta.success(res, newUser, 201);
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

        respuesta.success(res, updatedUser);

        // res.status(200).json({
        //     message: `Usuario con id ${updatedUser.id} actualizado correctamente`,
        //     user: updatedUser,
        //     pinUpdated: pin !== undefined,
        // });
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
        // res.status(200).json({
        //     message: `Usuario con id ${deletedUser.id} borrado correctamente`,
        // });
        respuesta.success(res, `Usuario con id ${deletedUser.id} borrado correctamente`);
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

        respuesta.success(res, routines);
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

        respuesta.success(res, newRoutine, 201);
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

        respuesta.success(res, updatedRoutine);

        // res.status(200).json({
        //     message: `Rutina con id ${updatedRoutine.id} actualizada correctamente`,
        //     routine: updatedRoutine,
        // });
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

        respuesta.success(res, `Rutina con id ${routine.id} eliminada correctamente`);
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

        respuesta.success(res, sets);
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

        const routine = await prisma.routine.findFirstOrThrow({
            where: {id: routineId, userId},
        });

        const newSet = await prisma.$transaction(async (tx) => {

            const lastSet = await tx.routineSet.findFirst({
                where: {routineId: routine.id},
                orderBy: {order: 'desc'},
                select: {order: true},
            });

            const newOrder = lastSet ? lastSet.order + 1 : 1;

            return tx.routineSet.create({
                data: {
                    routineId: routine.id,
                    exerciseId,
                    series,
                    repetitions,
                    description,
                    order: newOrder,
                },
                include: {exercise: true},
            });
        });

        respuesta.success(res, newSet, 201);
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

        // res.status(200).json({
        //     message: `Set con id ${updatedSet.id} actualizado correctamente`,
        //     set: updatedSet,
        // });
        respuesta.success(res, updatedSet);
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

        // res.status(200).json({
        //     message: `Set con id ${existing.id} eliminado correctamente`,
        // });
        respuesta.success(res, `Set con id ${existing.id} eliminado correctamente`);
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
                description: true,
            }
        });

        respuesta.success(res, sessions);
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
                description: true,
                sessionExercises: {
                    select: {
                        id: true,
                        order: true,
                        description: true,
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
                                rir: true,
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
                    },
                    orderBy: {
                        order: 'asc',
                    },
                }
            }
        });

        respuesta.success(res, session);
    } catch (error) {
        next(error);
    }
};


export const createUserTrainingSession = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const {routineId} = req.body;
        let {date} = req.body;
        date = new Date(date);

        if (isNaN(date.getTime())) {
            throw new ErrorIncorrectParam("Fecha inválida");
        }

        // Creamos el rango del día completo
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Verificar si ya existe una sesión en ese día para el usuario
        const existingSession = await prisma.trainingSession.findFirst({
            where: {
                userId,
                date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });

        if (existingSession) {
            throw new ErrorIncorrectParam("Ya existe una sesión creada en esa fecha");
        }

        let sessionData = {
            userId: userId,
            date: date,
        };

        if (routineId !== -1) {
            // Buscamos la rutina solo si no es -1
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

            // Añadimos los ejercicios al objeto sessionData
            sessionData = {
                ...sessionData,
                routineName: routine.name,
                sessionExercises: {
                    create: routine.sets.map((set) => ({
                        exerciseId: set.exerciseId,
                        order: set.order,
                        description: set.description,
                        series: {
                            create: Array.from({length: set.series}).map((_, i) => ({
                                order: i + 1,
                                reps: 1,
                                unitId: 1,
                            })),
                        },
                    })),
                },
            };
        } else {
            // Si routineId === -1, podemos poner un nombre genérico
            sessionData.routineName = 'Sesión sin rutina';
        }

        const session = await prisma.trainingSession.create({
            data: sessionData,
            include: {
                sessionExercises: {
                    include: {series: true},
                },
            },
        });

        // res.status(201).json({ok: true, id: session.id});
        respuesta.success(res, {id: session.id});
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
            ok: true,
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
        respuesta.success(res, exercises);
    } catch (error) {
        next(error);
    }
};

export const createTrainingSessionExercise = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const sessionId = Number(req.params.sessionId);
        const {exerciseId} = req.body;

        if (!exerciseId) {
            throw new ErrorIncorrectParam("Faltan parámetros obligatorios");
        }

        const DEFAULT_SERIES = 3;

        const session = await prisma.trainingSession.findFirstOrThrow({
            where: {id: sessionId, userId},
        });

        const existingExercisesCount = await prisma.trainingSessionExercise.count({
            where: {sessionId: session.id},
        });

        const newExercise = await prisma.trainingSessionExercise.create({
            data: {
                sessionId: session.id,
                exerciseId,
                order: existingExercisesCount + 1,
                series: {
                    create: Array.from({length: DEFAULT_SERIES}).map((_, i) => ({
                        order: i + 1,
                        reps: 0,
                        weight: null,
                        intensity: null,
                        rir: null,
                        unitId: 1, //Kg
                    })),
                },
            },
            include: {
                exercise: true,
                series: true,
            },
        });

        // res.status(201).json({ok: true, id: newExercise.id});
        respuesta.success(res, {id: newExercise.id}, 201);
    } catch (error) {
        next(error);
    }
};

export const createTrainingSessionSerie = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const sessionId = Number(req.params.sessionId);
        const exerciseInSessionId = Number(req.params.exerciseInSessionId);

        // 1. Validar que el ejercicio pertenece a la sesión y al usuario
        const sessionExercise = await prisma.trainingSessionExercise.findFirstOrThrow({
            where: {
                id: exerciseInSessionId,
                session: {
                    id: sessionId,
                    userId,
                },
            },
            select: {
                id: true,
            },
        });

        // 2. Obtener el último order de las series
        const lastSerie = await prisma.series.findFirst({
            where: {
                sessionExerciseId: sessionExercise.id,
            },
            orderBy: {
                order: "desc",
            },
            select: {
                order: true,
            },
        });

        const nextOrder = lastSerie ? lastSerie.order + 1 : 1;

        // 3. Crear la serie
        const newSerie = await prisma.series.create({
            data: {
                sessionExerciseId: sessionExercise.id,
                order: nextOrder,
                reps: 0,
                unitId: 1, //Kg
            },
        });

        // res.status(201).json({
        //     ok: true,
        //     body: newSerie.id,
        // });
        respuesta.success(res, {id: newSerie.id}, 201);

    } catch (error) {
        next(error);
    }
};

export const deleteTrainingSessionExercise = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const sessionId = Number(req.params.sessionId);
        const exerciseInSessionId = Number(req.params.exerciseInSessionId);

        // 1. Obtener el ejercicio y validar propiedad
        const exercise = await prisma.trainingSessionExercise.findFirstOrThrow({
            where: {
                id: exerciseInSessionId,
                session: {
                    id: sessionId,
                    userId,
                },
            },
            select: {
                id: true,
                order: true,
            },
        });

        const deletedOrder = exercise.order;

        // 2. Borrar el ejercicio (series en cascade)
        await prisma.trainingSessionExercise.delete({
            where: {id: exercise.id},
        });

        // 3. Compactar el order (solo los posteriores)
        await prisma.trainingSessionExercise.updateMany({
            where: {
                sessionId,
                order: {
                    gt: deletedOrder,
                },
            },
            data: {
                order: {
                    decrement: 1,
                },
            },
        });

        // res.status(200).json({
        //     ok: true,
        //     body: `Ejercicio eliminado correctamente`,
        // });
        respuesta.success(res, `Ejercicio eliminado correctamente`);
    } catch (error) {
        next(error);
    }
};

// esta función sirve para actualizar la descripción y las series
export const updateTrainingSession = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const sessionId = Number(req.params.sessionId);
        const exerciseInSessionId = Number(req.params.exerciseInSessionId);

        const {series, description} = req.body;

        // Validar que al menos uno de los dos campos está presente
        if ((!Array.isArray(series) || series.length === 0) && !description) {
            return res.status(400).json({
                ok: false,
                message: "Debe proporcionar series o descripción para actualizar",
            });
        }

        // 1. Validar que el ejercicio pertenece al usuario
        await prisma.trainingSessionExercise.findFirstOrThrow({
            where: {
                id: exerciseInSessionId,
                session: {
                    id: sessionId,
                    userId,
                },
            },
            select: {id: true},
        });

        // 2. Preparar las operaciones de la transacción
        const operations = [];

        // Si hay descripción, actualizar el TrainingSessionExercise
        if (description !== undefined) {
            operations.push(
                prisma.trainingSessionExercise.update({
                    where: {id: exerciseInSessionId},
                    data: {description: description},
                })
            );
        }

        // Si hay series, agregarlas a las operaciones
        if (Array.isArray(series) && series.length > 0) {
            series.forEach((serie) => {
                const data = {};

                if ("reps" in serie) data.reps = serie.reps;
                if ("weight" in serie) data.weight = serie.weight;
                if ("intensity" in serie) data.intensity = serie.intensity;
                if ("rir" in serie) data.rir = serie.rir;
                if ("unitId" in serie) data.unitId = serie.unitId;

                if (Object.keys(data).length > 0) {
                    operations.push(
                        prisma.series.update({
                            where: {
                                id: serie.id,
                                sessionExerciseId: exerciseInSessionId,
                            },
                            data,
                        })
                    );
                }
            });
        }

        // 3. Ejecutar todas las operaciones en una transacción
        if (operations.length > 0) {
            await prisma.$transaction(operations);
        }

        respuesta.success(res, `Actualización completada correctamente`);
    } catch (error) {
        next(error);
    }
};
export const deleteTrainingSessionSerie = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const sessionId = Number(req.params.sessionId);
        const exerciseInSessionId = Number(req.params.exerciseInSessionId);
        const serieId = Number(req.params.serieId);

        // 1. Obtener la serie y validar propiedad
        const serie = await prisma.series.findFirstOrThrow({
            where: {
                id: serieId,
                sessionExercise: {
                    id: exerciseInSessionId,
                    session: {
                        id: sessionId,
                        userId,
                    },
                },
            },
            select: {
                id: true,
                order: true,
                sessionExerciseId: true,
            },
        });

        const deletedOrder = serie.order;

        // 2. Borrar la serie
        await prisma.series.delete({
            where: {id: serie.id},
        });

        // 3. Compactar el order de las series posteriores
        await prisma.series.updateMany({
            where: {
                sessionExerciseId: serie.sessionExerciseId,
                order: {
                    gt: deletedOrder,
                },
            },
            data: {
                order: {
                    decrement: 1,
                },
            },
        });

        // res.status(200).json({
        //     ok: true,
        //     body: "Serie eliminada correctamente",
        // });
        respuesta.success(res, `Serie eliminada correctamente`);
    } catch (error) {
        next(error);
    }
};

export const updateTrainingSessionExerciseOrder = async (req, res, next) => {
    const sessionId = Number(req.params.sessionId);
    const orderedExerciseIds = req.body;

    if (!Array.isArray(orderedExerciseIds)) {
        return res.status(400).json({
            error: "orderedExerciseIds debe ser un array"
        });
    }

    try {
        await prisma.$transaction(async (tx) => {

            // 1️⃣ Desplazar todos los orders a una zona segura (1000+)
            await tx.trainingSessionExercise.updateMany({
                where: {sessionId},
                data: {
                    order: {increment: 1000}
                }
            });

            // 2️⃣ Aplicar el orden definitivo
            for (let i = 0; i < orderedExerciseIds.length; i++) {
                await tx.trainingSessionExercise.update({
                    where: {
                        id: orderedExerciseIds[i],
                        sessionId
                    },
                    data: {
                        order: i + 1
                    }
                });
            }
        });

        // res.status(200).send({ok: true});
        respuesta.success(res, `Orden actualizado correctamente`);

    } catch (error) {
        console.error(error);
        next(error);
    }
};

