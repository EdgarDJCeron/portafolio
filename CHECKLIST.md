# ✅ Checklist de Deployment

## Antes de empezar
- [ ] Cuenta en MongoDB Atlas creada
- [ ] Cuenta en Render creada  
- [ ] Cuenta en Vercel creada
- [ ] Código subido a GitHub

## MongoDB Atlas
- [ ] Cluster creado
- [ ] Usuario de base de datos creado
- [ ] Network Access configurado (0.0.0.0/0)
- [ ] Connection string copiado

## Backend (Render)
- [ ] Web Service creado y conectado a GitHub
- [ ] Variables de entorno configuradas:
  - [ ] NODE_ENV=production
  - [ ] PORT=10000
  - [ ] MONGODB_URI=(tu cadena de MongoDB)
  - [ ] JWT_SECRET=(generado con npm run generate-secret)
- [ ] Deployment exitoso
- [ ] URL del backend copiada
- [ ] Endpoint /api/health verificado

## Frontend (Vercel)
- [ ] Proyecto desplegado con Vercel CLI o Dashboard
- [ ] Variable de entorno configurada:
  - [ ] VITE_API_URL=(URL de tu backend en Render)
- [ ] Redeploy ejecutado después de agregar variable
- [ ] URL de Vercel copiada
- [ ] Sitio carga correctamente

## Configuración Final
- [ ] FRONTEND_URL agregada en Render con la URL de Vercel
- [ ] CORS funcionando correctamente
- [ ] Login/Registro funcionan
- [ ] CRUD de proyectos funciona
- [ ] Subida de imágenes funciona

## 🎉 ¡Deployment Completo!
