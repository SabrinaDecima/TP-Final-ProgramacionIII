# TP-Final-ProgramacionIII

##🏋️‍♀️ FunctionFit() - Gestión de Gimnasio

FunctionFit() es una aplicación web pensada para mejorar la experiencia de los usuarios de un gimnasio. Permite a los socios gestionar sus actividades de manera rápida y sencilla desde cualquier dispositivo.

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
- [🖥️ Dashboards por Rol](#-dashboards-por-rol)
- [🧭 Sidebar con Enlace Activo](#-sidebar-con-enlace-activo)

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
  Se usa como middleware en **react-router**.

- `index.js`: Archivo principal de rutas. Aquí se define la estructura de navegación usando **react-router**.

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

- `member`: Usuario normal.
- `admin`: Administrador.
- `superadmin`: Superadministrador (acceso completo).

### Cómo funciona

- El componente `Protected.jsx` revisa si el usuario está autenticado y tiene el rol adecuado antes de renderizar una ruta.
- Si el usuario no tiene permiso, redirige a `/login` o `/home`.

---

## 🧩 Componentes Reutilizables

Los componentes definidos en `components/` son utilizados en varias partes del proyecto:

- **Header.jsx**: Navegación común en todas las páginas.
- **Sidebar.jsx**: Menú lateral dinámico según el rol del usuario.
- **Footer.jsx**: Pie de página común.

---

## 📦 Assets

Aquí se almacenan todos los recursos gráficos que se usan en la aplicación:

- Logotipos, iconos, fondos, imágenes de perfil, etc.

---

## 🛠️ Utils

Contiene funciones útiles que pueden ser llamadas desde cualquier parte de la aplicación:

- **auth.js**: Funciones para verificar sesión activa, obtener token, validar rol, etc.

---

## 🖥️ Dashboards por Rol

El sistema de dashboards ahora permite mostrar un panel diferente según el rol del usuario. Esto se logra con un único componente `Dashboard.jsx` que recibe la prop `role` y, según su valor, renderiza el contenido correspondiente:

- `MemberDashboardContent.jsx`: Panel para socios.
- `AdminDashboardContent.jsx`: Panel para administradores.
- `SuperAdminDashboardContent.jsx`: Panel para superadministradores.

Todos estos archivos se encuentran en:

```
src/pages/Private/Dashboard/
```

El componente principal decide qué contenido mostrar según el rol:

```jsx
const Dashboard = ({ role }) => (
  <div>
    {role === 'member' && <MemberDashboardContent />}
    {role === 'admin' && <AdminDashboardContent />}
    {role === 'superadmin' && <SuperAdminDashboardContent />}
  </div>
);
```

En `App.jsx`, se pasa la prop `role` al dashboard:

```jsx
<Route index element={<Dashboard role={role} />} />
```

---

## 🧭 Sidebar con Enlace Activo

El componente `Sidebar.jsx` ahora utiliza `NavLink` de `react-router` para resaltar el enlace activo con un fondo diferente. Esto mejora la experiencia de navegación, mostrando visualmente en qué sección se encuentra el usuario.

Ejemplo de uso:

```jsx
<NavLink
  to="/gimnasio"
  className={({ isActive }) => 'nav-link' + (isActive ? ' bg-light' : '')}
  style={({ isActive }) => (isActive ? { backgroundColor: '#fff' } : {})}
>
  Dashboard
</NavLink>
```

Esto aplica un fondo blanco al enlace activo. Puedes personalizar el color en el archivo `Sidebar.jsx`.

---

## 🔑 Nueva gestión de token JWT (autenticación)

A partir de la última actualización, la gestión del token JWT se centralizó en el archivo `src/services/authService.js` para mejorar la seguridad y el mantenimiento del código.

- Todas las operaciones relacionadas con el token (guardar, obtener, eliminar) se realizan mediante funciones reutilizables: `getToken()`, `setToken(token)`, y `removeToken()`.
- El componente principal (`App.jsx`) utiliza estas funciones para verificar si el usuario está autenticado y actualizar el estado global de la app.
- Si el token es válido, el usuario permanece logueado incluso al recargar la página o cerrar/abrir el navegador.
- Si el token es inválido o se elimina (logout), el usuario es redirigido automáticamente a la pantalla de login.
- Esto permite una experiencia de usuario más fluida y segura, y facilita la implementación de futuras mejoras en la autenticación.

---

## Cómo ejecutar el proyecto

1. Instala las dependencias:
   ```sh
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```sh
   npm run dev
   ```
3. Accede a [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## Notas

- El backend debe estar corriendo en `http://localhost:3000` para el registro de usuarios.

## 🏃🏻 Cambios recientes

Consulta el archivo [README.changelog.md](./README.changelog.md) para ver el detalle de los últimos cambios.
