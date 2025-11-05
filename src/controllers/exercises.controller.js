import prisma from "../prisma/client.js";

export const getExercises = async (req, res, next) => {
  try {
    const exercises = await prisma.exercise.findMany({
      select: { name: true, imageUrl: true },
    });
    res.status(200).json(exercises);
  } catch (error) {
    next(error);
  }
};