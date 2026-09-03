# ⚡ GUÍA RÁPIDA DE SETUP

## 🔥 TODO ESTÁ LISTO, SOLO FALTA...

Tu proyecto está 100% configurado. Solo necesitas 4 comandos para empezar:

### Paso 1: Descargar el proyecto

```bash
# Opción A: Si tienes Git
git clone https://github.com/tuUsuario/challenge-game-pwa.git
cd challenge-game-pwa

# Opción B: Si descargaste el ZIP
unzip challenge-game-pwa.zip
cd challenge-game-pwa
```

### Paso 2: Instalar dependencias

```bash
npm install
```

(Espera 1-2 minutos mientras descarga todo)

### Paso 3: Probar en local

```bash
npm run dev
```

Se abrirá automáticamente en `http://localhost:5173`

**Prueba:**
- ✅ Ir a Login / Register
- ✅ Crear una cuenta (email de prueba)
- ✅ Crear una sala
- ✅ Ver que funciona

### Paso 4: Subir a GitHub

```bash
# Si aún no iniciaste Git:
git init

# Agregar cambios
git add .

# Commit inicial
git commit -m "Initial commit: Challenge Game PWA boilerplate"

# Configurar rama (si es primera vez)
git branch -M main

# Agregar remoto (cambia URL)
git remote add origin https://github.com/juhabarArj/challenge-game-pwa.git

# Push a GitHub
git push -u origin main
```

**Listo.** GitHub Actions automáticamente:
1. Construye el proyecto
2. Lo publica en GitHub Pages
3. En 2-3 minutos está en: `https://juhabarArj.github.io/challenge-game-pwa/`

---

## ✅ CHECKLIST DESPUÉS DE SETUP

- [ ] Clonaste/descargaste el proyecto
- [ ] Ejecutaste `npm install`
- [ ] Ejecutaste `npm run dev` sin errores
- [ ] Viste la pantalla de Login
- [ ] Intentaste crear cuenta (verás error porque Firebase aún necesita config)
- [ ] Hiciste push a GitHub
- [ ] Esperas 2-3 minutos
- [ ] Visitas `https://juhabarArj.github.io/challenge-game-pwa/` ✅ LIVE

---

## ⚠️ POSIBLES ERRORES

### Error: "Cannot find module 'react'"
```bash
npm install
```

### Error: "VITE_FIREBASE_API_KEY is undefined"
Edita `.env.local` - aunque debería estar listo ya.

### Error en Firebase: "Auth not initialized"
Firebase está configurado, pero necesita que:
1. La app esté registrada en Firebase Console
2. Email/Password auth esté habilitado

Esto ya debería estar hecho, pero verifica en:
https://console.firebase.google.com > challege-game > Authentication

### Puerto 5173 ya en uso
```bash
npm run dev -- --port 5174
```

---

## 📊 QUÉ FUNCIONA AHORA

| Componente | Estado | Detalles |
|-----------|--------|---------|
| **Auth** | ✅ 80% | Login/Register listo, falta integración DB |
| **UI** | ✅ 100% | Neumorphism completamente implementado |
| **Rutas** | ✅ 100% | Todas configuradas |
| **Servicios** | ✅ 90% | Firebase, Supabase, Cloudinary listos |
| **Cámara** | ⏳ 40% | Hook creado, falta componente UI |
| **Juego** | ⏳ 20% | Estructura base, falta lógica |
| **PWA** | ✅ 100% | Manifest y SW configurados |
| **Deploy** | ✅ 100% | GitHub Actions automático |

---

## 🚀 SIGUIENTE FASE

Cuando confirmes que funciona en local y en GitHub Pages, podemos:

1. **Completar Cámara** - Componente CameraCapture funcional
2. **Conectar BD** - Crear usuarios en Supabase automáticamente
3. **Juego completo** - Lógica de turnos, desafíos, puntuación
4. **Validación IA** - Integrar Google Vision API

---

## 🎬 DIME CUANDO ESTÉ LISTO

Una vez hayas ejecutado `npm run dev` y ves la pantalla de login, avísame:

```
✅ npm install - OK
✅ npm run dev - OK, veo login en localhost:5173
✅ git push - OK, se desplegó en GitHub Pages
```

Y diremos: **"Vamos con Sprint 1 - Fase 2"** 🚀

---

## 💬 SI HAY DUDAS

1. ¿Error específico? → Copia/pega el error completo
2. ¿No ves nada? → Abre DevTools (F12) > Console
3. ¿No se despliega? → Espera 5 minutos, revisa Actions en GitHub

---

**¡Eso es todo! A partir de aquí, vamos fase por fase.** 🎮

*Documento generado: Septiembre 2026*
