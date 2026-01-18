-- 1️⃣ Borrar y resetear las tablas relacionadas
TRUNCATE TABLE "Exercise" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "MuscleGroup" RESTART IDENTITY CASCADE;

-- 2️⃣ Insertar grupos musculares
INSERT INTO "MuscleGroup" (name)
VALUES ('Pecho'),
       ('Espalda'),
       ('Hombro'),
       ('Bíceps'),
       ('Tríceps'),
       ('Cuádriceps'),
       ('Isquios'),
       ('Glúteo'),
       ('Gemelo'),
       ('Adductor'),
       ('Abductor'),
       ('Abdomen');

-- 3️⃣ Insertar ejercicios con su grupo muscular correspondiente

-- Pecho (id = 1)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Press banca', '/images/exercises/pecho/press_banca.avif', 1),
       ('Press inclinado', '/images/exercises/pecho/press_inclinado.avif', 1),
       ('Press declinado', '/images/exercises/pecho/press_declinado.avif', 1),
       ('Press inclinado con mancuernas', '/images/exercises/pecho/press_inclinado_mancuernas.avif', 1),
       ('Press con mancuernas', '/images/exercises/pecho/press_mancuernas.avif', 1),
       ('Press en máquina', '/images/exercises/pecho/press_maquina.avif', 1),
       ('Press en multipower', '/images/exercises/pecho/press_multipower.avif', 1),
       ('Fondos en paralelas', '/images/exercises/pecho/fondos.avif', 1),
       ('Aperturas con mancuernas', '/images/exercises/pecho/aperturas_mancuernas.avif', 1),
       ('Aperturas en máquina', '/images/exercises/pecho/aperturas_maquina.avif', 1),
       ('Flexiones', '/images/exercises/pecho/flexion.avif', 1),
       ('Flexiones declinadas', '/images/exercises/pecho/flexion_declinada.avif', 1),
       ('Cruce de poleas', '/images/exercises/pecho/cruze_poleas.avif', 1);

-- Espalda (id = 2)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Dominadas', '/images/exercises/espalda/dominadas.avif', 2),
       ('Dominadas agarre neutro', '/images/exercises/espalda/dominadas_neutro.avif', 2),
       ('Dominadas agarre supino', '/images/exercises/espalda/dominadas_supino.avif', 2),
       ('Encogimientos', '/images/exercises/espalda/encogimientos.avif', 2),
       ('Hiperextensiones espalda', '/images/exercises/espalda/hiperextensiones_espalda.avif', 2),
       ('Jalón al pecho', '/images/exercises/espalda/jalon.avif', 2),
       ('Pullover', '/images/exercises/espalda/pullover.avif', 2),
       ('Remo en banco', '/images/exercises/espalda/remo_banco.avif', 2),
       ('Remo gironda', '/images/exercises/espalda/remo_gironda.avif', 2),
       ('Remo libre', '/images/exercises/espalda/remo_libre.avif', 2),
       ('Remo en máquina', '/images/exercises/espalda/remo_maquina.avif', 2),
       ('Remo alto en máquina', '/images/exercises/espalda/remo_alto.avif', 2),
       ('Remo pendlay', '/images/exercises/espalda/remo_pendlay.avif', 2),
       ('Seal row', '/images/exercises/espalda/remo_seal.avif', 2),
       ('Remo en T', '/images/exercises/espalda/remo_t.avif', 2);

-- Hombro (id = 3)
INSERT
INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Elevaciones frontales', '/images/exercises/hombro/elevaciones_frontales.avif', 3),
       ('Elevaciones laterales en polea', '/images/exercises/hombro/elevaciones_laterales_polea.avif', 3),
       ('Elevaciones laterales con mancuernas', '/images/exercises/hombro/elevaciones_laterales_mancuernas.avif',
        3),
       ('Elevaciones laterales en máquina', '/images/exercises/hombro/elevaciones_laterales_maquina.avif', 3),
       ('Face pull', '/images/exercises/hombro/face_pull.avif', 3),
       ('Flexiones pica', '/images/exercises/hombro/flexiones_pica.avif', 3),
       ('Press militar levantado', '/images/exercises/hombro/press_militar_levantado.avif', 3),
       ('Press militar con mancuernas levantado',
        '/images/exercises/hombro/press_militar_mancuernas_levantado.avif', 3),
       ('Press militar con mancuernas sentado', '/images/exercises/hombro/press_militar_mancuernas_sentado.avif',
        3),
       ('Press militar en máquina', '/images/exercises/hombro/press_militar_maquina.avif', 3),
       ('Press militar sentado', '/images/exercises/hombro/press_militar_sentado.avif', 3),
       ('Press pino', '/images/exercises/hombro/press_pino.avif', 3);

-- Bíceps (id = 4)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Curl alterno', '/images/exercises/biceps/curl_alterno.avif', 4),
       ('Curl con barra recta', '/images/exercises/biceps/curl_barra_recta.avif', 4),
       ('Curl con barra Z', '/images/exercises/biceps/curl_barra_z.avif', 4),
       ('Curl bayesian en polea', '/images/exercises/biceps/curl_bayesian.avif', 4),
       ('Curl concentrado', '/images/exercises/biceps/curl_concentrado.avif', 4),
       ('Curl inclinado', '/images/exercises/biceps/curl_inclinado.avif', 4),
       ('Curl en máquina', '/images/exercises/biceps/curl_maquina.avif', 4),
       ('Curl martillo', '/images/exercises/biceps/curl_martillo.avif', 4),
       ('Curl en polea', '/images/exercises/biceps/curl_polea.avif', 4),
       ('Curl predicador con barra', '/images/exercises/biceps/curl_predicador_barra.avif', 4),
       ('Curl predicador con mancuerna', '/images/exercises/biceps/curl_predicador_mancuerna.avif', 4);

-- Tríceps (id = 5)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Extensión de tríceps con cuerda', '/images/exercises/triceps/extension_triceps_cuerda.avif', 5),
       ('Extensión de tríceps en polea', '/images/exercises/triceps/extension_triceps_polea.avif', 5),
       ('Extensión de tríceps en polea baja', '/images/exercises/triceps/extension_triceps_polea_baja.avif', 5),
       ('Flexiones de diamante', '/images/exercises/triceps/flexiones_diamante.avif', 5),
       ('Press katana en polea', '/images/exercises/triceps/press_katana_polea.avif', 5),
       ('Press katana con mancuerna', '/images/exercises/triceps/press_katana_mancuerna.avif', 5),
       ('Fondos de tríceps en banco', '/images/exercises/triceps/fondos_triceps_banco.avif', 5),
       ('Fondos de tríceps en máquina', '/images/exercises/triceps/fondos_triceps_maquina.avif', 5),
       ('Press francés', '/images/exercises/triceps/press_frances.avif', 5),
       ('Press francés con mancuerna', '/images/exercises/triceps/press_frances_mancuerna.avif', 5);

-- Cuádriceps (id = 6)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Extensión de cuádriceps', '/images/exercises/cuadriceps/extensiones.avif', 6),
       ('Hack squat', '/images/exercises/cuadriceps/hack_squat.avif', 6),
       ('Pistol squat', '/images/exercises/cuadriceps/pistol_squat.avif', 6),
       ('Prensa', '/images/exercises/cuadriceps/prensa.avif', 6),
       ('Prensa horizontal', '/images/exercises/cuadriceps/prensa_horizontal.avif', 6),
       ('Prensa vertical', '/images/exercises/cuadriceps/prensa_vertical.avif', 6),
       ('Sentadilla', '/images/exercises/cuadriceps/sentadilla.avif', 6),
       ('Sentadilla belt', '/images/exercises/cuadriceps/sentadilla_belt.avif', 6),
       ('Sentadilla búlgara', '/images/exercises/cuadriceps/sentadilla_bulgara.avif', 6),
       ('Sentadilla frontal', '/images/exercises/cuadriceps/sentadilla_frontal.avif', 6),
       ('Sentadilla pendular', '/images/exercises/cuadriceps/sentadilla_pendular.avif', 6),
       ('Sentadilla goblet', '/images/exercises/cuadriceps/sentadilla_goblet.avif', 6),
       ('Sentadilla en multipower', '/images/exercises/cuadriceps/sentadilla_multipower.avif', 6),
       ('Sentadilla con safety bar', '/images/exercises/cuadriceps/sentadilla_safety_bar.avif', 6),
       ('Sentadilla sissy', '/images/exercises/cuadriceps/sentadilla_sissy.avif', 6),
       ('Zancadas', '/images/exercises/cuadriceps/zancadas.avif', 6);

-- Isquios (id = 7)
INSERT
INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Buenos días', '/images/exercises/isquios/buenos_dias.avif', 7),
       ('Buenos días en multipower', '/images/exercises/isquios/buenos_dias_multipower.avif', 7),
       ('Curl femoral de pie', '/images/exercises/isquios/curl_femoral_levantado.avif', 7),
       ('Curl femoral sentado', '/images/exercises/isquios/curl_femoral_sentado.avif', 7),
       ('Curl femoral tumbado', '/images/exercises/isquios/curl_femoral_tumbado.avif', 7),
       ('Curl nórdico', '/images/exercises/isquios/curl_nordico.avif', 7),
       ('Peso muerto convencional', '/images/exercises/isquios/peso_muerto_convencional.avif', 7),
       ('Peso muerto piernas rígidas', '/images/exercises/isquios/peso_muerto_piernas_rigidas.avif', 7),
       ('Peso muerto rumano', '/images/exercises/isquios/peso_muerto_rumano.avif', 7),
       ('Peso muerto rumano con mancuernas', '/images/exercises/isquios/peso_muerto_rumano_mancuernas.avif', 7),
       ('Peso muerto sumo', '/images/exercises/isquios/peso_muerto_sumo.avif', 7);

-- Glúteo (id = 8)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Empuje de cadera', '/images/exercises/gluteo/empuje_cadera.avif', 8),
       ('Hip thrust', '/images/exercises/gluteo/hip_thrust.avif', 8),
       ('Patada de glúteo', '/images/exercises/gluteo/patada_gluteo.avif', 8),
       ('Puente de glúteos', '/images/exercises/gluteo/puente_gluteos.avif', 8);

-- Gemelo (id = 9)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Elevaciones de gemelo con barra', '/images/exercises/gemelo/gemelo_levantado_barra.avif', 9),
       ('Elevaciones de gemelo con mancuernas', '/images/exercises/gemelo/gemelo_levantado_mancuernas.avif', 9),
       ('Elevaciones de gemelo en máquina', '/images/exercises/gemelo/gemelo_levantado_maquina.avif', 9),
       ('Elevaciones de gemelo sentado en máquina', '/images/exercises/gemelo/gemelo_sentado_maquina.avif', 9);

-- Adductor (id = 10)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Adductor en máquina', '/images/exercises/adductor/adductor_maquina.avif', 10),
       ('Adductor en polea', '/images/exercises/adductor/adductor_polea.avif', 10);

-- Abductor (id = 11)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Abductor en máquina', '/images/exercises/abductor/abductor_maquina.avif', 11),
       ('Abductor en polea', '/images/exercises/abductor/abductor_polea.avif', 11);

-- Abdomen (id = 12)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Abdomen en polea', '/images/exercises/abdomen/abdomen_polea.avif', 12),
       ('Crunch abdominal', '/images/exercises/abdomen/crunch_abominal.avif', 12),
       ('Elevación de piernas en barra', '/images/exercises/abdomen/elevacion_piernas_barra.avif', 12),
       ('Elevación de piernas tumbado', '/images/exercises/abdomen/elevacion_piernas_tumbado.avif', 12),
       ('Elevación de rodillas', '/images/exercises/abdomen/elevacion_rodillas.avif', 12),
       ('Mountain climber', '/images/exercises/abdomen/mountain_climber.avif', 12),
       ('Pies a la barra', '/images/exercises/abdomen/pies_barra.avif', 12),
       ('Press Pallof', '/images/exercises/abdomen/press_pallof.avif', 12),
       ('Rueda abdominal', '/images/exercises/abdomen/rueda_abdominal.avif', 12);
