import { ErrorIncorrectParam } from "../errors/businessErrors.js";
import prisma from "../prisma/client.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true },
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await prisma.user.findUniqueOrThrow({
      where: { id: Number(id) },
      select: { id: true, name: true },
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { nombre, pin } = req.body;
    const newUser = await prisma.user.create({
      data: { nombre: nombre, pin: pin },
      select: { id: true, name: true },
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { nombre, pin } = req.body;
    if (!nombre && !pin) {
      throw new ErrorIncorrectParam(
        "Debes enviar al menos un campo para actualizar"
      );
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(nombre !== undefined && { nombre }),
        ...(pin !== undefined && { pin }),
      },
      select: { id: true, name: true },
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
      where: { id: id },
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
      where: { userId },
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
    const { name } = req.body;

    if (!name) {
      throw new ErrorIncorrectParam("El campo 'name' es obligatorio");
    }

    const newRoutine = await prisma.routine.create({
      data: {
        name,
        user: { connect: { id: userId } },
      },
      select: { id: true, name: true, },
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
    const { name } = req.body;

    if (!name && !description) {
      throw new ErrorIncorrectParam(
        "Debes enviar al menos un campo para actualizar"
      );
    }

    // Primero verificamos que la rutina pertenece al usuario
    const existing = await prisma.routine.findFirstOrThrow({
      where: { id: routineId, userId },
    });

    const updatedRoutine = await prisma.routine.update({
      where: { id: existing.id },
      data: {
        ...(name && { name }),
      },
      select: { id: true, name: true },
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
      where: { id: routineId, userId },
    });

    await prisma.routine.delete({ where: { id: routine.id } });

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
    const { exerciseId, series, repetitions, description } = req.body;

    if (!exerciseId || !series || !repetitions) {
      throw new ErrorIncorrectParam("Faltan parámetros obligatorios");
    }

    // Verificamos que la rutina pertenece al usuario
    const routine = await prisma.routine.findFirstOrThrow({
      where: { id: routineId, userId },
    });

    const newSet = await prisma.routineSet.create({
      data: {
        routineId: routine.id,
        exerciseId,
        series,
        repetitions,
        description,
      },
      include: { exercise: true },
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
    const { series, repetitions, description, exerciseId } = req.body;

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
      where: { id: existing.id },
      data: {
        ...(series !== undefined && { series }),
        ...(repetitions !== undefined && { repetitions }),
        ...(description !== undefined && { description }),
        ...(exerciseId !== undefined && { exerciseId }),
      },
      include: { exercise: true },
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

    await prisma.routineSet.delete({ where: { id: existing.id } });

    res.status(200).json({
      message: `Set con id ${existing.id} eliminado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};