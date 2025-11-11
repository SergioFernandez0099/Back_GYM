import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed completo...');

  // ---------------------------------------------------------
  // 1️⃣ Borrar datos existentes (en desarrollo)
  // ---------------------------------------------------------
  await prisma.trainingSession.deleteMany();
  await prisma.routine.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.muscleGroup.deleteMany();
  await prisma.user.deleteMany();

  // ---------------------------------------------------------
  // 2️⃣ Insertar grupos musculares
  // ---------------------------------------------------------
  const muscleGroupsData = [
    'Pecho','Espalda','Hombro','Bíceps','Tríceps',
    'Cuádriceps','Isquios','Glúteo','Gemelo','Adductor',
    'Abductor','Abdomen'
  ].map(name => ({ name }));

  const muscleGroups = await prisma.muscleGroup.createMany({
    data: muscleGroupsData
  });

  console.log(`✅ ${muscleGroupsData.length} grupos musculares creados`);

  // ---------------------------------------------------------
  // 3️⃣ Insertar ejercicios
  // ---------------------------------------------------------
  const exercisesData = [
    { name: 'Press banca', imageUrl: '/assets/images/exercises/pecho/press_banca.png', muscleGroupId: 1 },
    { name: 'Press inclinado', imageUrl: '/assets/images/exercises/pecho/press_inclinado.png', muscleGroupId: 1 },
    { name: 'Fondos en paralelas', imageUrl: '/assets/images/exercises/pecho/fondos_en_paralelas.png', muscleGroupId: 1 },
    { name: 'Curl con barra', imageUrl: '/assets/images/exercises/biceps/curl_barra.png', muscleGroupId: 4 },
    { name: 'Sentadilla', imageUrl: '/assets/images/exercises/cuadriceps/sentadilla.avif', muscleGroupId: 6 },
    { name: 'Press militar', imageUrl: '/assets/images/exercises/hombro/press_militar.avif', muscleGroupId: 3 },
    { name: 'Dominadas', imageUrl: '/assets/images/exercises/espalda/dominadas.avif', muscleGroupId: 2 },
  ];

  await prisma.exercise.createMany({ data: exercisesData });
  console.log(`✅ ${exercisesData.length} ejercicios creados`);

  // ---------------------------------------------------------
  // 4️⃣ Crear usuarios
  // ---------------------------------------------------------
  const saltRounds = 10;
  const usersData = [
    { name: 'Carlos', pin: await bcrypt.hash('1234', saltRounds) },
    { name: 'Lucía', pin: await bcrypt.hash('5678', saltRounds) },
    { name: 'Pedro', pin: await bcrypt.hash('abcd', saltRounds) },
  ];

  await prisma.user.createMany({ data: usersData });
  console.log(`✅ ${usersData.length} usuarios creados`);

  // ---------------------------------------------------------
  // 5️⃣ Crear rutinas y sesiones
  // ---------------------------------------------------------
  const userCarlos = await prisma.user.findFirst({ where: { name: 'Carlos' } });
  const userLucia = await prisma.user.findFirst({ where: { name: 'Lucía' } });
  const pressBanca = await prisma.exercise.findFirst({ where: { name: 'Press banca' } });
  const sentadilla = await prisma.exercise.findFirst({ where: { name: 'Sentadilla' } });

  // Rutina de Carlos
  const rutinaCarlos = await prisma.routine.create({
    data: {
      name: 'Full Body Pro',
      userId: userCarlos.id,
      sets: {
        create: [
          { series: 3, repetitions: 10, exerciseId: pressBanca.id },
          { series: 4, repetitions: 8, exerciseId: sentadilla.id },
        ]
      }
    },
  });

  console.log(`✅ Rutina creada para Carlos: ${rutinaCarlos.name}`);

  // Sesión de Carlos
  await prisma.trainingSession.create({
    data: {
      userId: userCarlos.id,
      routineName: rutinaCarlos.name,
      notes: 'Primera sesión completa',
    }
  });

  console.log('✅ Sesión creada para Carlos');

  console.log('🌱 Seed completado correctamente');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
