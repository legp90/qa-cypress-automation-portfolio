# [BUG] Formulario de Checkout permite enviar orden sin código postal

* **ID del Defecto:** QA-204
* **Proyecto:** E-Commerce Platform - SauceDemo
* **Componente:** Checkout / Módulo de Pagos
* **Severidad:** Mayor (Pérdida de integridad de datos transaccionales)
* **Prioridad:** Alta (Bloquea cálculo logístico y despacho)
* **Reportado por:** Luis Enrique Guzman Poma (QA Automation Analyst)
* **Ambiente:** Chrome v128.0 / Windows 11 / Staging URL: https://www.saucedemo.com

---

### Descripción
Al intentar completar el paso 1 de Checkout (`checkout-step-one.html`), el sistema no valida correctamente el formato del campo `Postal Code`, permitiendo caracteres especiales o espacios vacíos que provocan un fallo `HTTP 422 Unprocessable Entity` en la llamada a la pasarela de pagos posterior.

### Precondiciones
1. Estar autenticado con usuario `standard_user`.
2. Tener al menos un producto agregado al carrito de compras.
3. Encontrarse en la URL `/checkout-step-one.html`.

### Pasos para Reproducir (Steps to Reproduce)
1. Ingresar "Juan" en el campo `First Name`.
2. Ingresar "Pérez" en el campo `Last Name`.
3. Ingresar `###$$$` o dejar únicamente espacios en blanco en `Zip/Postal Code`.
4. Hacer clic en el botón `Continue`.

### Resultado Esperado
El sistema debe validar mediante máscara o regex el formato numérico del código postal y mostrar un mensaje de error:  
> *"Postal Code is invalid or improperly formatted."*

### Resultado Actual
El sistema acepta el envío, redirige a `checkout-step-two.html` y al hacer clic en `Finish`, la orden queda huérfana en base de datos sin referencia geográfica.

### Evidencias Técnicas
* **Consola DevTools:** `Uncaught TypeError: Cannot read properties of undefined (reading 'zip_code')`
* **Network Tab:** `POST /api/v1/orders/validate` -> Status: `500 Internal Server Error`