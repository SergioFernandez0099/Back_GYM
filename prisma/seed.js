// prisma/seed.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // borrar datos previos
  await prisma.repetition.deleteMany();
  await prisma.trainingSessionExercise.deleteMany();
  await prisma.trainingSession.deleteMany();
  await prisma.routineSet.deleteMany();
  await prisma.routine.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.user.deleteMany();

  // Crear usuarios
  const laura = await prisma.user.create({
    data: { name: "Laura", passwordHash: "12" },
  });
  const pedro = await prisma.user.create({
    data: { name: "Pedro", passwordHash: "34" },
  });

  // Crear ejercicios
  const pressBanca = await prisma.exercise.create({
    data: { name: "Press Banca", imageUrl: "/images/press-banca.jpg" },
  });
  const pressMilitar = await prisma.exercise.create({
    data: { name: "Press Militar", imageUrl: "/images/press-militar.jpg" },
  });
  const sentadilla = await prisma.exercise.create({
    data: { name: "Sentadilla", imageUrl: "/images/sentadilla.jpg" },
  });
  const prensa = await prisma.exercise.create({
    data: { name: "Prensa", imageUrl: "/images/prensa.jpg" },
  });

  // Crear rutinas
  const torso1 = await prisma.routine.create({
    data: {
      name: "Torso 1",
      description: "Rutina de empuje/tirón",
      userId: laura.id,
    },
  });
  const pierna1 = await prisma.routine.create({
    data: {
      name: "Pierna 1",
      description: "Rutina de piernas",
      userId: laura.id,
    },
  });

  // Añadir sets
  await prisma.routineSet.createMany({
    data: [
      {
        routineId: torso1.id,
        exerciseId: pressBanca.id,
        series: 3,
        repetitions: 8,
        description: "Press con barra",
      },
      {
        routineId: torso1.id,
        exerciseId: pressMilitar.id,
        series: 3,
        repetitions: 8,
        description: "Press militar",
      },
      {
        routineId: pierna1.id,
        exerciseId: sentadilla.id,
        series: 4,
        repetitions: 6,
        description: "Sentadilla trasera",
      },
      {
        routineId: pierna1.id,
        exerciseId: prensa.id,
        series: 3,
        repetitions: 12,
        description: "Prensa 45º",
      },
    ],
  });

  // Sesión
  const session = await prisma.trainingSession.create({
    data: {
      userId: laura.id,
      routineName: "Torso 1",
      date: new Date("2025-10-06T10:00:00.000Z"),
      notes: "Sesión de fuerza",
    },
  });

  const tse1 = await prisma.trainingSessionExercise.create({
    data: { exerciseId: pressBanca.id, seriesNumber: 1, sessionId: session.id },
  });
  const tse2 = await prisma.trainingSessionExercise.create({
    data: {
      exerciseId: pressMilitar.id,
      seriesNumber: 1,
      sessionId: session.id,
    },
  });

  // Repeticiones individuales
  await prisma.repetition.createMany({
    data: [
      { trainingSessionExerciseId: tse1.id, weight: 89, completed: true },
      { trainingSessionExerciseId: tse1.id, weight: 89, completed: true },
      {
        trainingSessionExerciseId: tse1.id,
        weight: 85,
        completed: false,
        notes: "Última muy dura",
      },
      { trainingSessionExerciseId: tse2.id, weight: 40, completed: true },
      { trainingSessionExerciseId: tse2.id, weight: 40, completed: true },
      { trainingSessionExerciseId: tse2.id, weight: 40, completed: true },
    ],
  });

  console.log("Seed completado ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
