# BTG Funds Web App

Aplicación web interactiva y responsiva desarrollada en **Angular 19 (Standalone Components y modo Zoneless)** para el manejo simulado de fondos (**FPV/FIC**) de clientes **BTG Pactual**.

---

# Características Principales

## Arquitectura Basada en Componentes

Uso de **Standalone Components** de la última versión de Angular, lo que permite una arquitectura más moderna, modular y desacoplada.

## UI/UX Moderna

Diseño elegante, limpio y completamente responsivo utilizando **Angular Material** junto con estilos personalizados en **SCSS**.

## Manejo de Notificaciones

Las alertas están implementadas mediante **SweetAlert2**, encapsuladas dentro de un servicio dedicado (`NotificationService`) para cumplir con el **principio de responsabilidad única (Single Responsibility Principle)**.

## Manejo de Estado Centralizado y Reactividad

- Uso de `BehaviorSubject` mediante servicios reactivos (`UserStateService`) para el control concurrente de:
  - Suscripciones
  - Transacciones
  - Balance del usuario

- Implementación explícita de:

```ts
ChangeDetectorRef.markForCheck();
```

Esto es necesario para la detección de cambios reactiva tras operaciones asíncronas en un entorno **Zoneless**, característica introducida en **Angular 19+**.

## Simulación de API

Se utiliza `FundService` con **observables asíncronos** para simular el comportamiento real de un backend.

Para ello se utiliza el operador `delay()` de **RxJS**, permitiendo simular tiempos de respuesta de red.

## Validaciones Seguras

Se utiliza `ReactiveFormsModule` para implementar validaciones estrictas al momento de realizar inversiones, incluyendo:

- Validación del **monto mínimo requerido por el fondo**
- Validación del **saldo disponible del usuario en tiempo real**

---

# Requisitos Previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- **Node.js**: versión **18 o superior**
- **Angular CLI**: versión recomendada **19+**

Instalar Angular CLI globalmente si no lo tienes:

```bash
npm install -g @angular/cli
```

---

# Instrucciones de Instalación y Ejecución

## 1. Navegar a la carpeta del proyecto

Asegúrate de estar ubicado en la raíz del proyecto:

```bash
cd btg-funds-app
```

## 2. Instalar dependencias

Ejecuta el siguiente comando para descargar e instalar los paquetes necesarios:

```bash
npm install
```

## 3. Ejecutar la aplicación

Inicia el servidor de desarrollo de Angular:

```bash
npm start
```

También puedes utilizar directamente:

```bash
ng serve
```

## 4. Abrir en el Navegador

Abre tu navegador y visita la siguiente dirección:

```
http://localhost:4200/
```

El servidor de desarrollo recargará automáticamente la página cada vez que guardes cambios en el código (**Live Reloading**).

---

# Caso de Uso y Lógica de Negocio

El aplicativo inicia simulando un **usuario único** dentro del sistema.

### Saldo inicial

El usuario comienza con un balance de:

```
COP $500,000
```

### Navegación

El usuario puede navegar entre dos secciones principales:

- **Dashboard** → Listado de fondos disponibles
- **History** → Historial de transacciones

### Inversión en Fondos

Para invertir en un fondo:

- El usuario debe tener un balance **igual o superior al monto mínimo requerido** por el respectivo fondo (**FPV/FIC**).
- Si la inversión es exitosa:
  - El saldo del usuario disminuye de forma reactiva.
  - Se registra una nueva transacción tipo **Subscribe**.
  - El fondo cambia visualmente de estado habilitando la opción de cancelación.

### Cancelación de Suscripción

El usuario puede cancelar su suscripción a un fondo en cualquier momento.

Al cancelar:

- El sistema **reembolsa exactamente el dinero invertido**.
- El balance del usuario se actualiza automáticamente.
- Se registra una transacción de tipo **Cancel** en el historial.

---

# Tecnologías Utilizadas

- **Angular 21**
- **Standalone Components**
- **Zoneless Change Detection**
- **Angular Material**
- **RxJS**
- **SweetAlert2**
- **SCSS**
- **Reactive Forms**

---

# Autor

**Elkin Gutierrez**

Senior Frontend / Full Stack Developer  
Especializado en **Angular, React, arquitectura frontend y aplicaciones escalables**.
