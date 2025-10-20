async function connectPostgre(params) {
  try {
    await prisma.$connect();
    console.log("✅ Conexión a la base de datos exitosa");
  } catch (err) {
    console.error("❌ Error al conectar a la base de datos:", err);
  }
}

connectPostgre();
