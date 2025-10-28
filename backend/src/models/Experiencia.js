// backend/models/Experiencia.js
import { Schema, model } from "mongoose";

const ExperienciaSchema = new Schema(
  {
    // "work" | "education"
    tipo: { type: String, enum: ["work", "education"], required: true },

    titulo: { type: String, required: true },         // Ej: "Senior Full-Stack Developer"
    empresa: { type: String, default: "" },           // Ej: "Tech Solutions Inc." o universidad
    ubicacion: { type: String, default: "" },

    fechaInicio: { type: Date, required: true },      // ISO date
    fechaFin: { type: Date },                         // null si "actual" === true
    actual: { type: Boolean, default: false },

    bullets: { type: [String], default: [] },         // viñetas
    etiquetas: { type: [String], default: [] },       // chips (React, Node.js, etc.)

    publicado: { type: Boolean, default: true },      // mostrar en público
    orden: { type: Number, default: 0 },              // para ordenar manualmente si quieres
  },
  { timestamps: true }
);

export default model("Experiencia", ExperienciaSchema);
