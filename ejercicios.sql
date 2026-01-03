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
VALUES ('Press militar', '/assets/images/exercises/hombro/press_militar.avif', 3),
       ('Elevaciones laterales', '/assets/images/exercises/hombro/elevaciones_laterales.png', 3),
       ('Elevaciones frontales', '/assets/images/exercises/hombro/elevaciones_frontales.png', 3),
       ('Pájaros', '/assets/images/exercises/hombro/pajaros.png', 3);

-- Bíceps (id = 4)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Curl con barra', '/assets/images/exercises/biceps/curl_barra.png', 4),
       ('Curl con mancuernas', '/assets/images/exercises/biceps/curl_mancuernas.png', 4),
       ('Curl martillo', '/assets/images/exercises/biceps/curl_martillo.png', 4);

-- Tríceps (id = 5)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Fondos en paralelas', '/assets/images/exercises/triceps/fondos_en_paralelas.png', 5),
       ('Extensión de tríceps en polea', '/assets/images/exercises/triceps/extension_polea.png', 5),
       ('Press francés', '/assets/images/exercises/triceps/press_frances.png', 5);

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
VALUES ('Curl femoral tumbado', '/assets/images/exercises/isquios/curl_femoral_tumbado.png', 7),
       ('Peso muerto rumano', '/assets/images/exercises/isquios/peso_muerto_rumano.avif', 7);

-- Glúteo (id = 8)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Hip thrust', '/assets/images/exercises/gluteo/hip_thrust.png', 8),
       ('Puente de glúteos', '/assets/images/exercises/gluteo/puente_gluteos.png', 8);

-- Gemelo (id = 9)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Elevaciones de talones de pie', '/assets/images/exercises/gemelo/elevaciones_talones_pie.png', 9),
       ('Elevaciones de talones sentado', '/assets/images/exercises/gemelo/elevaciones_talones_sentado.png', 9);

-- Adductor (id = 10)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Máquina de aductores', '/assets/images/exercises/adductor/maquina_aductores.png', 10);

-- Abductor (id = 11)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Máquina de abductores', '/assets/images/exercises/abductor/maquina_abductores.png', 11),
       ('Elevaciones laterales de pierna', '/assets/images/exercises/abductor/elevaciones_laterales_pierna.png', 11);

-- Abdomen (id = 12)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId")
VALUES ('Crunch abdominal', '/assets/images/exercises/abdomen/crunch.png', 12),
       ('Plancha', '/assets/images/exercises/abdomen/plancha.png', 12),
       ('Elevaciones de piernas', '/assets/images/exercises/abdomen/elevaciones_piernas.png', 12);
