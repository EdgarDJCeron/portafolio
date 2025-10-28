import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import authRoutes from "./routes/auth.routes.js";
import proyectosRoutes from "./routes/proyectos.routes.js";
import experienciaRoutes from "./routes/experiencia.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middlewares generales
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Servir archivos estáticos (imágenes subidas)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/proyectos", proyectosRoutes);
app.use("/api/experiencia", experienciaRoutes);
app.use("/api/upload", uploadRoutes);


// Salud del servidor
app.get("/api/health", (req, res) => {
  res.json({ ok: true, mensaje: "Servidor operativo" });
});

export default app;
