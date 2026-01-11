--
-- PostgreSQL database dump
--

\restrict CzsRI6jOnA1wAhGSzHa50hZDMbGxA0R2gGGD2ZYNzPU5DYJaKxM0V8zGYeZ5OE4

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2026-01-11 04:46:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS gym;
--
-- TOC entry 5108 (class 1262 OID 16914)
-- Name: gym; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE gym WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';


ALTER DATABASE gym OWNER TO postgres;

\unrestrict CzsRI6jOnA1wAhGSzHa50hZDMbGxA0R2gGGD2ZYNzPU5DYJaKxM0V8zGYeZ5OE4
\connect gym
\restrict CzsRI6jOnA1wAhGSzHa50hZDMbGxA0R2gGGD2ZYNzPU5DYJaKxM0V8zGYeZ5OE4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 33157)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 5109 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 33187)
-- Name: Exercise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Exercise" (
    id integer NOT NULL,
    name text NOT NULL,
    "imageUrl" text,
    "muscleGroupId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Exercise" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 33186)
-- Name: Exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Exercise_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Exercise_id_seq" OWNER TO postgres;

--
-- TOC entry 5111 (class 0 OID 0)
-- Dependencies: 222
-- Name: Exercise_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Exercise_id_seq" OWNED BY public."Exercise".id;


--
-- TOC entry 225 (class 1259 OID 33200)
-- Name: MuscleGroup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MuscleGroup" (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."MuscleGroup" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 33199)
-- Name: MuscleGroup_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MuscleGroup_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MuscleGroup_id_seq" OWNER TO postgres;

--
-- TOC entry 5112 (class 0 OID 0)
-- Dependencies: 224
-- Name: MuscleGroup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MuscleGroup_id_seq" OWNED BY public."MuscleGroup".id;


--
-- TOC entry 227 (class 1259 OID 33213)
-- Name: Routine; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Routine" (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."Routine" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 33227)
-- Name: RoutineSet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RoutineSet" (
    id integer NOT NULL,
    series integer NOT NULL,
    repetitions integer NOT NULL,
    description text,
    "order" integer NOT NULL,
    "routineId" integer NOT NULL,
    "exerciseId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."RoutineSet" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 33226)
-- Name: RoutineSet_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RoutineSet_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."RoutineSet_id_seq" OWNER TO postgres;

--
-- TOC entry 5113 (class 0 OID 0)
-- Dependencies: 228
-- Name: RoutineSet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RoutineSet_id_seq" OWNED BY public."RoutineSet".id;


--
-- TOC entry 226 (class 1259 OID 33212)
-- Name: Routine_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Routine_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Routine_id_seq" OWNER TO postgres;

--
-- TOC entry 5114 (class 0 OID 0)
-- Dependencies: 226
-- Name: Routine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Routine_id_seq" OWNED BY public."Routine".id;


--
-- TOC entry 237 (class 1259 OID 33288)
-- Name: Series; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Series" (
    id integer NOT NULL,
    "sessionExerciseId" integer NOT NULL,
    "order" integer NOT NULL,
    reps integer NOT NULL,
    weight double precision,
    intensity integer,
    rir integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "unitId" integer
);


ALTER TABLE public."Series" OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 33287)
-- Name: Series_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Series_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Series_id_seq" OWNER TO postgres;

--
-- TOC entry 5115 (class 0 OID 0)
-- Dependencies: 236
-- Name: Series_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Series_id_seq" OWNED BY public."Series".id;


--
-- TOC entry 233 (class 1259 OID 33257)
-- Name: TrainingSession; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TrainingSession" (
    id integer NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL,
    "routineName" text NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."TrainingSession" OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 33273)
-- Name: TrainingSessionExercise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TrainingSessionExercise" (
    id integer NOT NULL,
    "exerciseId" integer NOT NULL,
    "sessionId" integer NOT NULL,
    "order" integer NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."TrainingSessionExercise" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 33272)
-- Name: TrainingSessionExercise_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TrainingSessionExercise_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TrainingSessionExercise_id_seq" OWNER TO postgres;

--
-- TOC entry 5116 (class 0 OID 0)
-- Dependencies: 234
-- Name: TrainingSessionExercise_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TrainingSessionExercise_id_seq" OWNED BY public."TrainingSessionExercise".id;


--
-- TOC entry 232 (class 1259 OID 33256)
-- Name: TrainingSession_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TrainingSession_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TrainingSession_id_seq" OWNER TO postgres;

--
-- TOC entry 5117 (class 0 OID 0)
-- Dependencies: 232
-- Name: TrainingSession_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TrainingSession_id_seq" OWNED BY public."TrainingSession".id;


--
-- TOC entry 231 (class 1259 OID 33244)
-- Name: Unit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Unit" (
    id integer NOT NULL,
    name text NOT NULL,
    symbol text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Unit" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 33243)
-- Name: Unit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Unit_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Unit_id_seq" OWNER TO postgres;

--
-- TOC entry 5118 (class 0 OID 0)
-- Dependencies: 230
-- Name: Unit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Unit_id_seq" OWNED BY public."Unit".id;


--
-- TOC entry 221 (class 1259 OID 33173)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name text NOT NULL,
    pin text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 33172)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- TOC entry 5119 (class 0 OID 0)
-- Dependencies: 220
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 219 (class 1259 OID 33158)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 4904 (class 2604 OID 33190)
-- Name: Exercise id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Exercise" ALTER COLUMN id SET DEFAULT nextval('public."Exercise_id_seq"'::regclass);


--
-- TOC entry 4906 (class 2604 OID 33203)
-- Name: MuscleGroup id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuscleGroup" ALTER COLUMN id SET DEFAULT nextval('public."MuscleGroup_id_seq"'::regclass);


--
-- TOC entry 4908 (class 2604 OID 33216)
-- Name: Routine id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Routine" ALTER COLUMN id SET DEFAULT nextval('public."Routine_id_seq"'::regclass);


--
-- TOC entry 4910 (class 2604 OID 33230)
-- Name: RoutineSet id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoutineSet" ALTER COLUMN id SET DEFAULT nextval('public."RoutineSet_id_seq"'::regclass);


--
-- TOC entry 4919 (class 2604 OID 33291)
-- Name: Series id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Series" ALTER COLUMN id SET DEFAULT nextval('public."Series_id_seq"'::regclass);


--
-- TOC entry 4914 (class 2604 OID 33260)
-- Name: TrainingSession id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TrainingSession" ALTER COLUMN id SET DEFAULT nextval('public."TrainingSession_id_seq"'::regclass);


--
-- TOC entry 4917 (class 2604 OID 33276)
-- Name: TrainingSessionExercise id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TrainingSessionExercise" ALTER COLUMN id SET DEFAULT nextval('public."TrainingSessionExercise_id_seq"'::regclass);


--
-- TOC entry 4912 (class 2604 OID 33247)
-- Name: Unit id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Unit" ALTER COLUMN id SET DEFAULT nextval('public."Unit_id_seq"'::regclass);


--
-- TOC entry 4902 (class 2604 OID 33176)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 4927 (class 2606 OID 33198)
-- Name: Exercise Exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Exercise"
    ADD CONSTRAINT "Exercise_pkey" PRIMARY KEY (id);


--
-- TOC entry 4930 (class 2606 OID 33211)
-- Name: MuscleGroup MuscleGroup_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuscleGroup"
    ADD CONSTRAINT "MuscleGroup_pkey" PRIMARY KEY (id);


--
-- TOC entry 4934 (class 2606 OID 33242)
-- Name: RoutineSet RoutineSet_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoutineSet"
    ADD CONSTRAINT "RoutineSet_pkey" PRIMARY KEY (id);


--
-- TOC entry 4932 (class 2606 OID 33225)
-- Name: Routine Routine_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Routine"
    ADD CONSTRAINT "Routine_pkey" PRIMARY KEY (id);


--
-- TOC entry 4945 (class 2606 OID 33299)
-- Name: Series Series_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Series"
    ADD CONSTRAINT "Series_pkey" PRIMARY KEY (id);


--
-- TOC entry 4942 (class 2606 OID 33286)
-- Name: TrainingSessionExercise TrainingSessionExercise_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TrainingSessionExercise"
    ADD CONSTRAINT "TrainingSessionExercise_pkey" PRIMARY KEY (id);


--
-- TOC entry 4940 (class 2606 OID 33271)
-- Name: TrainingSession TrainingSession_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TrainingSession"
    ADD CONSTRAINT "TrainingSession_pkey" PRIMARY KEY (id);


--
-- TOC entry 4938 (class 2606 OID 33255)
-- Name: Unit Unit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Unit"
    ADD CONSTRAINT "Unit_pkey" PRIMARY KEY (id);


--
-- TOC entry 4925 (class 2606 OID 33185)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 4922 (class 2606 OID 33171)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4928 (class 1259 OID 33301)
-- Name: MuscleGroup_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "MuscleGroup_name_key" ON public."MuscleGroup" USING btree (name);


--
-- TOC entry 4935 (class 1259 OID 33302)
-- Name: RoutineSet_routineId_order_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "RoutineSet_routineId_order_key" ON public."RoutineSet" USING btree ("routineId", "order");


--
-- TOC entry 4946 (class 1259 OID 33305)
-- Name: Series_sessionExerciseId_order_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Series_sessionExerciseId_order_key" ON public."Series" USING btree ("sessionExerciseId", "order");


--
-- TOC entry 4943 (class 1259 OID 33304)
-- Name: TrainingSessionExercise_sessionId_order_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "TrainingSessionExercise_sessionId_order_key" ON public."TrainingSessionExercise" USING btree ("sessionId", "order");


--
-- TOC entry 4936 (class 1259 OID 33303)
-- Name: Unit_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Unit_name_key" ON public."Unit" USING btree (name);


--
-- TOC entry 4923 (class 1259 OID 33300)
-- Name: User_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_name_key" ON public."User" USING btree (name);


--
-- TOC entry 4947 (class 2606 OID 33306)
-- Name: Exercise Exercise_muscleGroupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Exercise"
    ADD CONSTRAINT "Exercise_muscleGroupId_fkey" FOREIGN KEY ("muscleGroupId") REFERENCES public."MuscleGroup"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4949 (class 2606 OID 33321)
-- Name: RoutineSet RoutineSet_exerciseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoutineSet"
    ADD CONSTRAINT "RoutineSet_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES public."Exercise"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4950 (class 2606 OID 33316)
-- Name: RoutineSet RoutineSet_routineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoutineSet"
    ADD CONSTRAINT "RoutineSet_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES public."Routine"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4948 (class 2606 OID 33311)
-- Name: Routine Routine_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Routine"
    ADD CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4954 (class 2606 OID 33341)
-- Name: Series Series_sessionExerciseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Series"
    ADD CONSTRAINT "Series_sessionExerciseId_fkey" FOREIGN KEY ("sessionExerciseId") REFERENCES public."TrainingSessionExercise"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4955 (class 2606 OID 33346)
-- Name: Series Series_unitId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Series"
    ADD CONSTRAINT "Series_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES public."Unit"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4952 (class 2606 OID 33331)
-- Name: TrainingSessionExercise TrainingSessionExercise_exerciseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TrainingSessionExercise"
    ADD CONSTRAINT "TrainingSessionExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES public."Exercise"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4953 (class 2606 OID 33336)
-- Name: TrainingSessionExercise TrainingSessionExercise_sessionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TrainingSessionExercise"
    ADD CONSTRAINT "TrainingSessionExercise_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES public."TrainingSession"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4951 (class 2606 OID 33326)
-- Name: TrainingSession TrainingSession_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TrainingSession"
    ADD CONSTRAINT "TrainingSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 5110 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2026-01-11 04:46:52

--
-- PostgreSQL database dump complete
--

\unrestrict CzsRI6jOnA1wAhGSzHa50hZDMbGxA0R2gGGD2ZYNzPU5DYJaKxM0V8zGYeZ5OE4

