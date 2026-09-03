# 🚀 INSTRUCCIONES - REPO: challege-game

**Tu repositorio GitHub:** `challege-game`  
**Tu usuario:** `juhabarArj`  
**URL del repo:** `https://github.com/juhabarArj/challege-game`  
**URL final (GitHub Pages):** `https://juhabarArj.github.io/challege-game/`

---

## ⚡ PASOS RÁPIDOS (4 minutos)

### 1️⃣ Abre Terminal en la carpeta del proyecto

```bash
cd challenge-game-pwa
```

### 2️⃣ Instala dependencias

```bash
npm install
```

(Espera 1-2 minutos ☕)

### 3️⃣ Prueba en local

```bash
npm run dev
```

Verás:
```
VITE v5.0.8 ready in XXX ms

➜  Local:   http://localhost:5173/challege-game/
```

✅ **Abre el navegador y ve la pantalla de Login**

### 4️⃣ Sube a GitHub

```bash
# Configura Git si es primera vez
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Inicializa si no está hecho
git init
git branch -M main

# Agrega todo
git add .

# Commit
git commit -m "Initial commit: Challenge Game PWA"

# Añade el remoto (IMPORTANTE: usa tu repo)
git remote add origin https://github.com/juhabarArj/challege-game.git

# Push a GitHub
git push -u origin main
```

---

## ✅ DESPUÉS DEL PUSH

1. Espera 2-3 minutos
2. GitHub Actions se ejecuta automáticamente
3. Ve a: https://github.com/juhabarArj/challege-game/actions
4. Verás el workflow "Deploy to GitHub Pages" en verde ✅
5. Tu app está LIVE en: **https://juhabarArj.github.io/challege-game/**

---

## 📋 CHECKLIST COMPLETO

- [ ] `npm install` ejecutado sin errores
- [ ] `npm run dev` abre en localhost:5173/challege-game/
- [ ] Ves pantalla de Login ✅
- [ ] `git add .` ejecutado
- [ ] `git commit -m "..."` ejecutado
- [ ] `git remote add origin https://github.com/juhabarArj/challege-game.git` ejecutado
- [ ] `git push -u origin main` ejecutado sin errores
- [ ] Espera 2-3 minutos
- [ ] GitHub Actions completado (Actions tab en verde)
- [ ] Visita https://juhabarArj.github.io/challege-game/ 
- [ ] Ves la app en vivo ✅

---

## 🔑 INFORMACIÓN CRÍTICA

### URL del Repositorio
```
https://github.com/juhabarArj/challege-game
```

### URL en GitHub Pages
```
https://juhabarArj.github.io/challege-game/
```

### En vite.config.js (ya está configurado)
```javascript
base: '/challege-game/',
```

### En index.html (ya está configurado)
```html
<link rel="manifest" href="/challege-game/manifest.json" />
<link rel="apple-touch-icon" href="/challege-game/icon-192x192.png" />
```

### Service Worker (ya está configurado)
```javascript
navigator.serviceWorker.register('/challege-game/service-worker.js')
```

---

## ⚠️ ERRORES COMUNES

### ❌ "fatal: not a git repository"
**Solución:**
```bash
git init
```

### ❌ "fatal: remote origin already exists"
**Solución:**
```bash
git remote remove origin
git remote add origin https://github.com/juhabarArj/challege-game.git
```

### ❌ "authentication failed"
**Solución:**
1. Genera un Personal Access Token en GitHub
2. https://github.com/settings/tokens
3. Usa ese token como contraseña

### ❌ "Port 5173 already in use"
**Solución:**
```bash
npm run dev -- --port 5174
```

### ❌ ".env.local not found"
**Solución:**
- El archivo ya está en la carpeta
- Si no lo ves: `ls -la` (en Mac/Linux) o `dir` (en Windows)

### ❌ No se ve en GitHub Pages
**Solución:**
1. Espera 5 minutos
2. Va a: https://github.com/juhabarArj/challege-game/settings/pages
3. Verifica que está en rama `gh-pages`
4. Refresca navegador (Ctrl+F5)

---

## 🔄 DESPUÉS DEL PRIMER PUSH

Cuando hagas cambios después:

```bash
# Edita archivos normalmente

# Cuando termines:
git add .
git commit -m "Descripción del cambio"
git push

# GitHub Actions automáticamente:
# 1. Construye
# 2. Publica en gh-pages
# 3. ¡Actualiza en 2-3 minutos!
```

---

## 📱 PROBAR EN MÓVIL

Una vez en GitHub Pages:

1. Abre https://juhabarArj.github.io/challege-game/ en móvil
2. Chrome/Edge: Menú (3 puntos) > "Instalar aplicación"
3. ¡Ahora es una app nativa!

---

## 🎯 CONFIRMACIÓN FINAL

Cuando tengas TODO listo (npm run dev + git push), avísame:

```
✅ npm install - OK
✅ npm run dev - OK (veo login en localhost:5173/challege-game/)
✅ git push - OK
✅ GitHub Actions - Completado
✅ GitHub Pages - LIVE en https://juhabarArj.github.io/challege-game/
```

**Entonces:** "Checkpoint completado, iniciamos Sprint 1" 🚀

---

## 📚 DOCUMENTACIÓN

| Archivo | Leer | Descripción |
|---------|------|------------|
| PRIMER_PASO.txt | ⭐⭐⭐ | Instrucciones simples |
| SETUP.md | ⭐⭐⭐ | Guía de 4 pasos |
| README.md | ⭐⭐ | Documentación completa |
| STATUS.md | ⭐ | Estado del proyecto |
| PLAN.md | ⭐ | Plan maestro (referencia) |

---

**¡LISTO! Ahora ejecuta los comandos.** 🚀
