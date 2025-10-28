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

// Configuración de CORS para producción
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL || "https://tu-dominio.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
}));

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
