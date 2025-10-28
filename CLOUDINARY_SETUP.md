# 📸 Configurar Cloudinary para Imágenes

## ¿Por qué Cloudinary?

Render (plan gratuito) tiene un sistema de archivos **efímero**, lo que significa que cualquier archivo que subas (imágenes) se borra cada vez que hay un redeploy. **Cloudinary** es un servicio gratuito de almacenamiento de imágenes en la nube que resuelve este problema.

---

## 🚀 PASO 1: Crear Cuenta en Cloudinary

1. Ve a [https://cloudinary.com/users/register_free](https://cloudinary.com/users/register_free)
2. Regístrate con tu email (es gratis - 25GB de almacenamiento)
3. Completa el registro y verifica tu email

---

## 🔑 PASO 2: Obtener tus Credenciales

1. Una vez dentro, ve al **Dashboard**
2. Verás una sección llamada **"Account Details"** o **"Product Environment Credentials"**
3. Copia los siguientes valores:
   - **Cloud Name** (ej: `dxxx12345`)
   - **API Key** (ej: `123456789012345`)
   - **API Secret** (ej: `aBcDeFgHiJkLmNoPqRsTuV`) - Click en "Reveal" para verlo

---

## ⚙️ PASO 3: Configurar Variables en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Selecciona tu servicio backend
3. Ve a **Environment** en el menú izquierdo
4. Agrega estas 3 variables de entorno:

```
CLOUDINARY_CLOUD_NAME=tu_cloud_name_aqui
CLOUDINARY_API_KEY=tu_api_key_aqui
CLOUDINARY_API_SECRET=tu_api_secret_aqui
```

5. Click en **"Save Changes"**
6. Render se redespliegará automáticamente (~2 minutos)

---

## 📤 PASO 4: Hacer Push de los Cambios

Los cambios de código ya están listos. Solo necesitas subirlos a GitHub:

```bash
git add .
git commit -m "Add: Cloudinary para almacenamiento de imágenes"
git push origin main
```

Render detectará el cambio y se redespliegará automáticamente.

---

## ✅ PASO 5: Verificar que Funciona

1. Espera a que Render termine el deployment (~2-3 minutos)
2. Ve a tu portafolio: https://portafolio-roan-tau-77.vercel.app
3. Inicia sesión como admin
4. Ve a la sección de proyectos
5. Intenta subir una nueva imagen
6. La imagen ahora se guardará en Cloudinary y **no se borrará** con los redeploys

---

## 🎨 Beneficios de Cloudinary

- ✅ **Persistencia**: Las imágenes nunca se borran
- ✅ **Optimización automática**: Cloudinary optimiza las imágenes
- ✅ **CDN global**: Carga rápida desde cualquier parte del mundo
- ✅ **Transformaciones**: Puedes redimensionar imágenes on-the-fly
- ✅ **25GB gratis**: Más que suficiente para tu portafolio

---

## 📋 Resumen de Cambios Realizados

### Backend:
- ✅ Instalado `cloudinary` y `multer-storage-cloudinary`
- ✅ Creado `backend/src/config/cloudinary.js`
- ✅ Actualizado `backend/src/routes/upload.routes.js`
- ✅ Actualizado `.env.example` con las nuevas variables

### Frontend:
- ✅ Actualizado `ProyectosDestacados.jsx` para soportar URLs de Cloudinary

---

## 🔧 Comandos Rápidos

### Para hacer push de los cambios:
```bash
git add .
git commit -m "Add: Cloudinary integration"
git push origin main
```

### Para verificar el estado de Render:
Ve a: https://dashboard.render.com/ → Tu servicio → Logs

---

## 🐛 Solución de Problemas

### Las imágenes viejas no se ven:
**Solución**: Las imágenes que subiste antes se perdieron. Necesitas volver a subirlas después de configurar Cloudinary.

### Error "Cloud name is required":
**Solución**: Verifica que agregaste las variables `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` y `CLOUDINARY_API_SECRET` en Render.

### Error al subir imágenes:
**Solución**: 
1. Verifica que las credenciales de Cloudinary sean correctas
2. Revisa los logs en Render Dashboard → Logs
3. Asegúrate de que Render terminó el redeploy

---

## 📸 Cómo se Verán las URLs

### Antes (sistema local - se borraban):
```
/uploads/proyecto-1234567890.jpg
```

### Ahora (Cloudinary - permanentes):
```
https://res.cloudinary.com/dxxx12345/image/upload/v1234567890/portafolio/filename.jpg
```

---

## 🎉 ¡Listo!

Una vez que configures las variables en Render y hagas push, tu portafolio estará listo para subir imágenes que **nunca se borrarán**. 🚀
