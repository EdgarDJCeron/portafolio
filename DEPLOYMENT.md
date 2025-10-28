# 🚀 Guía de Deployment - Portafolio

## 📋 Prerequisitos

- Cuenta en [Render](https://render.com)
- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Repositorio en GitHub

---

## 🗄️ **PASO 1: Configurar MongoDB Atlas**

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito (si no tienes uno)
3. Ve a **Database Access** → Crea un usuario con contraseña
4. Ve a **Network Access** → Agrega `0.0.0.0/0` (permitir acceso desde cualquier IP)
5. Ve a **Database** → **Connect** → Copia la cadena de conexión
   - Formato: `mongodb+srv://usuario:password@cluster.mongodb.net/portafolio`
6. Guarda esta cadena, la necesitarás para Render

---

## 🖥️ **PASO 2: Desplegar Backend en Render**

### Opción A: Desde el Dashboard de Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Configura el servicio:
   - **Name**: `portafolio-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. **Variables de Entorno** (Environment Variables):
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/portafolio
   JWT_SECRET=tu_secreto_super_seguro_aleatorio_aqui_123456
   ```
   
   ⚠️ **IMPORTANTE**: 
   - Reemplaza `MONGODB_URI` con tu cadena de MongoDB Atlas
   - Genera un `JWT_SECRET` único y seguro
   - Para generar un JWT_SECRET seguro, puedes usar: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

6. Click en **"Create Web Service"**
7. Espera a que termine el despliegue (5-10 minutos)
8. Copia la URL de tu backend (ej: `https://portafolio-backend-xxxx.onrender.com`)

### Verificar el Backend

Una vez desplegado, verifica que funciona:
```
https://tu-backend.onrender.com/api/health
```
Deberías ver: `{"ok": true, "mensaje": "Servidor operativo"}`

---

## 🌐 **PASO 3: Desplegar Frontend en Vercel**

### Desde la Terminal

1. Abre una terminal en la carpeta del proyecto
2. Instala Vercel CLI (si no lo tienes):
   ```bash
   npm i -g vercel
   ```

3. Ve a la carpeta frontend:
   ```bash
   cd frontend
   ```

4. Ejecuta Vercel:
   ```bash
   vercel
   ```

5. Sigue las instrucciones:
   - **Set up and deploy?** → `Y`
   - **Which scope?** → Selecciona tu cuenta
   - **Link to existing project?** → `N`
   - **What's your project's name?** → `portafolio` (o el nombre que quieras)
   - **In which directory is your code located?** → `./` (presiona Enter)
   - **Want to override the settings?** → `N`

6. Vercel te dará una URL de preview. Para producción:
   ```bash
   vercel --prod
   ```

### Configurar Variables de Entorno en Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega:
   ```
   VITE_API_URL=https://tu-backend.onrender.com
   ```
   (Usa la URL de tu backend de Render)

5. **Redeploy** el proyecto para aplicar los cambios:
   - Ve a **Deployments**
   - Click en los tres puntos del último deployment
   - **Redeploy**

---

## 🔄 **PASO 4: Actualizar CORS en el Backend**

1. Regresa a Render Dashboard
2. Ve a tu servicio backend
3. Ve a **Environment**
4. Agrega una nueva variable:
   ```
   FRONTEND_URL=https://tu-dominio.vercel.app
   ```
   (Usa tu URL de Vercel)

5. El servicio se redespliegará automáticamente

---

## ✅ **PASO 5: Verificación Final**

### Verificar Backend
```bash
curl https://tu-backend.onrender.com/api/health
```

### Verificar Frontend
1. Abre tu URL de Vercel en el navegador
2. Verifica que cargue correctamente
3. Prueba el login/registro
4. Verifica que las peticiones al backend funcionen

---

## 🔧 **Comandos Útiles**

### Para actualizar el Frontend
```bash
cd frontend
vercel --prod
```

### Para ver logs del Backend
En Render Dashboard → tu servicio → pestaña "Logs"

### Para redeploy del Backend
En Render Dashboard → tu servicio → "Manual Deploy" → "Deploy latest commit"

---

## 🐛 **Solución de Problemas Comunes**

### Error de CORS
- Verifica que `FRONTEND_URL` esté configurado en Render
- Asegúrate de que la URL no termine en `/`

### Error de conexión a MongoDB
- Verifica que la IP `0.0.0.0/0` esté permitida en MongoDB Atlas
- Verifica que `MONGODB_URI` esté correctamente configurada
- Verifica que el usuario y contraseña sean correctos

### Frontend no se conecta al Backend
- Verifica que `VITE_API_URL` esté configurado en Vercel
- Asegúrate de haber hecho redeploy después de agregar la variable

### El backend se duerme (Render Free Tier)
- Render duerme los servicios gratuitos después de 15 minutos de inactividad
- La primera petición después de dormir puede tardar 30-60 segundos
- Considera usar un servicio como [UptimeRobot](https://uptimerobot.com/) para mantenerlo activo

---

## 📝 **Notas Importantes**

1. **Render Free Tier**: El backend puede tardar en responder en la primera petición después de inactividad
2. **Variables de Entorno**: Nunca subas archivos `.env` a GitHub
3. **JWT_SECRET**: Usa un secreto fuerte y único para producción
4. **MongoDB**: Configura backups regulares en MongoDB Atlas
5. **Dominios Custom**: Puedes configurar dominios personalizados tanto en Render como en Vercel

---

## 🎉 **¡Listo!**

Tu portafolio ahora está desplegado en:
- **Backend**: https://tu-backend.onrender.com
- **Frontend**: https://tu-dominio.vercel.app

Para futuras actualizaciones, solo haz `git push` y los servicios se actualizarán automáticamente.
