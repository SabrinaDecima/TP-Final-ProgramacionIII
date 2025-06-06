# TP-Final-ProgramacionIII

### (5 de junio de 2025)

- **feat(auth):** Centralización de la gestión del token JWT en un servicio (`src/services/authService.js`).
- **feat(auth):** Persistencia automática de sesión: si el token es válido, el usuario permanece logueado.
- **feat(auth):** Redirección automática: si el usuario está autenticado, no puede acceder a login, registro ni home; es redirigido al dashboard.
- **feat(home):** Al hacer clic en "Elegir Plan" en la página principal, el plan se preselecciona automáticamente en el formulario de registro.
- **feat(payment):** Validaciones mejoradas para los campos de la tarjeta.
- **feat(ui):** Mejora de la estética general de las pantallas de login, registro y dashboard.
- **feat(ui):** Mejora de la estética del modal de pago.

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

[Volver al inicio](./README.md)
