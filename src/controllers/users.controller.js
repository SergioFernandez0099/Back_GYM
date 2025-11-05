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
      throw new ErrorIncorrectParam("Debes enviar al menos un campo para actualizar");
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
