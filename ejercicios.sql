-- 1️⃣ Borrar y resetear las tablas relacionadas
TRUNCATE TABLE "Exercise" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "MuscleGroup" RESTART IDENTITY CASCADE;

-- 2️⃣ Insertar grupos musculares
INSERT INTO "MuscleGroup" (name) VALUES
('Pecho'),
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
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId") VALUES
('Press banca', '/assets/images/exercises/pecho/press_banca.png', 1),
('Press inclinado', '/assets/images/exercises/pecho/press_inclinado.png', 1),
('Fondos en paralelas', '/assets/images/exercises/pecho/fondos_en_paralelas.png', 1),
('Aperturas con mancuernas', '/assets/images/exercises/pecho/aperturas_mancuernas.png', 1),
('Press con mancuernas', '/assets/images/exercises/pecho/press_mancuernas.png', 1);

-- Espalda (id = 2)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId") VALUES
('Peso muerto', '/assets/images/exercises/espalda/peso_muerto.png', 2),
('Dominadas', '/assets/images/exercises/espalda/dominadas.avif', 2),
('Remo con barra', '/assets/images/exercises/espalda/remo_barra.avif', 2),
('Remo con mancuerna', '/assets/images/exercises/espalda/remo_mancuerna.png', 2),
('Jalón al pecho', '/assets/images/exercises/espalda/jalon_pecho.png', 2);

-- Hombro (id = 3)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId") VALUES
('Press militar', '/assets/images/exercises/hombro/press_militar.avif', 3),
('Elevaciones laterales', '/assets/images/exercises/hombro/elevaciones_laterales.png', 3),
('Elevaciones frontales', '/assets/images/exercises/hombro/elevaciones_frontales.png', 3),
('Pájaros', '/assets/images/exercises/hombro/pajaros.png', 3);

-- Bíceps (id = 4)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId") VALUES
('Curl con barra', '/assets/images/exercises/biceps/curl_barra.png', 4),
('Curl con mancuernas', '/assets/images/exercises/biceps/curl_mancuernas.png', 4),
('Curl martillo', '/assets/images/exercises/biceps/curl_martillo.png', 4);

-- Tríceps (id = 5)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId") VALUES
('Fondos en paralelas', '/assets/images/exercises/triceps/fondos_en_paralelas.png', 5),
('Extensión de tríceps en polea', '/assets/images/exercises/triceps/extension_polea.png', 5),
('Press francés', '/assets/images/exercises/triceps/press_frances.png', 5);

-- Cuádriceps (id = 6)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId") VALUES
('Sentadilla', '/assets/images/exercises/cuadriceps/sentadilla.avif', 6),
('Prensa', '/assets/images/exercises/cuadriceps/prensa.png', 6),
('Hack squat', '/assets/images/exercises/cuadriceps/hack_squat.png', 6),
('Zancadas', '/assets/images/exercises/cuadriceps/zancadas.png', 6);

-- Isquios (id = 7)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId") VALUES
('Curl femoral tumbado', '/assets/images/exercises/isquios/curl_femoral_tumbado.png', 7),
('Peso muerto rumano', '/assets/images/exercises/isquios/peso_muerto_rumano.avif', 7);

-- Glúteo (id = 8)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId") VALUES
('Hip thrust', '/assets/images/exercises/gluteo/hip_thrust.png', 8),
('Puente de glúteos', '/assets/images/exercises/gluteo/puente_gluteos.png', 8);

-- Gemelo (id = 9)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId") VALUES
('Elevaciones de talones de pie', '/assets/images/exercises/gemelo/elevaciones_talones_pie.png', 9),
('Elevaciones de talones sentado', '/assets/images/exercises/gemelo/elevaciones_talones_sentado.png', 9);

-- Adductor (id = 10)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId") VALUES
('Máquina de aductores', '/assets/images/exercises/adductor/maquina_aductores.png', 10);

-- Abductor (id = 11)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId") VALUES
('Máquina de abductores', '/assets/images/exercises/abductor/maquina_abductores.png', 11),
('Elevaciones laterales de pierna', '/assets/images/exercises/abductor/elevaciones_laterales_pierna.png', 11);

-- Abdomen (id = 12)
INSERT INTO "Exercise" (name, "imageUrl", "muscleGroupId") VALUES
('Crunch abdominal', '/assets/images/exercises/abdomen/crunch.png', 12),
('Plancha', '/assets/images/exercises/abdomen/plancha.png', 12),
('Elevaciones de piernas', '/assets/images/exercises/abdomen/elevaciones_piernas.png', 12);
