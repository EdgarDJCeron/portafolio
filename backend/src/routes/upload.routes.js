import { Router } from 'express';
import multer from 'multer';
import { requiereAuth, requiereAdmin } from '../middlewares/auth.js';
import { storage } from '../config/cloudinary.js';
import cloudinary from '../config/cloudinary.js';

const router = Router();

// Configurar multer con Cloudinary
const fileFilter = (req, file, cb) => {
  // Aceptar solo imágenes
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB máximo
  }
});

// Endpoint para subir imagen
router.post('/', requiereAuth, requiereAdmin, upload.single('imagen'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
    }

    // Cloudinary devuelve la URL en req.file.path
    const url = req.file.path;
    const filename = req.file.filename;
    
    res.json({ url, filename });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
});

// Endpoint para eliminar imagen
router.delete('/:filename', requiereAuth, requiereAdmin, async (req, res) => {
  try {
    const { filename } = req.params;
    
    // El filename en Cloudinary incluye la carpeta: portafolio/filename
    const publicId = filename.includes('/') ? filename : `portafolio/${filename}`;
    
    await cloudinary.uploader.destroy(publicId);
    res.json({ mensaje: 'Imagen eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    res.status(500).json({ error: 'Error al eliminar la imagen' });
  }
});

export default router;
