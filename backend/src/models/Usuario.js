import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UsuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true
    },
    contraseñaHash: {
      type: String,
      required: true
    },
    rol: {
      type: String,
      enum: ["admin", "usuario"],
      default: "usuario"
    }
  },
  { timestamps: true }
);

// Método de ayuda para comparar contraseña
UsuarioSchema.methods.validarContraseña = async function (contraseñaPlano) {
  return bcrypt.compare(contraseñaPlano, this.contraseñaHash);
};

// Hook para hashear contraseña si cambia
UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("contraseñaHash")) return next();
  next();
});

export const Usuario = mongoose.model("Usuario", UsuarioSchema);
