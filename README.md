# AppMovil-AlertaTemprana-ILS
Aplicación Movil que permite realizar avisos en casos de emergencias, Diponible para junta de vecinos, comunidades en General

# 📂 Estructura del Proyecto React Native

Este documento describe la **estructura base** del proyecto, explicando cada carpeta y archivo clave.  
El objetivo es mantener una organización clara para facilitar el desarrollo y la colaboración.

---

## **📁 Estructura del Proyecto**

```bash
my-react-native-app/
│
├── android/                # Código y configuración nativa para Android
├── ios/                    # Código y configuración nativa para iOS
├── src/                    # Código fuente principal de la app
│   ├── components/         # Componentes reutilizables de la UI
│   ├── screens/            # Pantallas o vistas principales
│   ├── navigations/        # Configuración de navegación
│   ├── assets/             # Recursos estáticos (imágenes, fuentes, etc.)
│   ├── redux/              # Gestión de estado global (si usas Redux)
│   └── styles/             # Estilos globales y compartidos
│
├── .babelrc                # Configuración de Babel
├── .eslintrc.js            # Configuración de ESLint
├── .prettierrc             # Configuración de Prettier
├── metro.config.js         # Configuración de Metro Bundler
├── package.json            # Dependencias, scripts y metadatos del proyecto
├── package-lock.json       # Bloqueo de versiones (si usas npm)
├── yarn.lock               # Bloqueo de versiones (si usas yarn)
├── index.js                # Punto de entrada de la app
├── .gitignore              # Archivos y carpetas a ignorar por Git
└── README.md               # Documentación inicial del proyecto

```
---

## 📁 Archivos y Carpetas del Proyecto

### **Archivos Principales**

- **`package.json`** → Define dependencias, scripts y metadatos del proyecto.
- **`index.js`** → Punto de entrada para registrar el componente raíz.
- **`node_modules/`** → Contiene todas las dependencias instaladas _(excluido en `.gitignore`)_.
- **`metro.config.js`** → Configuración para el empaquetador **Metro** usado por React Native.
- **`.gitignore`** → Define qué archivos y carpetas no deben subirse a **GitHub**.

---

## 📂 Carpeta `src/`

La carpeta **src/** centraliza todo el **código fuente** de la aplicación y se organiza en subcarpetas para mantener el proyecto ordenado:

- **`components/`** → Componentes reutilizables de la interfaz.
- **`screens/`** → Pantallas principales de la aplicación.
- **`navigations/`** → Configuración de rutas y navegadores.
- **`assets/`** → Recursos estáticos: imágenes, íconos, fuentes, etc.
- **`redux/`** → Acciones, reducers y configuración del **store** (si se usa Redux).
- **`styles/`** → Archivos de estilos globales y compartidos.

---

## 📂 Carpeta `android/`

Contiene todo el código **nativo** necesario para la plataforma **Android**:

- **Archivos clave:**
  - `build.gradle`
  - `gradle.properties`
  - `settings.gradle`
- **Código fuente:**  
  Ubicado en `src/main/java/`.
- **Recursos:**  
  En `src/main/res/` se encuentran layouts, drawables, strings, etc.
- **AndroidManifest.xml:**  
  Contiene la configuración básica de la app en Android.

---

## 📂 Carpeta `ios/`

Contiene todo el código **nativo** para la plataforma **iOS**:

- **Archivos clave:**
  - `Podfile`
  - `Podfile.lock`
- **Proyecto Xcode:**
  - `<ProjectName>.xcodeproj`
  - `<ProjectName>.xcworkspace`
- **Código fuente y configuraciones:**  
  Organizados en las subcarpetas correspondientes.

---

## 📝 Notas

- Mantén la estructura organizada para facilitar el mantenimiento y la colaboración.
- Asegúrate de incluir un **`.gitignore`** adecuado para evitar subir dependencias y archivos temporales innecesarios.
- Esta estructura es ideal para proyectos **React Native** de cualquier tamaño.

---

## 🚀 Recomendación

Si necesitas generar toda la estructura de carpetas y archivos base automáticamente, puedes usar este comando en Linux/Mac:

```bash
mkdir -p src/{components,screens,navigations,assets,redux,styles} && \
mkdir -p android/src/main/{java,res} && \
mkdir -p ios && \
touch package.json index.js metro.config.js .gitignore README.md

```
