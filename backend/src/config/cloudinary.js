import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configurar storage de Multer para Cloudinary
export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portafolio', // Carpeta en Cloudinary donde se guardarán las imágenes
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, height: 750, crop: 'limit' }] // Optimiza las imágenes
  }
});

export default cloudinary;
