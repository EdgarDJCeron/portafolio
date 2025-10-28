// backend/routes/experiencia.js
import { Router } from "express";
import * as ctrl from "../controllers/experienciaController.js";

// Ajusta estos imports a tus middlewares reales
import { requiereAuth, requiereAdmin } from "../middlewares/auth.js";

const router = Router();

// Público
router.get("/", ctrl.listarPublico);

// Admin
router.get("/admin", requiereAuth, requiereAdmin, ctrl.listarAdmin);
router.post("/", requiereAuth, requiereAdmin, ctrl.crear);
router.put("/:id", requiereAuth, requiereAdmin, ctrl.actualizar);
router.delete("/:id", requiereAuth, requiereAdmin, ctrl.eliminar);

export default router;
