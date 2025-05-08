# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# TP-Final-ProgramacionIII

🏋️‍♀️ CodeFit - Gestión de Gimnasio
CodeFit es una aplicación web pensada para mejorar la experiencia de los usuarios de un gimnasio. Permite a los socios gestionar sus actividades de manera rápida y sencilla desde cualquier dispositivo.

✨ Funcionalidades
📅 Solicitar turnos para clases específicas según el día y horario.

💳 Abonar la cuota mensual de forma rápida y segura.

🔔 Ver notificaciones sobre novedades, cambios de horarios o recordatorios.

🕒 Consultar días y horarios de las distintas clases disponibles.

🛠️ Tecnologías utilizadas

Frontend:
React
JavaScript
CSS

Backend:
Node.js

# 🧱 Estructura del Repositorio

A continuación se describe la estructura general del proyecto y la función de cada carpeta/componente:

## 📑 Tabla de Contenidos

- [📁 Descripción de Carpetas](#-descripción-de-carpetas)
  - [public/](#public)
  - [src/](#src)
    - [assets/](#assets)
    - [components/](#components)
    - [layouts/](#layouts)
    - [pages/](#pages)
    - [routes/](#routes)
    - [utils/](#utils)
  - [App.jsx](#appjsx)
  - [index.jsx](#indexjsx)
- [🔐 Protección de Rutas](#-protección-de-rutas)
- [🧩 Componentes Reutilizables](#-componentes-reutilizables)
- [🎨 Layouts](#-layouts)
- [📦 Assets](#-assets)
- [🛠️ Utils](#-utils)
- [🧪 Escalabilidad Futura](#-escalabilidad-futura)

---

```text
TP-FINAL/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Sidebar.jsx
│   ├── layouts/
│   │   ├── PublicLayout.jsx
│   │   └── ProtectedLayout.jsx
│   ├── pages/
│   │   ├── Public/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   └── Private/
│   │       ├── Dashboard.jsx
│   │       ├── Profile.jsx
│   │       └── Members.jsx
│   ├── routes/
│   │   ├── Protected.jsx
│   │   └── index.js
│   ├── utils/
│   │   └── auth.js
│   ├── App.jsx
│   └── index.jsx
└── package.json
```

## 📁 Descripción de Carpetas

### `public/`

- Contiene archivos estáticos como `index.html`, favicon, imágenes globales, etc.
- Estos archivos no son procesados por Webpack y se copian directamente al build final.

### `src/`

- Carpeta principal donde vive toda la lógica de la aplicación.

#### `assets/`

- Imágenes, iconos u otros recursos visuales utilizados en componentes o páginas.
- Ejemplo: `/logo.png`, `/icons/`, etc.

#### `components/`

- Componentes reutilizables de la interfaz de usuario (UI).

**Ejemplos:**

- `Header.jsx`: Barra superior de navegación.
- `Footer.jsx`: Pie de página.
- `Sidebar.jsx`: Menú lateral.

#### `layouts/`

- Define diferentes diseños (layouts) para las páginas.
- Se usan para mantener consistencia visual entre distintas vistas.

**Ejemplos:**

- `PublicLayout.jsx`: Layout para páginas públicas (sin autenticación).
- `ProtectedLayout.jsx`: Layout para usuarios logueados.

#### `pages/`

- Aquí residen todas las páginas de la aplicación, divididas en públicas y privadas.

**Public/**
Páginas accesibles sin iniciar sesión:

- `Home.jsx`: Página de inicio.
- `Login.jsx`: Formulario de inicio de sesión.
- `Register.jsx`: Formulario de registro.

**Private/**
Páginas protegidas (requieren autenticación):

- `Dashboard.jsx`: Panel principal del usuario.
- `Profile.jsx`: Perfil del usuario.
- `Members.jsx`: Gestión de miembros (solo para administradores).

#### `routes/`

- Configuración de rutas de la aplicación.

- `Protected.jsx`: Componente de protección de rutas. Solo permite el acceso a usuarios autenticados.
  Se usa como middleware en **react-router-dom**.

- `index.js`: Archivo principal de rutas. Aquí se define la estructura de navegación usando **react-router-dom**.

#### `utils/`

- Funciones auxiliares y de utilidad.

**Ejemplo:**

- `auth.js`: Maneja funciones relacionadas con autenticación (login, logout, rol del usuario, etc.).

### `App.jsx`

- Componente raíz de la aplicación.
  Aquí se importan y organizan los componentes principales y las rutas.

### `index.jsx`

- Punto de entrada de la aplicación.
  Renderiza el componente **App** dentro del DOM.

---

## 🔐 Protección de Rutas

Se utiliza un sistema de protección de rutas basado en roles, permitiendo mostrar ciertas páginas solo a usuarios autenticados o con permisos específicos.

### Roles Soportados

- `user`: Usuario normal.
- `admin`: Administrador.
- `superadmin`: Superadministrador (acceso completo).

### Cómo funciona

- El componente `Protected.jsx` revisa si el usuario está autenticado y tiene el rol adecuado antes de renderizar una ruta.
- Si el usuario no tiene permiso, redirige a `/login` o `/unauthorized`.

---

## 🧩 Componentes Reutilizables

Los componentes definidos en `components/` son utilizados en varias partes del proyecto:

- **Header.jsx**: Navegación común en todas las páginas.
- **Sidebar.jsx**: Menú lateral dinámico según el rol del usuario.
- **Footer.jsx**: Pie de página común.

---

## 🎨 Layouts

Los layouts definen cómo se ven las páginas dependiendo del contexto:

- **PublicLayout.jsx**: Diseño simple para páginas públicas (ej. login).
- **ProtectedLayout.jsx**: Diseño más complejo para usuarios logueados, incluye menús, sidebar, etc.

---

## 📦 Assets

Aquí se almacenan todos los recursos gráficos que se usan en la aplicación:

- Logotipos, iconos, fondos, imágenes de perfil, etc.

---

## 🛠️ Utils

Contiene funciones útiles que pueden ser llamadas desde cualquier parte de la aplicación:

- **auth.js**: Funciones para verificar sesión activa, obtener token, validar rol, etc.

---

## 🧪 Escalabilidad Futura

La estructura actual permite fácil escalabilidad:

- Agregar nuevos roles (ej. `moderator`).
- Crear nuevas páginas y layouts.
- Implementar módulos adicionales (ej. gestión de usuarios, historial, notificaciones).

```

```
