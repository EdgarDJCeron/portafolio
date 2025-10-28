// backend/controllers/experienciaController.js
import Experiencia from "../models/Experiencia.js";

// Público: listado (solo publicados)
export const listarPublico = async (req, res) => {
  try {
    const docs = await Experiencia.find({ publicado: true })
      .sort({ fechaInicio: -1, orden: -1, createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al listar", error: err.message });
  }
};

// --- ADMIN ---
export const listarAdmin = async (req, res) => {
  try {
    const docs = await Experiencia.find().sort({ fechaInicio: -1, orden: -1, createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al listar (admin)", error: err.message });
  }
};

export const crear = async (req, res) => {
  try {
    const doc = await Experiencia.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ mensaje: "Error al crear", error: err.message });
  }
};

export const actualizar = async (req, res) => {
  try {
    const doc = await Experiencia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ mensaje: "Error al actualizar", error: err.message });
  }
};

export const eliminar = async (req, res) => {
  try {
    const doc = await Experiencia.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Eliminado" });
  } catch (err) {
    res.status(400).json({ mensaje: "Error al eliminar", error: err.message });
  }
};
