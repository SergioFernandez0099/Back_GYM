import prisma from "../prisma/client.js";
import respuesta from "../utils/responses.js";

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

        respuesta.success(res, muscleGroups);
    } catch (error) {
        next(error);
    }
};
