import { Router } from "express";
import { Usuario } from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

/**
 * Registro de usuario (solo para bootstrap; luego limitamos a admin).
 * En producción, lo ideal es crear el primer admin manualmente y
 * cerrar esta ruta o protegerla.
 */
router.post("/registro", async (req, res) => {
  try {
    const { nombre, email, contraseña, rol } = req.body;

    if (!nombre || !email || !contraseña) {
      return res.status(400).json({ mensaje: "Faltan campos requeridos" });
    }

    const yaExiste = await Usuario.findOne({ email });
    if (yaExiste) {
      return res.status(409).json({ mensaje: "El email ya está registrado" });
    }

    const hash = await bcrypt.hash(contraseña, 10);

    const usuario = await Usuario.create({
      nombre,
      email,
      contraseñaHash: hash,
      rol: rol === "admin" ? "admin" : "usuario"
    });

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (err) {
    return res.status(500).json({ mensaje: "Error en el servidor", error: err.message });
  }
});

/** Login */
router.post("/login", async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    const ok = await usuario.validarContraseña(contraseña);
    if (!ok) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      mensaje: "Login exitoso",
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol }
    });
  } catch (err) {
    return res.status(500).json({ mensaje: "Error en el servidor", error: err.message });
  }
});

export default router;
