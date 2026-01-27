# API Backend – Gestión de Sesiones de Entrenamiento

Bienvenido al **Backend de la Web App de Gestión de Sesiones de Entrenamiento**.  
Esta API proporciona toda la lógica de negocio y persistencia de datos necesaria para gestionar usuarios, rutinas,
ejercicios y sesiones de entrenamiento de forma segura y escalable.

---

## 🏋️ Funcionalidades Principales

- Gestión de usuarios y autenticación segura.
- Gestión de ejercicios y grupos musculares.
- Creación y gestión de rutinas personalizadas por usuario.
- Gestión de sets asociados a rutinas de entrenamiento.
- Registro de sesiones de entrenamiento realizadas.
- Consulta del historial de sesiones de entrenamiento.
- API REST pensada para consumo desde frontend web.

---

## 🔐 Autenticación y Seguridad

- Autenticación mediante **JWT** almacenado en **cookies HTTP-only**.
- Hash de contraseñas usando **bcrypt**.
- Protección de cabeceras HTTP con **helmet**.
- Gestión de CORS para entornos frontend/backend separados.
- Logs de peticiones y errores con **winston** y **morgan**.

---

## 🗄️ Base de Datos

- **Base de datos**: PostgreSQL
- **ORM**: Prisma v7

El uso de Prisma permite:

- Tipado fuerte y seguro
- Migraciones controladas
- Modelado claro de relaciones entre entidades
- Acceso eficiente a la base de datos

---

## ⚙️ Tecnologías y Dependencias

- **Runtime**: Node.js
- **Lenguaje**: Javascript
- **Framework**: Express.js
- **ORM**: Prisma Client
- **Base de datos**: PostgreSQL
- **Autenticación**: JWT (cookies)
- **Seguridad**: helmet, cors
- **Logs**: winston, morgan
- **Otros**:
    - bcrypt
    - compression
    - cookie-parser

---

## 🌐 Integración con Frontend

Esta API está diseñada para ser consumida por el frontend de la aplicación web.

Repositorio del frontend:  
👉 https://github.com/SergioFernandez0099/Front_GYM

La comunicación se realiza mediante peticiones HTTPs protegidas con JWT en cookies.

---

## 🛠 Instalación y Ejecución

### Requisitos

- Node.js
- pnpm
- PostgreSQL

---

### Pasos

1. Clonar el repositorio:

```bash
git clone https://github.com/SergioFernandez0099/Back_GYM.git
cd Back_GYM
```

2. Instalar dependencias:

```bash
pnpm install
```

3. Configurar variables de entorno (.env):

```
NODE_ENV=production
PORT=55555
HOST=0.0.0.0
DATABASE_URL="postgresql://user:password@host:5432/schema?schema=public"
BCRYPT_SALT_ROUNDS=19
JWT_SECRET=secred
JWT_EXPIRES_IN=7d
LOG_LEVEL=debbug
PRISMA_HIDE_UPDATE_MESSAGE=true
```

4. Ejecutar migraciones de Prisma:

```bash
pnpm prisma migrate deploy
```

5. Generar cliente de Prisma:

```bash
npx prisma generate
```

6. Compilar proyecto y testear

```bash
pnpm run dev
```

> Tener en cuenta que la compilación genera un directorio llamado "dist" donde se encuentra el proyecto que podemos
> ejecutar.

## 📖 Licencia

Este proyecto es open source. Revisa el archivo `LICENSE` para más detalles.

## 🔗 Enlaces Útiles

- [Repositorio del Frontend](https://github.com/SergioFernandez0099/Front_GYM.git)
- [Prisma](https://github.com/prisma/prisma.git)
