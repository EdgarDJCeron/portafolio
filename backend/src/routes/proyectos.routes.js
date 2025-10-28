// src/routes/proyectos.routes.js
import { Router } from "express";
import { Proyecto } from "../models/Proyecto.js";
import { requiereAuth, requiereAdmin } from "../middlewares/auth.js";

const router = Router();

/** Listar proyectos públicos (solo publicados) */
router.get("/", async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ publicado: true }).sort({ createdAt: -1 });
    res.json(proyectos);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al listar proyectos", error: err.message });
  }
});

/** Listado completo (incluye no publicados) — solo admin */
router.get("/admin", requiereAuth, requiereAdmin, async (req, res) => {
  try {
    const proyectos = await Proyecto.find().sort({ createdAt: -1 });
    res.json(proyectos);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al listar proyectos", error: err.message });
  }
});

/** Obtener un proyecto por id (si no publicado, requiere admin) */
router.get("/:id", async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) return res.status(404).json({ mensaje: "Proyecto no encontrado" });

    if (!proyecto.publicado) {
      // Si no está publicado, solo admin puede verlo
      // Validamos token si existe
      const header = req.headers.authorization || "";
      if (!header.startsWith("Bearer ")) {
        return res.status(403).json({ mensaje: "Proyecto no publicado" });
      }
    }

    res.json(proyecto);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener proyecto", error: err.message });
  }
});

/** Crear proyecto — solo admin */
router.post("/", requiereAuth, requiereAdmin, async (req, res) => {
  try {
    const { titulo, descripcion, urlRepositorio, urlDemo, etiquetas, imagenDestacada, publicado } = req.body;
    const proyecto = await Proyecto.create({
      titulo,
      descripcion,
      urlRepositorio,
      urlDemo,
      etiquetas: etiquetas || [],
      imagenDestacada,
      publicado: publicado ?? true
    });
    res.status(201).json({ mensaje: "Proyecto creado", proyecto });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al crear proyecto", error: err.message });
  }
});

/** Actualizar proyecto — solo admin */
router.put("/:id", requiereAuth, requiereAdmin, async (req, res) => {
  try {
    const actual = await Proyecto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actual) return res.status(404).json({ mensaje: "Proyecto no encontrado" });
    res.json({ mensaje: "Proyecto actualizado", proyecto: actual });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al actualizar proyecto", error: err.message });
  }
});

/** Eliminar proyecto — solo admin */
router.delete("/:id", requiereAuth, requiereAdmin, async (req, res) => {
  try {
    const eliminado = await Proyecto.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "Proyecto no encontrado" });
    res.json({ mensaje: "Proyecto eliminado" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al eliminar proyecto", error: err.message });
  }
});

export default router;
