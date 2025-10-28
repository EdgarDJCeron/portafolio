import "dotenv/config";
import app from "./app.js";
import { conectarDB } from "./config/db.js";

const PORT = process.env.PORT || 4000;

async function iniciar() {
  await conectarDB();
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

iniciar();
