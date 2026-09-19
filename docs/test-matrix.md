# Matriz de Pruebas Funcionales - SauceDemo (Módulo Auth)

**Autor:** Luis Enrique Guzman Poma  
**Rol:** QA Automation Analyst  
**Objetivo:** Validar la seguridad, estabilidad y control de accesos del formulario de inicio de sesión.  

---

## 1. Técnicas de Diseño Aplicadas

* **Clases de Equivalencia:**
  * Partición Válida: Credenciales registradas activas (`standard_user`, `problem_user`, etc.).
  * Partición Inválida (Bloqueado): Credencial válida pero con estado inactivo (`locked_out_user`).
  * Partición Inválida (No existente): Usuario o contraseña inexistentes en la base de datos.
* **Valores Límite (BVA):** Inputs nulos / strings vacíos en usuario y contraseña para evaluar validaciones de frontend y backend.

---

## 2. Matriz de Casos de Prueba (RTM)

| ID Caso | Escenario de Prueba | Precondiciones | Datos de Entrada | Resultado Esperado | Severidad | Estado | Automatizado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Inicio de sesión exitoso con usuario estándar | Usuario activo en sistema | `user: standard_user`<br>`pass: secret_sauce` | Redirección a `/inventory.html` y renderizado de lista de productos | Crítica | Pass | Sí (`login.cy.js`) |
| **TC-02** | Bloqueo de acceso a usuario deshabilitado | Usuario marcado como bloqueado | `user: locked_out_user`<br>`pass: secret_sauce` | Bloqueo de acceso y alerta: `Epic sadface: Sorry, this user has been locked out.` | Alta | Pass | Sí (`login.cy.js`) |
| **TC-03** | Rechazo de autenticación con credenciales erróneas | N/A | `user: invalid_user`<br>`pass: wrong_pass` | Alerta de error: `Username and password do not match...` | Alta | Pass | Sí (`login.cy.js`) |
| **TC-04** | Validación de campos obligatorios en blanco | Formulario cargado en estado inicial | `user: [vacío]`<br>`pass: [vacío]` | Mensaje de validación: `Epic sadface: Username is required` | Media | Pass | Sí (`login.cy.js`) |
| **TC-05** | Validación de contraseña vacía con usuario ingresado | Formulario cargado | `user: standard_user`<br>`pass: [vacío]` | Mensaje de validación: `Epic sadface: Password is required` | Media | Pass | Manual |

---

## 3. Validación de Persistencia / Backend (SQL Reference)

Para entornos donde el frontend consulta directamente la persistencia de usuarios:

```sql
-- Verificar estado del usuario y permisos antes de ejecutar pruebas:
SELECT id, username, is_active, failed_login_attempts 
FROM auth_users 
WHERE username = 'locked_out_user';