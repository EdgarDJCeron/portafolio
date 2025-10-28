# 🚀 Comandos Rápidos para Deployment

## Generar JWT Secret
```bash
cd backend
npm run generate-secret
```

## Deploy Frontend a Vercel (Primera vez)
```bash
cd frontend
npm install -g vercel
vercel
```

## Deploy Frontend a Producción
```bash
cd frontend
vercel --prod
```

## Verificar Backend
```bash
# PowerShell
Invoke-WebRequest -Uri "https://tu-backend.onrender.com/api/health"

# O en el navegador:
https://tu-backend.onrender.com/api/health
```

## Ver variables de entorno locales
```bash
# Backend
cd backend
type .env

# Frontend  
cd frontend
type .env
```

## Crear archivos .env locales (primera vez)

### Backend (.env)
```bash
cd backend
copy .env.example .env
# Luego edita .env con tus valores reales
```

### Frontend (.env)
```bash
cd frontend
copy .env.example .env
# Luego edita .env con tu URL de backend
```

## Git - Subir cambios
```bash
git add .
git commit -m "Preparado para deployment"
git push origin main
```

## Reinstalar dependencias
```bash
# Backend
cd backend
Remove-Item -Recurse -Force node_modules
npm install

# Frontend
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
```
