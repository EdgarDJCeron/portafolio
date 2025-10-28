import mongoose from "mongoose";

export async function conectarDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Falta la variable MONGODB_URI en el .env");
    process.exit(1);
  }
  try {
    await mongoose.connect(uri);
    console.log("Conexión a MongoDB exitosa");
  } catch (err) {
    console.error("Error conectando a MongoDB:", err.message);
    process.exit(1);
  }
}
