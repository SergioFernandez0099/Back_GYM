import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando seed completo...');

    // 1️⃣ Borrar datos existentes
    await prisma.series.deleteMany();
    await prisma.trainingSessionExercise.deleteMany();
    await prisma.trainingSession.deleteMany();
    await prisma.unit.deleteMany();
    await prisma.routineSet.deleteMany();
    await prisma.routine.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.muscleGroup.deleteMany();
    await prisma.user.deleteMany();

    // 2️⃣ Crear grupos musculares
    const muscleGroupsData = [
        'Pecho','Espalda','Hombro','Bíceps','Tríceps',
        'Cuádriceps','Isquios','Glúteo','Gemelo','Adductor',
        'Abductor','Abdomen'
    ].map(name => ({ name }));

    await prisma.muscleGroup.createMany({ data: muscleGroupsData });
    console.log(`✅ ${muscleGroupsData.length} grupos musculares creados`);

    // 3️⃣ Crear ejercicios
    const exercisesData = [
        { name: 'Press banca', imageUrl: '/assets/images/exercises/pecho/press_banca.png', muscleGroupId: 1 },
        { name: 'Press inclinado', imageUrl: '/assets/images/exercises/pecho/press_inclinado.png', muscleGroupId: 1 },
        { name: 'Fondos en paralelas', imageUrl: '/assets/images/exercises/pecho/fondos_en_paralelas.png', muscleGroupId: 1 },
        { name: 'Peso muerto', imageUrl: '/assets/images/exercises/espalda/peso_muerto.png', muscleGroupId: 2 },
        { name: 'Dominadas', imageUrl: '/assets/images/exercises/espalda/dominadas.avif', muscleGroupId: 2 },
        { name: 'Press militar', imageUrl: '/assets/images/exercises/hombro/press_militar.avif', muscleGroupId: 3 },
        { name: 'Curl con barra', imageUrl: '/assets/images/exercises/biceps/curl_barra.png', muscleGroupId: 4 },
        { name: 'Sentadilla', imageUrl: '/assets/images/exercises/cuadriceps/sentadilla.avif', muscleGroupId: 6 },
        { name: 'Hip thrust', imageUrl: '/assets/images/exercises/gluteo/hip_thrust.png', muscleGroupId: 8 },
        { name: 'Crunch abdominal', imageUrl: '/assets/images/exercises/abdomen/crunch.png', muscleGroupId: 12 },
    ];

    await prisma.exercise.createMany({ data: exercisesData });
    console.log(`✅ ${exercisesData.length} ejercicios creados`);

    // 4️⃣ Crear unidades
    const unitsData = [
        { name: 'kg', symbol: 'kg' },
        { name: 'lb', symbol: 'lb' },
        { name: 'bodyweight', symbol: 'bw' },
    ];
    await prisma.unit.createMany({ data: unitsData });
    const kg = await prisma.unit.findUnique({ where: { name: 'kg' } });
    const bw = await prisma.unit.findUnique({ where: { name: 'bodyweight' } });

    // 5️⃣ Crear usuario
    const saltRounds = 10;
    const userCarlos = await prisma.user.create({
        data: {
            name: 'Carlos',
            pin: await bcrypt.hash('1234', saltRounds),
        },
    });

    // 6️⃣ Crear rutinas
    const fullBodyRoutine = await prisma.routine.create({
        data: {
            name: 'Full Body Pro',
            userId: userCarlos.id,
            sets: {
                create: [
                    { exerciseId: 1, series: 3, repetitions: 10 },
                    { exerciseId: 4, series: 3, repetitions: 8 },
                    { exerciseId: 7, series: 3, repetitions: 12 },
                    { exerciseId: 8, series: 4, repetitions: 15 },
                ],
            },
        },
        include: { sets: true },
    });

    const upperBodyRoutine = await prisma.routine.create({
        data: {
            name: 'Upper Body Blast',
            userId: userCarlos.id,
            sets: {
                create: [
                    { exerciseId: 1, series: 4, repetitions: 10 },
                    { exerciseId: 2, series: 3, repetitions: 12 },
                    { exerciseId: 5, series: 3, repetitions: 8 },
                    { exerciseId: 6, series: 3, repetitions: 10 },
                ],
            },
        },
        include: { sets: true },
    });

    console.log('✅ Rutinas creadas con sus sets');

    // 7️⃣ Crear sesión de entrenamiento con ejercicios y series
    const session = await prisma.trainingSession.create({
        data: {
            userId: userCarlos.id,
            routineName: 'Full Body Pro',
            notes: 'Primera sesión completa',
            sessionExercises: {
                create: [
                    {
                        exerciseId: 1, // Press banca
                        seriesNumber: 3,
                        order:1,
                        series: {
                            create: [
                                { order: 1, reps: 10, weight: 50, intensity: 7, unitId: kg?.id },
                                { order: 2, reps: 8, weight: 55, intensity: 8, unitId: kg?.id },
                            ],
                        },
                    },
                    {
                        exerciseId: 4, // Peso muerto
                        seriesNumber: 3,
                        order:2,
                        series: {
                            create: [
                                { order: 1, reps: 12, weight: null, intensity: 6, unitId: bw?.id },
                                { order: 2, reps: 10, weight: null, intensity: 7, unitId: bw?.id },
                            ],
                        },
                    },
                ],
            },
        },
        include: {
            sessionExercises: {
                include: { series: true },
            },
        },
    });

    console.log('🌱 Seed completado correctamente');
    console.log(JSON.stringify(session, null, 2));
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
