import {PrismaClient} from '../src/generated/prisma/client.js';
import {PrismaPg} from '@prisma/adapter-pg'
import "dotenv/config"
import {Pool} from 'pg';

import bcrypt from 'bcrypt';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter: adapter
});

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
            imageUrl: '/images/exercises/pecho/press_banca.avif',
            muscleGroupId: 1
        },
        {
            name: 'Press inclinado',
            imageUrl: '/images/exercises/pecho/press_inclinado.avif',
            muscleGroupId: 1
        },
        {
            name: 'Press declinado',
            imageUrl: '/images/exercises/pecho/press_declinado.avif',
            muscleGroupId: 1
        },
        {
            name: 'Press inclinado con mancuernas',
            imageUrl: '/images/exercises/pecho/press_inclinado_mancuernas.avif',
            muscleGroupId: 1
        },
        {
            name: 'Press con mancuernas',
            imageUrl: '/images/exercises/pecho/press_mancuernas.avif',
            muscleGroupId: 1
        },
        {
            name: 'Fondos en paralelas',
            imageUrl: '/images/exercises/pecho/fondos.avif',
            muscleGroupId: 1
        },
        {
            name: 'Aperturas con mancuernas',
            imageUrl: '/images/exercises/pecho/aperturas_mancuernas.avif',
            muscleGroupId: 1
        },
        {
            name: 'Aperturas en máquina',
            imageUrl: '/images/exercises/pecho/aperturas_maquina.avif',
            muscleGroupId: 1
        },
        {
            name: 'Flexiones',
            imageUrl: '/images/exercises/pecho/flexion.avif',
            muscleGroupId: 1
        },
        {
            name: 'Flexiones declinadas',
            imageUrl: '/images/exercises/pecho/flexion_declinada.avif',
            muscleGroupId: 1
        },
        {
            name: 'Cruce de poleas',
            imageUrl: '/images/exercises/pecho/cruze_poleas.avif',
            muscleGroupId: 1
        },
        {
            name: 'Press en multipower',
            imageUrl: '/images/exercises/pecho/press_multipower.avif',
            muscleGroupId: 1
        },
        {
            name: 'Press en máquina',
            imageUrl: '/images/exercises/pecho/press_maquina.avif',
            muscleGroupId: 1
        },
        {name: 'Dominadas', imageUrl: '/images/exercises/espalda/dominadas.avif', muscleGroupId: 2},
        {
            name: 'Dominadas agarre neutro',
            imageUrl: '/images/exercises/espalda/dominadas_neutro.avif',
            muscleGroupId: 2
        },
        {
            name: 'Dominadas agarre supino',
            imageUrl: '/images/exercises/espalda/dominadas_supino.avif',
            muscleGroupId: 2
        },
        {name: 'Encogimientos', imageUrl: '/images/exercises/espalda/encogimientos.avif', muscleGroupId: 2},
        {
            name: 'Hiperextensiones espalda',
            imageUrl: '/images/exercises/espalda/hiperextensiones_espalda.avif',
            muscleGroupId: 2
        },
        {name: 'Jalón al pecho', imageUrl: '/images/exercises/espalda/jalon.avif', muscleGroupId: 2},
        {name: 'Pullover', imageUrl: '/images/exercises/espalda/pullover.avif', muscleGroupId: 2},
        {name: 'Remo en banco', imageUrl: '/images/exercises/espalda/remo_banco.avif', muscleGroupId: 2},
        {name: 'Remo gironda', imageUrl: '/images/exercises/espalda/remo_gironda.avif', muscleGroupId: 2},
        {name: 'Remo libre', imageUrl: '/images/exercises/espalda/remo_libre.avif', muscleGroupId: 2},
        {name: 'Remo en máquina', imageUrl: '/images/exercises/espalda/remo_maquina.avif', muscleGroupId: 2},
        {name: 'Remo alto en máquina', imageUrl: '/images/exercises/espalda/remo_alto.avif', muscleGroupId: 2},
        {name: 'Remo pendlay', imageUrl: '/images/exercises/espalda/remo_pendlay.avif', muscleGroupId: 2},
        {name: 'Seal row', imageUrl: '/images/exercises/espalda/remo_seal.avif', muscleGroupId: 2},
        {name: 'Remo en T', imageUrl: '/images/exercises/espalda/remo_t.avif', muscleGroupId: 2},
        {
            name: 'Elevaciones frontales',
            imageUrl: '/images/exercises/hombro/elevaciones_frontales.avif',
            muscleGroupId: 3
        },
        {
            name: 'Elevaciones laterales en polea',
            imageUrl: '/images/exercises/hombro/elevaciones_laterales_polea.avif',
            muscleGroupId: 3
        },
        {
            name: 'Elevaciones laterales con mancuernas',
            imageUrl: '/images/exercises/hombro/elevaciones_laterales_mancuernas.avif',
            muscleGroupId: 3
        },
        {
            name: 'Elevaciones laterales en máquina',
            imageUrl: '/images/exercises/hombro/elevaciones_laterales_maquina.avif',
            muscleGroupId: 3
        },
        {name: 'Face pull', imageUrl: '/images/exercises/hombro/face_pull.avif', muscleGroupId: 3},
        {name: 'Flexiones pica', imageUrl: '/images/exercises/hombro/flexiones_pica.avif', muscleGroupId: 3},
        {
            name: 'Press militar levantado',
            imageUrl: '/images/exercises/hombro/press_militar_levantado.avif',
            muscleGroupId: 3
        },
        {
            name: 'Press militar con mancuernas levantado',
            imageUrl: '/images/exercises/hombro/press_militar_mancuernas_levantado.avif',
            muscleGroupId: 3
        },
        {
            name: 'Press militar con mancuernas sentado',
            imageUrl: '/images/exercises/hombro/press_militar_mancuernas_sentado.avif',
            muscleGroupId: 3
        },
        {
            name: 'Press militar en máquina',
            imageUrl: '/images/exercises/hombro/press_militar_maquina.avif',
            muscleGroupId: 3
        },
        {
            name: 'Press militar sentado',
            imageUrl: '/images/exercises/hombro/press_militar_sentado.avif',
            muscleGroupId: 3
        },
        {name: 'Press pino', imageUrl: '/images/exercises/hombro/press_pino.avif', muscleGroupId: 3},
        {name: 'Curl alterno', imageUrl: '/images/exercises/biceps/curl_alterno.avif', muscleGroupId: 4},
        {
            name: 'Curl con barra recta',
            imageUrl: '/images/exercises/biceps/curl_barra_recta.avif',
            muscleGroupId: 4
        },
        {name: 'Curl con barra Z', imageUrl: '/images/exercises/biceps/curl_barra_z.avif', muscleGroupId: 4},
        {
            name: 'Curl bayesian en polea',
            imageUrl: '/images/exercises/biceps/curl_bayesian.avif',
            muscleGroupId: 4
        },
        {name: 'Curl concentrado', imageUrl: '/images/exercises/biceps/curl_concentrado.avif', muscleGroupId: 4},
        {name: 'Curl inclinado', imageUrl: '/images/exercises/biceps/curl_inclinado.avif', muscleGroupId: 4},
        {name: 'Curl en máquina', imageUrl: '/images/exercises/biceps/curl_maquina.avif', muscleGroupId: 4},
        {name: 'Curl martillo', imageUrl: '/images/exercises/biceps/curl_martillo.avif', muscleGroupId: 4},
        {name: 'Curl en polea', imageUrl: '/images/exercises/biceps/curl_polea.avif', muscleGroupId: 4},
        {
            name: 'Curl predicador con barra',
            imageUrl: '/images/exercises/biceps/curl_predicador_barra.avif',
            muscleGroupId: 4
        },
        {
            name: 'Curl predicador con mancuerna',
            imageUrl: '/images/exercises/biceps/curl_predicador_mancuerna.avif',
            muscleGroupId: 4
        },
        {
            name: 'Extensión de tríceps con cuerda',
            imageUrl: '/images/exercises/triceps/extension_triceps_cuerda.avif',
            muscleGroupId: 5
        },
        {
            name: 'Press katana con mancuerna',
            imageUrl: '/images/exercises/triceps/press_katana_mancuerna.avif',
            muscleGroupId: 5
        },
        {
            name: 'Extensión de tríceps en polea',
            imageUrl: '/images/exercises/triceps/extension_triceps_polea.avif',
            muscleGroupId: 5
        },
        {
            name: 'Extensión de tríceps en polea baja',
            imageUrl: '/images/exercises/triceps/extension_triceps_polea_baja.avif',
            muscleGroupId: 5
        },
        {
            name: 'Flexiones de diamante',
            imageUrl: '/images/exercises/triceps/flexiones_diamante.avif',
            muscleGroupId: 5
        },
        {
            name: 'Press katana en polea',
            imageUrl: '/images/exercises/triceps/press_katana_polea.avif',
            muscleGroupId: 5
        },
        {
            name: 'Fondos de tríceps en banco',
            imageUrl: '/images/exercises/triceps/fondos_triceps_banco.avif',
            muscleGroupId: 5
        },
        {
            name: 'Fondos de tríceps en máquina',
            imageUrl: '/images/exercises/triceps/fondos_triceps_maquina.avif',
            muscleGroupId: 5
        },
        {name: 'Press francés', imageUrl: '/images/exercises/triceps/press_frances.avif', muscleGroupId: 5},
        {
            name: 'Press francés con mancuerna',
            imageUrl: '/images/exercises/triceps/press_frances_mancuerna.avif',
            muscleGroupId: 5
        },
        {
            name: 'Extensión de cuádriceps',
            imageUrl: '/images/exercises/cuadriceps/extensiones.avif',
            muscleGroupId: 6
        },
        {name: 'Hack squat', imageUrl: '/images/exercises/cuadriceps/hack_squat.avif', muscleGroupId: 6},
        {name: 'Pistol squat', imageUrl: '/images/exercises/cuadriceps/pistol_squat.avif', muscleGroupId: 6},
        {name: 'Prensa', imageUrl: '/images/exercises/cuadriceps/prensa.avif', muscleGroupId: 6},
        {
            name: 'Prensa horizontal',
            imageUrl: '/images/exercises/cuadriceps/prensa_horizontal.avif',
            muscleGroupId: 6
        },
        {
            name: 'Prensa vertical',
            imageUrl: '/images/exercises/cuadriceps/prensa_vertical.avif',
            muscleGroupId: 6
        },
        {name: 'Sentadilla', imageUrl: '/images/exercises/cuadriceps/sentadilla.avif', muscleGroupId: 6},
        {
            name: 'Sentadilla belt',
            imageUrl: '/images/exercises/cuadriceps/sentadilla_belt.avif',
            muscleGroupId: 6
        },
        {
            name: 'Sentadilla búlgara',
            imageUrl: '/images/exercises/cuadriceps/sentadilla_bulgara.avif',
            muscleGroupId: 6
        },
        {
            name: 'Sentadilla frontal',
            imageUrl: '/images/exercises/cuadriceps/sentadilla_frontal.avif',
            muscleGroupId: 6
        },
        {
            name: 'Sentadilla goblet',
            imageUrl: '/images/exercises/cuadriceps/sentadilla_goblet.avif',
            muscleGroupId: 6
        },
        {
            name: 'Sentadilla en multipower',
            imageUrl: '/images/exercises/cuadriceps/sentadilla_multipower.avif',
            muscleGroupId: 6
        },
        {
            name: 'Sentadilla con safety bar',
            imageUrl: '/images/exercises/cuadriceps/sentadilla_safety_bar.avif',
            muscleGroupId: 6
        },
        {
            name: 'Sentadilla sissy',
            imageUrl: '/images/exercises/cuadriceps/sentadilla_sissy.avif',
            muscleGroupId: 6
        },
        {name: 'Zancadas', imageUrl: '/images/exercises/cuadriceps/zancadas.avif', muscleGroupId: 6},
        {name: 'Buenos días', imageUrl: '/images/exercises/isquios/buenos_dias.avif', muscleGroupId: 7},
        {
            name: 'Buenos días en multipower',
            imageUrl: '/images/exercises/isquios/buenos_dias_multipower.avif',
            muscleGroupId: 7
        },
        {
            name: 'Curl femoral levantado',
            imageUrl: '/images/exercises/isquios/curl_femoral_levantado.avif',
            muscleGroupId: 7
        },
        {
            name: 'Curl femoral sentado',
            imageUrl: '/images/exercises/isquios/curl_femoral_sentado.avif',
            muscleGroupId: 7
        },
        {
            name: 'Curl femoral tumbado',
            imageUrl: '/images/exercises/isquios/curl_femoral_tumbado.avif',
            muscleGroupId: 7
        },
        {name: 'Curl nórdico', imageUrl: '/images/exercises/isquios/curl_nordico.avif', muscleGroupId: 7},
        {
            name: 'Peso muerto convencional',
            imageUrl: '/images/exercises/isquios/peso_muerto_convencional.avif',
            muscleGroupId: 7
        },
        {
            name: 'Peso muerto piernas rígidas',
            imageUrl: '/images/exercises/isquios/peso_muerto_piernas_rigidas.avif',
            muscleGroupId: 7
        },
        {
            name: 'Peso muerto rumano',
            imageUrl: '/images/exercises/isquios/peso_muerto_rumano.avif',
            muscleGroupId: 7
        },
        {
            name: 'Peso muerto rumano con mancuernas',
            imageUrl: '/images/exercises/isquios/peso_muerto_rumano_mancuernas.avif',
            muscleGroupId: 7
        },
        {
            name: 'Peso muerto sumo',
            imageUrl: '/images/exercises/isquios/peso_muerto_sumo.avif',
            muscleGroupId: 7
        },
        {name: 'Empuje de cadera', imageUrl: '/images/exercises/gluteo/empuje_cadera.avif', muscleGroupId: 8},
        {name: 'Hip thrust', imageUrl: '/images/exercises/gluteo/hip_thrust.avif', muscleGroupId: 8},
        {name: 'Patada de glúteo', imageUrl: '/images/exercises/gluteo/patada_gluteo.avif', muscleGroupId: 8},
        {name: 'Puente de glúteos', imageUrl: '/images/exercises/gluteo/puente_gluteos.avif', muscleGroupId: 8},
        {
            name: 'Elevaciones de gemelos con barra',
            imageUrl: '/images/exercises/gemelo/gemelo_levantado_barra.avif',
            muscleGroupId: 9
        },
        {
            name: 'Elevaciones de gemelo con mancuernas',
            imageUrl: '/images/exercises/gemelo/gemelo_levantado_mancuernas.avif',
            muscleGroupId: 9
        },
        {
            name: 'Elevaciones de gemelo en máquina',
            imageUrl: '/images/exercises/gemelo/gemelo_levantado_maquina.avif',
            muscleGroupId: 9
        },
        {
            name: 'Elevaciones de gemelo sentado en máquina',
            imageUrl: '/images/exercises/gemelo/gemelo_sentado_maquina.avif',
            muscleGroupId: 9
        },
        {
            name: 'Adductor en máquina',
            imageUrl: '/images/exercises/adductor/adductor_maquina.avif',
            muscleGroupId: 10
        },
        {
            name: 'Adductor en polea',
            imageUrl: '/images/exercises/adductor/adductor_polea.avif',
            muscleGroupId: 10
        },
        {
            name: 'Abductor en máquina',
            imageUrl: '/images/exercises/abductor/abductor_maquina.avif',
            muscleGroupId: 11
        },
        {
            name: 'Abductor en polea',
            imageUrl: '/images/exercises/abductor/abductor_polea.avif',
            muscleGroupId: 11
        },
        {name: 'Abdomen en polea', imageUrl: '/images/exercises/abdomen/abdomen_polea.avif', muscleGroupId: 12},
        {
            name: 'Crunch abdominal',
            imageUrl: '/images/exercises/abdomen/crunch_abominal.avif',
            muscleGroupId: 12
        },
        {
            name: 'Elevación de piernas en barra',
            imageUrl: '/images/exercises/abdomen/elevacion_piernas_barra.avif',
            muscleGroupId: 12
        },
        {
            name: 'Elevación de piernas tumbado',
            imageUrl: '/images/exercises/abdomen/elevacion_piernas_tumbado.avif',
            muscleGroupId: 12
        },
        {
            name: 'Elevación de rodillas',
            imageUrl: '/images/exercises/abdomen/elevacion_rodillas.avif',
            muscleGroupId: 12
        },
        {
            name: 'Mountain climber',
            imageUrl: '/images/exercises/abdomen/mountain_climber.avif',
            muscleGroupId: 12
        },
        {name: 'Pies a la barra', imageUrl: '/images/exercises/abdomen/pies_barra.avif', muscleGroupId: 12},
        {name: 'Press Pallof', imageUrl: '/images/exercises/abdomen/press_pallof.avif', muscleGroupId: 12},
        {name: 'Rueda abdominal', imageUrl: '/images/exercises/abdomen/rueda_abdominal.avif', muscleGroupId: 12},

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

    // 5️⃣ Crear usuario
    const saltRounds = 10;
    const userCarlos = await prisma.user.create({
        data: {
            name: 'Carlos',
            pin: await bcrypt.hash('1234', saltRounds),
        },
    });
    const userAlex = await prisma.user.create({
        data: {
            name: 'Alex',
            pin: await bcrypt.hash('0311', saltRounds),
        },
    });
    const userToni = await prisma.user.create({
        data: {
            name: 'Toni',
            pin: await bcrypt.hash('6969', saltRounds),
        },
    });
    const userSergio = await prisma.user.create({
        data: {
            name: 'Sergio',
            pin: await bcrypt.hash('9999', saltRounds),
        },
    });
    const userAlessandra = await prisma.user.create({
        data: {
            name: 'Alessandra',
            pin: await bcrypt.hash('4343', saltRounds),
        },
    });
    const userAngela = await prisma.user.create({
        data: {
            name: 'Angela',
            pin: await bcrypt.hash('7777', saltRounds),
        },
    });
    const userLorena = await prisma.user.create({
        data: {
            name: 'Lorena',
            pin: await bcrypt.hash('0707', saltRounds),
        },
    });
    const userStiwy = await prisma.user.create({
        data: {
            name: 'Stiwy',
            pin: await bcrypt.hash('0303', saltRounds),
        },
    });
    const userLaura = await prisma.user.create({
        data: {
            name: 'Laura',
            pin: await bcrypt.hash('2026', saltRounds),
        },
    });
    console.log('✅ Usuarios creados');

    const users = [userCarlos, userAlex, userToni, userSergio, userAlessandra, userAngela, userLorena, userStiwy, userLaura];

    const baseRoutines = [
        {
            name: 'Torso 1',
            sets: [
                {exerciseId: 19, series: 3, repetitions: 8, order: 1},
                {exerciseId: 1, series: 3, repetitions: 8, order: 2},
                {exerciseId: 37, series: 3, repetitions: 10, order: 3},
                {exerciseId: 41, series: 3, repetitions: 10, order: 4},
                {exerciseId: 54, series: 3, repetitions: 10, order: 5},
            ],
        },
        {
            name: 'Pierna 1',
            sets: [
                {exerciseId: 96, series: 3, repetitions: 12, order: 1},
                {exerciseId: 73, series: 3, repetitions: 8, order: 2},
                {exerciseId: 65, series: 3, repetitions: 10, order: 3},
                {exerciseId: 81, series: 3, repetitions: 10, order: 4},
                {exerciseId: 62, series: 3, repetitions: 10, order: 5},
                {exerciseId: 94, series: 4, repetitions: 10, order: 6},
            ],
        },
    ];

    // 6️⃣ Crear rutinas
    await Promise.all(
        users.map(user =>
            Promise.all(
                baseRoutines.map(routine =>
                    prisma.routine.create({
                        data: {
                            name: routine.name,
                            userId: user.id,
                            sets: {create: routine.sets},
                        },
                    })
                )
            )
        )
    );
    console.log('✅ Rutinas creadas con sus sets');
    console.log('🌱 Seed completado correctamente');
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
