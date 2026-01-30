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

        respuesta.success(res, `Usuario con id ${deletedUser.id} borrado correctamente`, 200);
    } catch (error) {
        next(error);
    }
};

export const getUserRoutines = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);

        const routines = await prisma.routine.findMany({
            where: {userId},
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: "asc",
            }
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

        if (!name) {
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

        respuesta.success(res, `Rutina con id ${routine.id} eliminada correctamente`, 200);
    } catch (error) {
        next(error);
    }
};

export const getUserRoutineSets = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const routineId = Number(req.params.routineId);

        if (!userId || !routineId) {
            throw new ErrorIncorrectParam("Faltan parámetros obligatorios");
        }

        const sets = await prisma.routineSet.findMany({
            where: {
                routineId,
                routine: {
                    userId,
                },
            },
            include: {
                exercise: true,
            },
            orderBy: {
                order: 'asc',
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

        const normalizedDescription =
            description && description.trim() !== "" ? description.trim() : null;

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
                    exerciseId: exerciseId,
                    series: series,
                    repetitions: repetitions,
                    description: normalizedDescription,
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
                ...(description !== undefined && {
                    description: description?.trim() || null
                }),
                ...(exerciseId !== undefined && {exerciseId}),
            },
            include: {exercise: true},
        });

        respuesta.success(res, updatedSet);
    } catch (error) {
        next(error);
    }
};

export const updateRoutineSetsOrder = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const routineId = Number(req.params.routineId);
        const {order} = req.body;

        if (!Array.isArray(order) || order.length === 0) {
            throw new ErrorIncorrectParam(
                "Debes enviar un array con el nuevo orden de los sets"
            );
        }

        const routine = await prisma.routine.findFirstOrThrow({
            where: {
                id: routineId,
                userId,
            },
            include: {
                sets: true,
            },
        });

        if (order.length !== routine.sets.length) {
            throw new ErrorIncorrectParam(
                "El número de sets no coincide con los de la rutina"
            );
        }

        const existingSetIds = routine.sets.map(rs => rs.id);

        const invalidIds = order.filter(
            id => !existingSetIds.includes(id)
        );

        if (invalidIds.length > 0) {
            throw new ErrorIncorrectParam(
                "El array contiene sets que no pertenecen a la rutina"
            );
        }

        await prisma.$transaction(async tx => {
            // 1️⃣ Asignar órdenes temporales (evita conflicto UNIQUE)
            for (let i = 0; i < order.length; i++) {
                await tx.routineSet.update({
                    where: {id: order[i]},
                    data: {order: 1000 + i},
                });
            }

            // 2️⃣ Asignar órdenes definitivos
            for (let i = 0; i < order.length; i++) {
                await tx.routineSet.update({
                    where: {id: order[i]},
                    data: {order: i + 1},
                });
            }
        });

        respuesta.success(res, {
            message: "Orden de ejercicios actualizado correctamente",
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
};

export const deleteUserRoutineSet = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const routineId = Number(req.params.routineId);
        const setId = Number(req.params.setId);

        // Validación de parámetros
        if (!userId || !routineId || !setId) {
            throw new ErrorIncorrectParam("Parámetros inválidos");
        }

        await prisma.$transaction(async (tx) => {
            // 1️⃣ Verificar ownership y obtener order
            const existing = await tx.routineSet.findFirst({
                where: {
                    id: setId,
                    routine: {
                        id: routineId,
                        userId,
                    },
                },
                select: {
                    id: true,
                    order: true,
                },
            });

            if (!existing) {
                const error = new Error('Set no encontrado o sin permisos');
                error.statusCode = 404;
                throw error;
            }

            const deletedOrder = existing.order;

            // 2️⃣ Borrar el set
            await tx.routineSet.delete({
                where: {id: existing.id}
            });

            // 3️⃣ Mover a zona segura NEGATIVA (evita violación de constraint única)
            await tx.routineSet.updateMany({
                where: {
                    routineId,
                    order: {gt: deletedOrder},
                },
                data: {
                    order: {decrement: 10000},
                },
            });

            // 4️⃣ Compactar correctamente (decrementar 1 neto)
            await tx.routineSet.updateMany({
                where: {
                    routineId,
                    order: {lt: 0}, // Los que están en zona negativa
                },
                data: {
                    order: {increment: 9999}, // -10000 + 9999 = -1 neto
                },
            });
        }, {
            maxWait: 5000,
            timeout: 10000,
            isolationLevel: 'Serializable'
        });

        respuesta.success(res, 'Set eliminado correctamente', 200);
    } catch (error) {
        console.error('Error eliminando set:', error);
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
            where: {id: sessionId, userId},
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
                        targetreps: true,
                        exercise: {select: {id: true, name: true, imageUrl: true}},
                        series: {
                            select: {
                                id: true, order: true, reps: true, weight: true, rir: true, intensity: true,
                                unit: {select: {id: true, name: true, symbol: true}}
                            },
                            orderBy: {order: 'asc'}
                        },
                    },
                    orderBy: {order: 'asc'},
                },
            },
        });

        // Obtener todos los IDs de ejercicios de la sesión
        const exerciseIds = session.sessionExercises.map(se => se.exercise.id);

        // Traer todas las sesiones anteriores de estos ejercicios en un solo query
        const historyRaw = await prisma.trainingSession.findMany({
            where: {
                userId,
                id: {not: session.id},
                sessionExercises: {some: {exerciseId: {in: exerciseIds}}},
            },
            select: {
                id: true,
                date: true,
                sessionExercises: {
                    where: {exerciseId: {in: exerciseIds}},
                    select: {
                        exerciseId: true,
                        description: true,
                        series: {
                            select: {
                                order: true, reps: true, weight: true, rir: true, intensity: true,
                                unit: {select: {id: true, name: true, symbol: true}}
                            },
                            orderBy: {order: 'asc'}
                        },
                    },
                },
            },
            orderBy: {date: 'desc'},
        });

        console.log()

        // Mapear el historial a cada ejercicio
        const sessionWithHistory = {
            ...session,
            sessionExercises: session.sessionExercises.map(se => ({
                ...se,
                history: historyRaw
                    .map(h => {
                        const match = h.sessionExercises.find(e => e.exerciseId === se.exercise.id);
                        if (!match) return null;
                        return {
                            sessionDate: h.date,
                            description: match.description,
                            series: match.series
                        };
                    })
                    .filter(Boolean)
                    .slice(0, 5), // últimas 5 sesiones
            })),
        };

        respuesta.success(res, sessionWithHistory);
    } catch (error) {
        console.log(error);
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
                        description: set.description ?? null,
                        targetreps: set.repetitions,
                        series: {
                            create: Array.from({length: set.series}).map((_, i) => ({
                                order: i + 1,
                                reps: 0,
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

        respuesta.success(res, `Sesión ${existing.id} eliminada correctamente`, 200);
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

        const newExercise = await prisma.$transaction(async (tx) => {
            const existingExercisesCount = await tx.trainingSessionExercise.count({
                where: {sessionId: session.id},
            });

            return tx.trainingSessionExercise.create({
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
        });

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

        // 2. Usar transacción para calcular order y crear
        const newSerie = await prisma.$transaction(async (tx) => {
            const lastSerie = await tx.series.findFirst({
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

            return tx.series.create({
                data: {
                    sessionExerciseId: sessionExercise.id,
                    order: nextOrder,
                    reps: 0,
                    unitId: 1, //Kg
                },
                include: {
                    unit: true, // incluir la unidad para el frontend
                },
            });
        });

        respuesta.success(res, {
            id: newSerie.id,
            reps: newSerie.reps,
            weight: newSerie.weight,
            intensity: newSerie.intensity,
            rir: newSerie.rir,
            order: newSerie.order,
            unit: newSerie.unit ? {id: newSerie.unit.id, symbol: newSerie.unit.symbol} : null
        }, 201);

    } catch (error) {
        next(error);
    }
};

export const deleteTrainingSessionExercise = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);
        const sessionId = Number(req.params.sessionId);
        const exerciseInSessionId = Number(req.params.exerciseInSessionId);

        if (!userId || !sessionId || !exerciseInSessionId) {
            return res.status(400).json({
                error: 'Parámetros inválidos'
            });
        }

        await prisma.$transaction(async (tx) => {
            // 1️⃣ Verificar ownership y obtener order
            const exercise = await tx.trainingSessionExercise.findFirst({
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

            if (!exercise) {
                const error = new Error('Ejercicio no encontrado o sin permisos');
                error.statusCode = 404;
                throw error;
            }

            const deletedOrder = exercise.order;

            // 2️⃣ Borrar el ejercicio
            await tx.trainingSessionExercise.delete({
                where: {id: exercise.id},
            });

            // 3️⃣ Mover a zona segura NEGATIVA (evita colisiones)
            await tx.trainingSessionExercise.updateMany({
                where: {
                    sessionId,
                    order: {gt: deletedOrder},
                },
                data: {
                    order: {decrement: 10000},
                },
            });

            // 4️⃣ Volver a posición correcta (decrementando 1 neto)
            await tx.trainingSessionExercise.updateMany({
                where: {
                    sessionId,
                    order: {lt: 0}, // Los que están en zona negativa
                },
                data: {
                    order: {increment: 9999}, // -10000 + 9999 = -1 neto
                },
            });
        }, {
            maxWait: 5000,
            timeout: 10000,
            isolationLevel: 'Serializable'
        });

        respuesta.success(res, 'Ejercicio eliminado correctamente');
    } catch (error) {
        console.error('Error eliminando ejercicio:', error);
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

        const normalizedDescription =
            description !== undefined
                ? description.trim() === "" ? null : description.trim()
                : undefined;

        // Validar que al menos uno de los dos campos está presente
        if ((!Array.isArray(series) || series.length === 0) && normalizedDescription === undefined) {
            throw new ErrorIncorrectParam("Debe proporcionar series o descripción para actualizar");
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
        if (normalizedDescription !== undefined) {
            operations.push(
                prisma.trainingSessionExercise.update({
                    where: {id: exerciseInSessionId},
                    data: {description: normalizedDescription},
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

        respuesta.success(res, `Serie eliminada correctamente`);
    } catch (error) {
        next(error);
    }
};

export const updateTrainingSessionExerciseOrder = async (req, res, next) => {
    const sessionId = Number(req.params.sessionId);
    const orderedExerciseIds = req.body;

    if (!Array.isArray(orderedExerciseIds)) {
        throw new ErrorIncorrectParam("orderedExerciseIds debe ser un array");
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

export async function getTrainingStats(req, res, next) {
    try {
        const userId = Number(req.params.id);
        const month = Number(req.query.month);
        const year = Number(req.query.year);

        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 1);

        // Contar sesiones del mes
        const monthlySessions = await prisma.trainingSession.count({
            where: {
                userId,
                date: {
                    gte: startOfMonth,
                    lt: endOfMonth,
                },
            },
        });

        // Todas las sesiones del usuario
        const sessions = await prisma.trainingSession.findMany({
            where: {userId},
            select: {date: true},
        });

        const uniqueDays = new Set(
            sessions.map(s => s.date.toISOString().split("T")[0])
        );

        // Obtener nombre del usuario
        const user = await prisma.user.findUnique({
            where: {id: userId},
            select: {name: true},
        });

        const stats = {
            username: user.name,
            monthlySessions,
            totalTrainingDays: uniqueDays.size,
        }

        respuesta.success(res, stats);
    } catch (error) {
        next(error);
    }
}