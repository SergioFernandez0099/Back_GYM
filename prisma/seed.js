import {PrismaClient} from '@prisma/client';
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
        'Pecho', 'Espalda', 'Hombro', 'Bíceps', 'Tríceps',
        'Cuádriceps', 'Isquios', 'Glúteo', 'Gemelo', 'Adductor',
        'Abductor', 'Abdomen'
    ].map(name => ({name}));

    await prisma.muscleGroup.createMany({data: muscleGroupsData});
    console.log(`✅ ${muscleGroupsData.length} grupos musculares creados`);

    // 3️⃣ Crear ejercicios
    const exercisesData = [
        {
            name: 'Press banca',
            imageUrl: '/assets/images/exercises/pecho/press_banca.avif',
            muscleGroupId: 1
        },
        {
            name: 'Press inclinado',
            imageUrl: '/assets/images/exercises/pecho/press_inclinado.avif',
            muscleGroupId: 1
        },
        {
            name: 'Press declinado',
            imageUrl: '/assets/images/exercises/pecho/press_declinado.avif',
            muscleGroupId: 1
        },
        {
            name: 'Press inclinado con mancuernas',
            imageUrl: '/assets/images/exercises/pecho/press_inclinado_mancuernas.avif',
            muscleGroupId: 1
        },
        {
            name: 'Press con mancuernas',
            imageUrl: '/assets/images/exercises/pecho/press_mancuernas.avif',
            muscleGroupId: 1
        },
        {
            name: 'Fondos en paralelas',
            imageUrl: '/assets/images/exercises/pecho/fondos.avif',
            muscleGroupId: 1
        },
        {
            name: 'Aperturas con mancuernas',
            imageUrl: '/assets/images/exercises/pecho/aperturas_mancuernas.avif',
            muscleGroupId: 1
        },
        {
            name: 'Aperturas en máquina',
            imageUrl: '/assets/images/exercises/pecho/aperturas_maquina.avif',
            muscleGroupId: 1
        },
        {
            name: 'Flexiones',
            imageUrl: '/assets/images/exercises/pecho/flexion.avif',
            muscleGroupId: 1
        },
        {
            name: 'Flexiones declinadas',
            imageUrl: '/assets/images/exercises/pecho/flexion_declinada.avif',
            muscleGroupId: 1
        },
        {
            name: 'Cruce de poleas',
            imageUrl: '/assets/images/exercises/pecho/cruze_poleas.avif',
            muscleGroupId: 1
        },
        {
            name: 'Press en multipower',
            imageUrl: '/assets/images/exercises/pecho/press_multipower.avif',
            muscleGroupId: 1
        },
        {
            name: 'Press en máquina',
            imageUrl: '/assets/images/exercises/pecho/press_maquina.avif',
            muscleGroupId: 1
        },
        {name: 'Dominadas', imageUrl: '/assets/images/exercises/espalda/dominadas.avif', muscleGroupId: 2},
        {
            name: 'Dominadas agarre neutro',
            imageUrl: '/assets/images/exercises/espalda/dominadas_neutro.avif',
            muscleGroupId: 2
        },
        {
            name: 'Dominadas agarre supino',
            imageUrl: '/assets/images/exercises/espalda/dominadas_supino.avif',
            muscleGroupId: 2
        },
        {name: 'Encogimientos', imageUrl: '/assets/images/exercises/espalda/encogimientos.avif', muscleGroupId: 2},
        {
            name: 'Hiperextensiones espalda',
            imageUrl: '/assets/images/exercises/espalda/hiperextensiones_espalda.avif',
            muscleGroupId: 2
        },
        {name: 'Jalón al pecho', imageUrl: '/assets/images/exercises/espalda/jalon.avif', muscleGroupId: 2},
        {name: 'Pullover', imageUrl: '/assets/images/exercises/espalda/pullover.avif', muscleGroupId: 2},
        {name: 'Remo en banco', imageUrl: '/assets/images/exercises/espalda/remo_banco.avif', muscleGroupId: 2},
        {name: 'Remo gironda', imageUrl: '/assets/images/exercises/espalda/remo_gironda.avif', muscleGroupId: 2},
        {name: 'Remo libre', imageUrl: '/assets/images/exercises/espalda/remo_libre.avif', muscleGroupId: 2},
        {name: 'Remo en máquina', imageUrl: '/assets/images/exercises/espalda/remo_maquina.avif', muscleGroupId: 2},
        {name: 'Remo alto en máquina', imageUrl: '/assets/images/exercises/espalda/remo_alto.avif', muscleGroupId: 2},
        {name: 'Remo pendlay', imageUrl: '/assets/images/exercises/espalda/remo_pendlay.avif', muscleGroupId: 2},
        {name: 'Seal row', imageUrl: '/assets/images/exercises/espalda/remo_seal.avif', muscleGroupId: 2},
        {name: 'Remo en T', imageUrl: '/assets/images/exercises/espalda/remo_t.avif', muscleGroupId: 2},
        {name: 'Press militar', imageUrl: '/assets/images/exercises/hombro/press_militar.avif', muscleGroupId: 3},
        {name: 'Curl con barra', imageUrl: '/assets/images/exercises/biceps/curl_barra.png', muscleGroupId: 4},
        {name: 'Extensión de cuádriceps', imageUrl: '/assets/images/exercises/cuadriceps/extensiones.avif', muscleGroupId: 6},
        {name: 'Hack squat', imageUrl: '/assets/images/exercises/cuadriceps/hack_squat.avif', muscleGroupId: 6},
        {name: 'Pistol squat', imageUrl: '/assets/images/exercises/cuadriceps/pistol_squat.avif', muscleGroupId: 6},
        {name: 'Prensa', imageUrl: '/assets/images/exercises/cuadriceps/prensa.avif', muscleGroupId: 6},
        {name: 'Prensa horizontal', imageUrl: '/assets/images/exercises/cuadriceps/prensa_horizontal.avif', muscleGroupId: 6},
        {name: 'Prensa vertical', imageUrl: '/assets/images/exercises/cuadriceps/prensa_vertical.avif', muscleGroupId: 6},
        {name: 'Sentadilla', imageUrl: '/assets/images/exercises/cuadriceps/sentadilla.avif', muscleGroupId: 6},
        {name: 'Sentadilla belt', imageUrl: '/assets/images/exercises/cuadriceps/sentadilla_belt.avif', muscleGroupId: 6},
        {name: 'Sentadilla búlgara', imageUrl: '/assets/images/exercises/cuadriceps/sentadilla_bulgara.avif', muscleGroupId: 6},
        {name: 'Sentadilla frontal', imageUrl: '/assets/images/exercises/cuadriceps/sentadilla_frontal.avif', muscleGroupId: 6},
        {name: 'Sentadilla goblet', imageUrl: '/assets/images/exercises/cuadriceps/sentadilla_goblet.avif', muscleGroupId: 6},
        {name: 'Sentadilla en multipower', imageUrl: '/assets/images/exercises/cuadriceps/sentadilla_multipower.avif', muscleGroupId: 6},
        {name: 'Sentadilla con safety bar', imageUrl: '/assets/images/exercises/cuadriceps/sentadilla_safety_bar.avif', muscleGroupId: 6},
        {name: 'Sentadilla sissy', imageUrl: '/assets/images/exercises/cuadriceps/sentadilla_sissy.avif', muscleGroupId: 6},
        {name: 'Zancadas', imageUrl: '/assets/images/exercises/cuadriceps/zancadas.avif', muscleGroupId: 6},
        {name: 'Hip thrust', imageUrl: '/assets/images/exercises/gluteo/hip_thrust.png', muscleGroupId: 8},
        {name: 'Crunch abdominal', imageUrl: '/assets/images/exercises/abdomen/crunch.png', muscleGroupId: 12},
    ];

    await prisma.exercise.createMany({data: exercisesData});
    console.log(`✅ ${exercisesData.length} ejercicios creados`);

    // 4️⃣ Crear unidades
    const unitsData = [
        {name: 'kg', symbol: 'kg'},
        {name: 'lb', symbol: 'lb'},
        {name: 'bodyweight', symbol: 'bw'},
    ];
    await prisma.unit.createMany({data: unitsData});
    const kg = await prisma.unit.findUnique({where: {name: 'kg'}});
    const bw = await prisma.unit.findUnique({where: {name: 'bodyweight'}});

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
                    {exerciseId: 1, series: 3, repetitions: 10, order: 1},
                    {exerciseId: 4, series: 3, repetitions: 8, order: 2},
                    {exerciseId: 7, series: 3, repetitions: 12, order: 3},
                    {exerciseId: 8, series: 4, repetitions: 15, order: 4},
                ],
            },
        },
        include: {sets: true},
    });

    const upperBodyRoutine = await prisma.routine.create({
        data: {
            name: 'Upper Body Blast',
            userId: userCarlos.id,
            sets: {
                create: [
                    {exerciseId: 1, series: 4, repetitions: 10, order: 1},
                    {exerciseId: 2, series: 3, repetitions: 12, order: 2},
                    {exerciseId: 5, series: 3, repetitions: 8, order: 3},
                    {exerciseId: 6, series: 3, repetitions: 10, order: 4},
                ],
            },
        },
        include: {sets: true},
    });

    console.log('✅ Rutinas creadas con sus sets');

    // 7️⃣ Crear sesión de entrenamiento con ejercicios y series
    const session = await prisma.trainingSession.create({
        data: {
            userId: userCarlos.id,
            routineName: 'Full Body Pro',
            description: 'Primera sesión completa',
            sessionExercises: {
                create: [
                    {
                        exerciseId: 1, // Press banca
                        order: 1,
                        series: {
                            create: [
                                {order: 1, reps: 10, weight: 50, intensity: 7, unitId: kg?.id},
                                {order: 2, reps: 8, weight: 55, intensity: 8, unitId: kg?.id},
                            ],
                        },
                    },
                    {
                        exerciseId: 4, // Peso muerto
                        order: 2,
                        series: {
                            create: [
                                {order: 1, reps: 12, weight: null, intensity: 6, unitId: bw?.id},
                                {order: 2, reps: 10, weight: null, intensity: 7, unitId: bw?.id},
                            ],
                        },
                    },
                ],
            },
        },
        include: {
            sessionExercises: {
                include: {series: true},
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
