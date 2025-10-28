# 🌐 Cómo Compartir tu Portafolio

## 📌 **URL Actual de Producción**

Tu sitio está desplegado en Vercel, pero cada deployment genera una URL diferente. Para tener una URL permanente que puedas compartir, necesitas configurar un dominio en Vercel.

---

## 🔗 **Opción 1: Usar el Dominio Permanente de Vercel (RECOMENDADO)**

Vercel te asigna un dominio permanente basado en el nombre de tu proyecto. Para obtenerlo:

### Pasos:

1. **Ve a [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Selecciona tu proyecto** "portafolio"

3. **Ve a la pestaña "Settings"**

4. **En el menú lateral, selecciona "Domains"**

5. **Verás tu dominio de producción permanente**, algo como:
   ```
   portafolio.vercel.app
   ```
   o
   ```
   tu-usuario-portafolio.vercel.app
   ```

6. **Copia ese dominio** - Esta es tu URL permanente que puedes compartir

### Alternativa rápida desde la terminal:

```bash
cd frontend
vercel alias
```

Este comando te mostrará todos los dominios asignados a tu proyecto.

---

## 🎯 **Opción 2: Configurar un Dominio Personalizado (PROFESIONAL)**

Si tienes un dominio propio (como `edgarceron.com`), puedes configurarlo en Vercel:

### Pasos:

1. **Ve a Vercel Dashboard → Tu proyecto → Settings → Domains**

2. **Click en "Add Domain"**

3. **Ingresa tu dominio personalizado** (ej: `edgarceron.com` o `www.edgarceron.com`)

4. **Vercel te dará instrucciones para configurar el DNS:**
   - Si usas Vercel DNS (recomendado):
     - Vercel configurará todo automáticamente
   - Si usas otro proveedor (GoDaddy, Namecheap, etc.):
     - Deberás agregar un registro A o CNAME en tu proveedor

### Dominios gratuitos que puedes usar:

- [Freenom](https://www.freenom.com) - Dominios .tk, .ml, .ga, .cf, .gq (gratuitos)
- [GitHub Student Pack](https://education.github.com/pack) - Si eres estudiante, obtienes dominios .me gratis y más beneficios

---

## 📋 **Opción 3: Obtener la URL del Último Deployment**

Si solo necesitas compartir el link temporalmente:

### Desde la Terminal:

```bash
cd frontend
vercel ls
```

Esto te mostrará todos los deployments. El primero de la lista es el más reciente.

### Desde el Dashboard:

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. En la pestaña "Deployments" verás todos los deployments
4. El deployment marcado con "Production" es el actual
5. Copia la URL que aparece

**Último deployment:** `https://portafolio-q8qwyzy0m-edgardjcerons-projects.vercel.app`

---

## ✅ **Configuración Recomendada para Compartir**

### **PASO 1: Obtener tu dominio permanente de Vercel**

1. Ve a Vercel Dashboard
2. Selecciona "portafolio"
3. Ve a Settings → Domains
4. Copia el dominio permanente (ej: `portafolio-edgarceron.vercel.app`)

### **PASO 2: Actualizar enlaces en tu perfil**

Una vez que tengas tu URL permanente, actualízala en:

- ✅ **GitHub:** En la descripción de tu repositorio
- ✅ **LinkedIn:** En la sección "Proyectos" o "Sitio web"
- ✅ **CV:** En la sección de contacto o proyectos
- ✅ **Twitter/X:** En tu bio
- ✅ **Correos:** En tu firma de email

### **PASO 3: Opcional - Redirect del dominio**

Si quieres que todas las URLs antiguas redirijan a tu dominio principal:

1. Ve a Vercel Dashboard → Tu proyecto → Settings → Domains
2. Marca tu dominio preferido como "Primary Domain"
3. Vercel redirigirá automáticamente todas las demás URLs a esta

---

## 🎨 **Personalizar la Vista Previa (Open Graph)**

Cuando compartas tu link en redes sociales, querrás que se vea bien. Agrega estas etiquetas en `frontend/index.html`:

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://tu-dominio.vercel.app">
<meta property="og:title" content="Portafolio - Edgar Ceron">
<meta property="og:description" content="Desarrollador de Automatizaciones con Python y Full-Stack Developer">
<meta property="og:image" content="https://tu-dominio.vercel.app/img/perfil.jpeg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://tu-dominio.vercel.app">
<meta property="twitter:title" content="Portafolio - Edgar Ceron">
<meta property="twitter:description" content="Desarrollador de Automatizaciones con Python y Full-Stack Developer">
<meta property="twitter:image" content="https://tu-dominio.vercel.app/img/perfil.jpeg">
```

---

## 🚀 **Comando Rápido para Ver tu URL Permanente**

```bash
cd frontend
vercel inspect --wait
```

Esto te mostrará toda la información del deployment actual, incluyendo las URLs.

---

## 📝 **Resumen**

### **Para compartir AHORA (temporal):**
```
https://portafolio-q8qwyzy0m-edgardjcerons-projects.vercel.app
```

### **Para compartir SIEMPRE (permanente):**
1. Ve a Vercel Dashboard → portafolio → Settings → Domains
2. Copia el dominio permanente (algo como `portafolio.vercel.app`)
3. Usa ese link en tu LinkedIn, CV, GitHub, etc.

### **Para dominio profesional:**
1. Compra/obtén un dominio (ej: `edgarceron.com`)
2. Configúralo en Vercel Dashboard → Domains
3. Comparte tu dominio personalizado

---

## 💡 **Tips Profesionales**

1. **Usa el dominio de Vercel si no tienes uno propio** - Es gratis y se ve profesional
2. **Agrega Analytics** - Vercel tiene analytics integrados gratuitos
3. **Monitorea tu sitio** - Usa [UptimeRobot](https://uptimerobot.com/) para recibir alertas si tu sitio cae
4. **Haz A/B testing** - Vercel permite crear branches preview para probar cambios
5. **Custom 404** - Crea una página 404 personalizada para mejor UX

---

## 🎉 **¡Tu portafolio ya está listo para compartir!**

Recuerda que cada vez que hagas `git push`, Vercel automáticamente actualizará tu sitio en producción. ¡No necesitas hacer nada más! 🚀
