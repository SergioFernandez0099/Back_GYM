import prisma from "../prisma/client.js";

export const getMuscleGroups = async (req, res, next) => {
  try {
    const muscleGroups = await prisma.muscleGroup.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    res.status(200).json(muscleGroups);
  } catch (error) {
    next(error);
  }
};
