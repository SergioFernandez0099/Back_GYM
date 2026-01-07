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
        {name: 'Elevaciones frontales', imageUrl: '/assets/images/exercises/hombro/elevaciones_frontales.avif', muscleGroupId: 3},
        {name: 'Elevaciones laterales en polea', imageUrl: '/assets/images/exercises/hombro/elevaciones_laterales_polea.avif', muscleGroupId: 3},
        {name: 'Elevaciones laterales con mancuernas', imageUrl: '/assets/images/exercises/hombro/elevaciones_laterales_mancuernas.avif', muscleGroupId: 3},
        {name: 'Elevaciones laterales en máquina', imageUrl: '/assets/images/exercises/hombro/elevaciones_laterales_maquina.avif', muscleGroupId: 3},
        {name: 'Face pull', imageUrl: '/assets/images/exercises/hombro/face_pull.avif', muscleGroupId: 3},
        {name: 'Flexiones pica', imageUrl: '/assets/images/exercises/hombro/flexiones_pica.avif', muscleGroupId: 3},
        {name: 'Press militar levantado', imageUrl: '/assets/images/exercises/hombro/press_militar_levantado.avif', muscleGroupId: 3},
        {name: 'Press militar con mancuernas levantado', imageUrl: '/assets/images/exercises/hombro/press_militar_mancuernas_levantado.avif', muscleGroupId: 3},
        {name: 'Press militar con mancuernas sentado', imageUrl: '/assets/images/exercises/hombro/press_militar_mancuernas_sentado.avif', muscleGroupId: 3},
        {name: 'Press militar en máquina', imageUrl: '/assets/images/exercises/hombro/press_militar_maquina.avif', muscleGroupId: 3},
        {name: 'Press militar sentado', imageUrl: '/assets/images/exercises/hombro/press_militar_sentado.avif', muscleGroupId: 3},
        {name: 'Press pino', imageUrl: '/assets/images/exercises/hombro/press_pino.avif', muscleGroupId: 3},
        { name: 'Curl alterno', imageUrl: '/assets/images/exercises/biceps/curl_alterno.avif', muscleGroupId: 4 },
        { name: 'Curl con barra recta', imageUrl: '/assets/images/exercises/biceps/curl_barra_recta.avif', muscleGroupId: 4 },
        { name: 'Curl con barra Z', imageUrl: '/assets/images/exercises/biceps/curl_barra_z.avif', muscleGroupId: 4 },
        { name: 'Curl bayesian en polea', imageUrl: '/assets/images/exercises/biceps/curl_bayesian.avif', muscleGroupId: 4 },
        { name: 'Curl concentrado', imageUrl: '/assets/images/exercises/biceps/curl_concentrado.avif', muscleGroupId: 4 },
        { name: 'Curl inclinado', imageUrl: '/assets/images/exercises/biceps/curl_inclinado.avif', muscleGroupId: 4 },
        { name: 'Curl en máquina', imageUrl: '/assets/images/exercises/biceps/curl_maquina.avif', muscleGroupId: 4 },
        { name: 'Curl martillo', imageUrl: '/assets/images/exercises/biceps/curl_martillo.avif', muscleGroupId: 4 },
        { name: 'Curl en polea', imageUrl: '/assets/images/exercises/biceps/curl_polea.avif', muscleGroupId: 4 },
        { name: 'Curl predicador con barra', imageUrl: '/assets/images/exercises/biceps/curl_predicador_barra.avif', muscleGroupId: 4 },
        { name: 'Curl predicador con mancuerna', imageUrl: '/assets/images/exercises/biceps/curl_predicador_mancuerna.avif', muscleGroupId: 4 },
        { name: 'Extensión de tríceps con cuerda', imageUrl: '/assets/images/exercises/triceps/extension_triceps_cuerda.avif', muscleGroupId: 5 },
        { name: 'Press katana con mancuerna', imageUrl: '/assets/images/exercises/triceps/press_katana_mancuerna.avif', muscleGroupId: 5 },
        { name: 'Extensión de tríceps en polea', imageUrl: '/assets/images/exercises/triceps/extension_triceps_polea.avif', muscleGroupId: 5 },
        { name: 'Extensión de tríceps en polea baja', imageUrl: '/assets/images/exercises/triceps/extension_triceps_polea_baja.avif', muscleGroupId: 5 },
        { name: 'Flexiones de diamante', imageUrl: '/assets/images/exercises/triceps/flexiones_diamante.avif', muscleGroupId: 5 },
        { name: 'Press katana en polea', imageUrl: '/assets/images/exercises/triceps/press_katana_polea.avif', muscleGroupId: 5 },
        { name: 'Fondos de tríceps en banco', imageUrl: '/assets/images/exercises/triceps/fondos_triceps_banco.avif', muscleGroupId: 5 },
        { name: 'Fondos de tríceps en máquina', imageUrl: '/assets/images/exercises/triceps/fondos_triceps_maquina.avif', muscleGroupId: 5 },
        { name: 'Press francés', imageUrl: '/assets/images/exercises/triceps/press_frances.avif', muscleGroupId: 5 },
        { name: 'Press francés con mancuerna', imageUrl: '/assets/images/exercises/triceps/press_frances_mancuerna.avif', muscleGroupId: 5 },
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
        { name: 'Buenos días', imageUrl: '/assets/images/exercises/isquios/buenos_dias.avif', muscleGroupId: 7 },
        { name: 'Buenos días en multipower', imageUrl: '/assets/images/exercises/isquios/buenos_dias_multipower.avif', muscleGroupId: 7 },
        { name: 'Curl femoral levantado', imageUrl: '/assets/images/exercises/isquios/curl_femoral_levantado.avif', muscleGroupId: 7 },
        { name: 'Curl femoral sentado', imageUrl: '/assets/images/exercises/isquios/curl_femoral_sentado.avif', muscleGroupId: 7 },
        { name: 'Curl femoral tumbado', imageUrl: '/assets/images/exercises/isquios/curl_femoral_tumbado.avif', muscleGroupId: 7 },
        { name: 'Curl nórdico', imageUrl: '/assets/images/exercises/isquios/curl_nordico.avif', muscleGroupId: 7 },
        { name: 'Peso muerto convencional', imageUrl: '/assets/images/exercises/isquios/peso_muerto_convencional.avif', muscleGroupId: 7 },
        { name: 'Peso muerto piernas rígidas', imageUrl: '/assets/images/exercises/isquios/peso_muerto_piernas_rigidas.avif', muscleGroupId: 7 },
        { name: 'Peso muerto rumano', imageUrl: '/assets/images/exercises/isquios/peso_muerto_rumano.avif', muscleGroupId: 7 },
        { name: 'Peso muerto rumano con mancuernas', imageUrl: '/assets/images/exercises/isquios/peso_muerto_rumano_mancuernas.avif', muscleGroupId: 7 },
        { name: 'Peso muerto sumo', imageUrl: '/assets/images/exercises/isquios/peso_muerto_sumo.avif', muscleGroupId: 7 },
        { name: 'Empuje de cadera', imageUrl: '/assets/images/exercises/gluteo/empuje_cadera.avif', muscleGroupId: 8 },
        { name: 'Hip thrust', imageUrl: '/assets/images/exercises/gluteo/hip_thrust.avif', muscleGroupId: 8 },
        { name: 'Patada de glúteo', imageUrl: '/assets/images/exercises/gluteo/patada_gluteo.avif', muscleGroupId: 8 },
        { name: 'Puente de glúteos', imageUrl: '/assets/images/exercises/gluteo/puente_gluteos.avif', muscleGroupId: 8 },
        { name: 'Elevaciones de gemelos con barra', imageUrl: '/assets/images/exercises/gemelo/gemelo_levantado_barra.avif', muscleGroupId: 9 },
        { name: 'Elevaciones de gemelo con mancuernas', imageUrl: '/assets/images/exercises/gemelo/gemelo_levantado_mancuernas.avif', muscleGroupId: 9 },
        { name: 'Elevaciones de gemelo en máquina', imageUrl: '/assets/images/exercises/gemelo/gemelo_levantado_maquina.avif', muscleGroupId: 9 },
        { name: 'Elevaciones de gemelo sentado en máquina', imageUrl: '/assets/images/exercises/gemelo/gemelo_sentado_maquina.avif', muscleGroupId: 9 },
        { name: 'Adductor en máquina', imageUrl: '/assets/images/exercises/adductor/adductor_maquina.avif', muscleGroupId: 10 },
        { name: 'Adductor en polea', imageUrl: '/assets/images/exercises/adductor/adductor_polea.avif', muscleGroupId: 10 },
        { name: 'Abductor en máquina', imageUrl: '/assets/images/exercises/abductor/abductor_maquina.avif', muscleGroupId: 11 },
        { name: 'Abductor en polea', imageUrl: '/assets/images/exercises/abductor/abductor_polea.avif', muscleGroupId: 11 },
        { name: 'Abdomen en polea', imageUrl: '/assets/images/exercises/abdomen/abdomen_polea.avif', muscleGroupId: 12 },
        { name: 'Crunch abdominal', imageUrl: '/assets/images/exercises/abdomen/crunch_abominal.avif', muscleGroupId: 12 },
        { name: 'Elevación de piernas en barra', imageUrl: '/assets/images/exercises/abdomen/elevacion_piernas_barra.avif', muscleGroupId: 12 },
        { name: 'Elevación de piernas tumbado', imageUrl: '/assets/images/exercises/abdomen/elevacion_piernas_tumbado.avif', muscleGroupId: 12 },
        { name: 'Elevación de rodillas', imageUrl: '/assets/images/exercises/abdomen/elevacion_rodillas.avif', muscleGroupId: 12 },
        { name: 'Mountain climber', imageUrl: '/assets/images/exercises/abdomen/mountain_climber.avif', muscleGroupId: 12 },
        { name: 'Pies a la barra', imageUrl: '/assets/images/exercises/abdomen/pies_barra.avif', muscleGroupId: 12 },
        { name: 'Press Pallof', imageUrl: '/assets/images/exercises/abdomen/press_pallof.avif', muscleGroupId: 12 },
        { name: 'Rueda abdominal', imageUrl: '/assets/images/exercises/abdomen/rueda_abdominal.avif', muscleGroupId: 12 },

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
