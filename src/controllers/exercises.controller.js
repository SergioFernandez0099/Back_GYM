import prisma from "../prisma/client.js";
import respuesta from "../utils/responses.js";

export const getExercises = async (req, res, next) => {
    try {
        //throw new ErrorIncorrectParam("hola");
        const exercises = await prisma.exercise.findMany({
            select: {
                id: true,
                name: true,
                imageUrl: true,
                muscleGroup: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: [
                {
                    muscleGroup: {
                        name: "asc",
                    },
                },
                {
                    name: "asc",
                },
            ],
        });

        respuesta.success(res, exercises);
    } catch (error) {
        next(error);
    }
};
