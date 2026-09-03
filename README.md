# 🎮 Challenge Game PWA

Juego multiplayer (2-6 jugadores) con verificación fotográfica por IA. Desafíate con amigos completando retos que deben ser fotografiados y validados.

## 🚀 Características

✅ **Multiplayer** - 2-6 jugadores en línea  
✅ **Categorías** - Junior (12+) y Adultos (18+)  
✅ **Cámara** - Captura fotos de los desafíos  
✅ **Verificación** - Sistema de validación IA  
✅ **Puntuación** - Ranking en tiempo real  
✅ **PWA** - Instalable y funciona offline  
✅ **Neumorphism** - Diseño moderno y suave  

## 🛠️ Tecnologías

- **Frontend:** React 18 + Vite
- **Estilos:** TailwindCSS + Neumorphism
- **Autenticación:** Firebase Auth
- **Base de Datos:** Supabase (PostgreSQL)
- **Almacenamiento:** Cloudinary
- **Validación:** Google Vision API (futuro)
- **Hosting:** GitHub Pages

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- Git
- Cuentas en: Firebase, Supabase, Cloudinary

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/juhabarArj/challenge-game-pwa.git
cd challenge-game-pwa
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copiar `.env.example` a `.env.local` y rellenar:

```bash
cp .env.example .env.local
```

Editar `.env.local` con tus credenciales:

```env
VITE_FIREBASE_API_KEY=tu_clave
VITE_FIREBASE_AUTH_DOMAIN=tu_dominio
# ... etc
```

### 4. Iniciar en desarrollo

```bash
npm run dev
```

Abrirá automáticamente en `http://localhost:5173`

## 🚀 Deploy

### Opción 1: GitHub Pages (Automático)

1. Crear repositorio en GitHub
2. Hacer push a rama `main`
3. GitHub Actions se encarga del resto
4. Disponible en: `https://username.github.io/challenge-game-pwa/`

### Opción 2: Build Manual

```bash
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
challenge-game-pwa/
├── public/              # Assets estáticos
│   ├── manifest.json    # Configuración PWA
│   └── service-worker.js
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── pages/           # Páginas principales
│   ├── services/        # Firebase, Supabase, Cloudinary
│   ├── store/           # Zustand state management
│   ├── hooks/           # Custom hooks
│   ├── App.jsx          # Rutas principales
│   └── index.css        # Estilos globales
├── .env.local          # Variables (NO subir)
├── .env.example        # Plantilla de variables
└── package.json
```

## 🎮 Cómo Jugar

1. **Registrarse** - Email + Contraseña + Categoría
2. **Crear Sala** - Elige Junior o Adultos
3. **Invitar Amigos** - Comparte el código (6 dígitos)
4. **Jugar** - Turno por turno, cada uno debe completar desafíos
5. **Fotografiar** - Prueba del desafío completado
6. **Validar** - Sistema verifica la foto
7. **Puntuación** - Gana puntos y sube en ranking

## 🎨 Estilo Neumorphism

Paleta de colores personalizada:

- **Base:** `#E8EEF1` (gris suave)
- **Primario:** `#6C7DBA` (azul suave)
- **Secundario:** `#A8DADC` (cyan)
- **Acentos:** `#E63946` (rojo), `#06A77D` (verde)

Sombras suaves y elementos incrustados/elevados.

## 📱 PWA - Instalación

### En móvil (Android/iOS)

1. Abrir en navegador
2. Menú > Instalar app
3. Usar desde pantalla de inicio

### En desktop

1. Abrir URL en Chrome/Edge
2. Click en icono de instalación
3. Usar como aplicación

## 🔐 Seguridad

- ✅ Autenticación con Firebase
- ✅ Políticas RLS en Supabase
- ✅ Tokens JWT seguros
- ✅ Variables de entorno protegidas
- ⚠️ NO incluir `.env.local` en Git

## 📊 Estado del Proyecto

**Sprint 1 (Auth):** ✅ Completo  
**Sprint 2 (Salas):** ✅ Completo  
**Sprint 3 (Cámara):** 🔄 En Desarrollo  
**Sprint 4 (Validación):** ⏳ Por Hacer  
**Sprint 5 (PWA):** ⏳ Por Hacer  

## 🐛 Reporte de Bugs

1. Crear issue en GitHub
2. Incluir descripción clara
3. Pasos para reproducir

## 💡 Contribuciones

Pull requests son bienvenidas. Para cambios grandes:

1. Fork el proyecto
2. Crear rama (`git checkout -b feature/amazing`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push a rama (`git push origin feature/amazing`)
5. Abrir Pull Request

## 📝 Licencia

MIT License - Ver LICENSE file

## 👤 Autor

**juhabarArj**
- GitHub: [@juhabarArj](https://github.com/juhabarArj)

## 🙏 Agradecimientos

- Firebase para autenticación
- Supabase para la base de datos
- Cloudinary para almacenamiento
- Tailwind para estilos
- La comunidad React

## 📞 Soporte

Para preguntas o soporte, crear un issue en GitHub o contactar al autor.

---

**¡Gracias por jugar Challenge Game!** 🎮🚀
