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
VALUES ('Press banca', '/assets/images/exercises/pecho/press_banca.avif', 1),
       ('Press inclinado', '/assets/images/exercises/pecho/press_inclinado.avif', 1),
       ('Press declinado', '/assets/images/exercises/pecho/press_declinado.avif', 1),
       ('Press inclinado con mancuernas', '/assets/images/exercises/pecho/press_inclinado_mancuernas.avif', 1),
       ('Press con mancuernas', '/assets/images/exercises/pecho/press_mancuernas.avif', 1),
       ('Press en máquina', '/assets/images/exercises/pecho/press_maquina.avif', 1),
       ('Press en multipower', '/assets/images/exercises/pecho/press_multipower.avif', 1),
       ('Fondos en paralelas', '/assets/images/exercises/pecho/fondos.avif', 1),
       ('Aperturas con mancuernas', '/assets/images/exercises/pecho/aperturas_mancuernas.avif', 1),
       ('Aperturas en máquina', '/assets/images/exercises/pecho/aperturas_maquina.avif', 1),
       ('Flexiones', '/assets/images/exercises/pecho/flexion.avif', 1),
       ('Flexiones declinadas', '/assets/images/exercises/pecho/flexion_declinada.avif', 1),
       ('Cruce de poleas', '/assets/images/exercises/pecho/cruze_poleas.avif', 1);

-- Espalda (id = 2)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Dominadas', '/assets/images/exercises/espalda/dominadas.avif', 2),
       ('Dominadas agarre neutro', '/assets/images/exercises/espalda/dominadas_neutro.avif', 2),
       ('Dominadas agarre supino', '/assets/images/exercises/espalda/dominadas_supino.avif', 2),
       ('Encogimientos', '/assets/images/exercises/espalda/encogimientos.avif', 2),
       ('Hiperextensiones espalda', '/assets/images/exercises/espalda/hiperextensiones_espalda.avif', 2),
       ('Jalón al pecho', '/assets/images/exercises/espalda/jalon.avif', 2),
       ('Pullover', '/assets/images/exercises/espalda/pullover.avif', 2),
       ('Remo en banco', '/assets/images/exercises/espalda/remo_banco.avif', 2),
       ('Remo gironda', '/assets/images/exercises/espalda/remo_gironda.avif', 2),
       ('Remo libre', '/assets/images/exercises/espalda/remo_libre.avif', 2),
       ('Remo en máquina', '/assets/images/exercises/espalda/remo_maquina.avif', 2),
       ('Remo alto en máquina', '/assets/images/exercises/espalda/remo_alto.avif', 2),
       ('Remo pendlay', '/assets/images/exercises/espalda/remo_pendlay.avif', 2),
       ('Seal row', '/assets/images/exercises/espalda/remo_seal.avif', 2),
       ('Remo en T', '/assets/images/exercises/espalda/remo_t.avif', 2);

-- Hombro (id = 3)
INSERT
INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Elevaciones frontales', '/assets/images/exercises/hombro/elevaciones_frontales.avif', 3),
       ('Elevaciones laterales en polea', '/assets/images/exercises/hombro/elevaciones_laterales_polea.avif', 3),
       ('Elevaciones laterales con mancuernas', '/assets/images/exercises/hombro/elevaciones_laterales_mancuernas.avif',
        3),
       ('Elevaciones laterales en máquina', '/assets/images/exercises/hombro/elevaciones_laterales_maquina.avif', 3),
       ('Face pull', '/assets/images/exercises/hombro/face_pull.avif', 3),
       ('Flexiones pica', '/assets/images/exercises/hombro/flexiones_pica.avif', 3),
       ('Press militar levantado', '/assets/images/exercises/hombro/press_militar_levantado.avif', 3),
       ('Press militar con mancuernas levantado',
        '/assets/images/exercises/hombro/press_militar_mancuernas_levantado.avif', 3),
       ('Press militar con mancuernas sentado', '/assets/images/exercises/hombro/press_militar_mancuernas_sentado.avif',
        3),
       ('Press militar en máquina', '/assets/images/exercises/hombro/press_militar_maquina.avif', 3),
       ('Press militar sentado', '/assets/images/exercises/hombro/press_militar_sentado.avif', 3),
       ('Press pino', '/assets/images/exercises/hombro/press_pino.avif', 3);

-- Bíceps (id = 4)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Curl alterno', '/assets/images/exercises/biceps/curl_alterno.avif', 4),
       ('Curl con barra recta', '/assets/images/exercises/biceps/curl_barra_recta.avif', 4),
       ('Curl con barra Z', '/assets/images/exercises/biceps/curl_barra_z.avif', 4),
       ('Curl bayesian en polea', '/assets/images/exercises/biceps/curl_bayesian.avif', 4),
       ('Curl concentrado', '/assets/images/exercises/biceps/curl_concentrado.avif', 4),
       ('Curl inclinado', '/assets/images/exercises/biceps/curl_inclinado.avif', 4),
       ('Curl en máquina', '/assets/images/exercises/biceps/curl_maquina.avif', 4),
       ('Curl martillo', '/assets/images/exercises/biceps/curl_martillo.avif', 4),
       ('Curl en polea', '/assets/images/exercises/biceps/curl_polea.avif', 4),
       ('Curl predicador con barra', '/assets/images/exercises/biceps/curl_predicador_barra.avif', 4),
       ('Curl predicador con mancuerna', '/assets/images/exercises/biceps/curl_predicador_mancuerna.avif', 4);

-- Tríceps (id = 5)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Extensión de tríceps con cuerda', '/assets/images/exercises/triceps/extension_triceps_cuerda.avif', 5),
       ('Extensión de tríceps en polea', '/assets/images/exercises/triceps/extension_triceps_polea.avif', 5),
       ('Extensión de tríceps en polea baja', '/assets/images/exercises/triceps/extension_triceps_polea_baja.avif', 5),
       ('Flexiones de diamante', '/assets/images/exercises/triceps/flexiones_diamante.avif', 5),
       ('Press katana en polea', '/assets/images/exercises/triceps/press_katana_polea.avif', 5),
       ('Press katana con mancuerna', '/assets/images/exercises/triceps/press_katana_mancuerna.avif', 5),
       ('Fondos de tríceps en banco', '/assets/images/exercises/triceps/fondos_triceps_banco.avif', 5),
       ('Fondos de tríceps en máquina', '/assets/images/exercises/triceps/fondos_triceps_maquina.avif', 5),
       ('Press francés', '/assets/images/exercises/triceps/press_frances.avif', 5),
       ('Press francés con mancuerna', '/assets/images/exercises/triceps/press_frances_mancuerna.avif', 5);

-- Cuádriceps (id = 6)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Extensión de cuádriceps', '/assets/images/exercises/cuadriceps/extensiones.avif', 6),
       ('Hack squat', '/assets/images/exercises/cuadriceps/hack_squat.avif', 6),
       ('Pistol squat', '/assets/images/exercises/cuadriceps/pistol_squat.avif', 6),
       ('Prensa', '/assets/images/exercises/cuadriceps/prensa.avif', 6),
       ('Prensa horizontal', '/assets/images/exercises/cuadriceps/prensa_horizontal.avif', 6),
       ('Prensa vertical', '/assets/images/exercises/cuadriceps/prensa_vertical.avif', 6),
       ('Sentadilla', '/assets/images/exercises/cuadriceps/sentadilla.avif', 6),
       ('Sentadilla belt', '/assets/images/exercises/cuadriceps/sentadilla_belt.avif', 6),
       ('Sentadilla búlgara', '/assets/images/exercises/cuadriceps/sentadilla_bulgara.avif', 6),
       ('Sentadilla frontal', '/assets/images/exercises/cuadriceps/sentadilla_frontal.avif', 6),
       ('Sentadilla goblet', '/assets/images/exercises/cuadriceps/sentadilla_goblet.avif', 6),
       ('Sentadilla en multipower', '/assets/images/exercises/cuadriceps/sentadilla_multipower.avif', 6),
       ('Sentadilla con safety bar', '/assets/images/exercises/cuadriceps/sentadilla_safety_bar.avif', 6),
       ('Sentadilla sissy', '/assets/images/exercises/cuadriceps/sentadilla_sissy.avif', 6),
       ('Zancadas', '/assets/images/exercises/cuadriceps/zancadas.avif', 6);

-- Isquios (id = 7)
INSERT
INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Buenos días', '/assets/images/exercises/isquios/buenos_dias.avif', 7),
       ('Buenos días en multipower', '/assets/images/exercises/isquios/buenos_dias_multipower.avif', 7),
       ('Curl femoral de pie', '/assets/images/exercises/isquios/curl_femoral_levantado.avif', 7),
       ('Curl femoral sentado', '/assets/images/exercises/isquios/curl_femoral_sentado.avif', 7),
       ('Curl femoral tumbado', '/assets/images/exercises/isquios/curl_femoral_tumbado.avif', 7),
       ('Curl nórdico', '/assets/images/exercises/isquios/curl_nordico.avif', 7),
       ('Peso muerto convencional', '/assets/images/exercises/isquios/peso_muerto_convencional.avif', 7),
       ('Peso muerto piernas rígidas', '/assets/images/exercises/isquios/peso_muerto_piernas_rigidas.avif', 7),
       ('Peso muerto rumano', '/assets/images/exercises/isquios/peso_muerto_rumano.avif', 7),
       ('Peso muerto rumano con mancuernas', '/assets/images/exercises/isquios/peso_muerto_rumano_mancuernas.avif', 7),
       ('Peso muerto sumo', '/assets/images/exercises/isquios/peso_muerto_sumo.avif', 7);

-- Glúteo (id = 8)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Empuje de cadera', '/assets/images/exercises/gluteo/empuje_cadera.avif', 8),
       ('Hip thrust', '/assets/images/exercises/gluteo/hip_thrust.avif', 8),
       ('Patada de glúteo', '/assets/images/exercises/gluteo/patada_gluteo.avif', 8),
       ('Puente de glúteos', '/assets/images/exercises/gluteo/puente_gluteos.avif', 8);

-- Gemelo (id = 9)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Elevaciones de gemelo con barra', '/assets/images/exercises/gemelo/gemelo_levantado_barra.avif', 9),
       ('Elevaciones de gemelo con mancuernas', '/assets/images/exercises/gemelo/gemelo_levantado_mancuernas.avif', 9),
       ('Elevaciones de gemelo en máquina', '/assets/images/exercises/gemelo/gemelo_levantado_maquina.avif', 9),
       ('Elevaciones de gemelo sentado en máquina', '/assets/images/exercises/gemelo/gemelo_sentado_maquina.avif', 9);

-- Adductor (id = 10)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Adductor en máquina', '/assets/images/exercises/adductor/adductor_maquina.avif', 10),
       ('Adductor en polea', '/assets/images/exercises/adductor/adductor_polea.avif', 10);

-- Abductor (id = 11)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Abductor en máquina', '/assets/images/exercises/abductor/abductor_maquina.avif', 11),
       ('Abductor en polea', '/assets/images/exercises/abductor/abductor_polea.avif', 11);

-- Abdomen (id = 12)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Abdomen en polea', '/assets/images/exercises/abdomen/abdomen_polea.avif', 12),
       ('Crunch abdominal', '/assets/images/exercises/abdomen/crunch_abominal.avif', 12),
       ('Elevación de piernas en barra', '/assets/images/exercises/abdomen/elevacion_piernas_barra.avif', 12),
       ('Elevación de piernas tumbado', '/assets/images/exercises/abdomen/elevacion_piernas_tumbado.avif', 12),
       ('Elevación de rodillas', '/assets/images/exercises/abdomen/elevacion_rodillas.avif', 12),
       ('Mountain climber', '/assets/images/exercises/abdomen/mountain_climber.avif', 12),
       ('Pies a la barra', '/assets/images/exercises/abdomen/pies_barra.avif', 12),
       ('Press Pallof', '/assets/images/exercises/abdomen/press_pallof.avif', 12),
       ('Rueda abdominal', '/assets/images/exercises/abdomen/rueda_abdominal.avif', 12);
