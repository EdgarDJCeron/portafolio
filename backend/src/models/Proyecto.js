import mongoose from "mongoose";

const ProyectoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"]
    },
    urlRepositorio: {
      type: String,
      trim: true
    },
    urlDemo: {
      type: String,
      trim: true
    },
    etiquetas: {
      type: [String],
      default: []
    },
    imagenDestacada: {
      type: String,
      trim: true
    },
    publicado: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const Proyecto = mongoose.model("Proyecto", ProyectoSchema);
