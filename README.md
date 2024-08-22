# Proyecto Cabinas Guanacaste

Este proyecto es el frontend de una aplicación web diseñada para facilitar la reservación de habitaciones en línea. 
Los usuarios pueden navegar por la página para obtener información detallada sobre los servicios que ofrece el negocio, incluyendo los precios de las habitaciones y otros servicios adicionales.
La aplicación permite a los usuarios realizar sus reservaciones de manera rápida y segura, utilizando PayPal como método de pago. 
Además de la funcionalidad de reservación, la página también proporciona información importante sobre el negocio, como la ubicación, horarios de atención y 
detalles de contacto, asegurando que los clientes tengan todo lo que necesitan para planificar su estancia.

## Tecnologías Utilizadas

Este proyecto utiliza las siguientes tecnologías y bibliotecas:

- **React**: Una biblioteca de JavaScript para construir interfaces de usuario.
- **React Router DOM**: Para la navegación entre las diferentes páginas de la aplicación.
- **Axios**: Para realizar solicitudes HTTP a la API.
- **PayPal React SDK (@paypal/react-paypal-js)**: Para integrar el sistema de pagos en línea.
- **AOS (Animate On Scroll)**: Para animaciones al hacer scroll.
- **React Paginate**: Para la paginación de listas.
- **React Google Charts**: Para la visualización de datos en gráficos.
- **React Drag Drop Files**: Para la carga de archivos con arrastrar y soltar.
- **React Toastify**: Para mostrar notificaciones en la aplicación.
- **Image File Resize**: Para redimensionar imágenes antes de cargarlas.
- **React Spinner Material**: Para mostrar spinners de carga.
- **Testing Library (React y Jest)**: Para realizar pruebas de la aplicación.

## Requisitos

Antes de empezar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 12 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) como gestor de paquetes

## Instalación

Sigue estos pasos para clonar y configurar el proyecto en tu entorno local:

1. Clona este repositorio:

    ```bash
    git clone https://github.com/Dannymorales00/cabinasFrontEnd.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd tu_repositorio
    ```

3. Instala las dependencias necesarias:

    ```bash
    npm install
    ```

    o si prefieres usar `yarn`:

    ```bash
    yarn install
    ```

## Scripts disponibles
En el proyecto, puedes utilizar los siguientes scripts definidos en el archivo `package.json`:

### `npm run dev`

Este comando inicia la aplicación en modo de desarrollo. Abre [http://localhost:3001](http://localhost:3001) para ver el proyecto en tu navegador. La página se recargará automáticamente si haces modificaciones en el código.

### `npm run build`

Este comando construye la aplicación en modo de producción. Abre [http://localhost:3001](http://localhost:3001) para ver el proyecto en tu navegador. La página se recargará automáticamente si haces modificaciones en el código.

## Despliegue
Si quieres desplegar la aplicación en un servidor de producción, primero necesitas construir el proyecto utilizando el comando build. 
Después, puedes servir el contenido de la carpeta build utilizando un servidor HTTP como serve, nginx, Apache, etc.

## Capturas de Pantalla
A continuación, se muestran algunas imágenes de la aplicación:

### Página de Inicio
[![home.png](https://i.postimg.cc/nhZYn38L/home.png)](https://postimg.cc/VdGbRBky)

### Página de Habitaciones
[![rooms.png](https://i.postimg.cc/pXVz7pK9/rooms.png)](https://postimg.cc/py7m5VGx)

### Página de Reservación y pago
[![room-Details.png](https://i.postimg.cc/jjTsgJJm/room-Details.png)](https://postimg.cc/Wd9Ltz8w)

### Páginas de gestión de cuentas
[![register.png](https://i.postimg.cc/pXxMttd5/register.png)](https://postimg.cc/G9M5kVGb)
[![login.png](https://i.postimg.cc/251Pxk0M/login.png)](https://postimg.cc/v1dqYsFt)
[![profile.png](https://i.postimg.cc/ZqXX7GgR/profile.png)](https://postimg.cc/CZHvdQwT)
[![forgot-Password.png](https://i.postimg.cc/651cfdF6/forgot-Password.png)](https://postimg.cc/crwfs8sP)
[![admUsers.png](https://i.postimg.cc/1X30ptHN/admUsers.png)](https://postimg.cc/JDSB8RS1)

### Página de Administración de Habitaciones
[![adm-Habitaciones.png](https://i.postimg.cc/4dBVNGg4/adm-Habitaciones.png)](https://postimg.cc/47HmBryj)

### Página de Administración de Inicio
[![adm-Inicio.png](https://i.postimg.cc/YCYFLYHs/adm-Inicio.png)](https://postimg.cc/yD6xwJWm)

### Página de Administración de Reservaciones
[![adm-Reservations.png](https://i.postimg.cc/WzxDhbfV/adm-Reservations.png)](https://postimg.cc/4Hb40Zg2)
