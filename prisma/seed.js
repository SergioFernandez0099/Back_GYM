import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de usuarios, rutinas y sesiones...');

  // ---------------------------------------------------------
  // 1️⃣ Crear usuarios
  // ---------------------------------------------------------
  const users = await prisma.user.createMany({
    data: [
      { name: 'Carlos', passwordHash: 'hashed_carlos' },
      { name: 'Lucía', passwordHash: 'hashed_lucia' },
      { name: 'Pedro', passwordHash: 'hashed_pedro' },
    ],
  });

  console.log(`✅ ${users.count} usuarios creados`);

  // ---------------------------------------------------------
  // 2️⃣ Obtener algunos ejercicios ya existentes
  // ---------------------------------------------------------
  const pressBanca = await prisma.exercise.findFirst({ where: { name: 'Press banca' } });
  const dominadas = await prisma.exercise.findFirst({ where: { name: 'Dominadas' } });
  const sentadilla = await prisma.exercise.findFirst({ where: { name: 'Sentadilla' } });
  const curlBiceps = await prisma.exercise.findFirst({ where: { name: 'Curl con barra' } });
  const pressMilitar = await prisma.exercise.findFirst({ where: { name: 'Press militar' } });

  if (!pressBanca || !dominadas || !sentadilla) {
    console.log('❌ Faltan ejercicios base en la DB. Asegúrate de haber hecho el seed de ejercicios antes.');
    return;
  }

  // ---------------------------------------------------------
  // 3️⃣ Crear rutinas para cada usuario
  // ---------------------------------------------------------
  const userCarlos = await prisma.user.findFirst({ where: { name: 'Carlos' } });
  const userLucia = await prisma.user.findFirst({ where: { name: 'Lucía' } });

  // Rutina de Carlos (Full Body)
  const rutinaCarlos = await prisma.routine.create({
    data: {
      name: 'Full Body Pro',
      description: 'Rutina general de cuerpo completo para fuerza y resistencia.',
      userId: userCarlos.id,
      sets: {
        create: [
          { series: 3, repetitions: 10, exerciseId: pressBanca.id },
          { series: 4, repetitions: 8, exerciseId: sentadilla.id },
          { series: 3, repetitions: 8, exerciseId: dominadas.id },
        ],
      },
    },
    include: { sets: true },
  });

  // Rutina de Lucía (Push)
  const rutinaLucia = await prisma.routine.create({
    data: {
      name: 'Push Day',
      description: 'Rutina enfocada en pecho, hombros y tríceps.',
      userId: userLucia.id,
      sets: {
        create: [
          { series: 3, repetitions: 12, exerciseId: pressBanca.id },
          { series: 3, repetitions: 10, exerciseId: pressMilitar ? pressMilitar.id : pressBanca.id },
        ],
      },
    },
    include: { sets: true },
  });

  console.log(`✅ Rutinas creadas: ${rutinaCarlos.name}, ${rutinaLucia.name}`);

  // ---------------------------------------------------------
  // 4️⃣ Crear sesiones de entrenamiento (basadas en las rutinas)
  // ---------------------------------------------------------
  const sessionCarlos = await prisma.trainingSession.create({
    data: {
      userId: userCarlos.id,
      routineName: rutinaCarlos.name,
      notes: 'Entrenamiento intenso, buenas sensaciones.',
      sessionExercises: {
        create: [
          {
            exerciseId: pressBanca.id,
            seriesNumber: 1,
            repetitions: {
              create: [
                { weight: 60, completed: true },
                { weight: 60, completed: true },
                { weight: 60, completed: false, notes: 'falló la última' },
              ],
            },
          },
          {
            exerciseId: sentadilla.id,
            seriesNumber: 1,
            repetitions: {
              create: [
                { weight: 80, completed: true },
                { weight: 80, completed: true },
                { weight: 80, completed: true },
              ],
            },
          },
        ],
      },
    },
    include: { sessionExercises: { include: { repetitions: true } } },
  });

  const sessionLucia = await prisma.trainingSession.create({
    data: {
      userId: userLucia.id,
      routineName: rutinaLucia.name,
      notes: 'Buen progreso en los hombros.',
      sessionExercises: {
        create: [
          {
            exerciseId: pressMilitar ? pressMilitar.id : pressBanca.id,
            seriesNumber: 1,
            repetitions: {
              create: [
                { weight: 25, completed: true },
                { weight: 25, completed: true },
                { weight: 25, completed: true },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`✅ Sesiones creadas para ${userCarlos.name} y ${userLucia.name}`);

  // ---------------------------------------------------------
  // 5️⃣ Crear sesión vacía para Pedro
  // ---------------------------------------------------------
  const userPedro = await prisma.user.findFirst({ where: { name: 'Pedro' } });
  await prisma.trainingSession.create({
    data: {
      userId: userPedro.id,
      routineName: 'Sin rutina asignada',
      notes: 'Primera sesión aún sin ejercicios.',
    },
  });

  console.log('✅ Sesión vacía creada para Pedro');
  console.log('🌱 Seed completado correctamente.');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
