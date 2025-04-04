# API de Productos y Carritos

## Descripción
Esta es una API desarrollada con **Node.js** y **Express** que permite gestionar productos y carritos de compras. 

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <tu_enlace_de_repositorio>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el servidor:
   ```bash
   node server.js
   ```

## Endpoints

- **GET /api/products**: Lista todos los productos.
- **GET /api/products/:pid**: Devuelve un producto por ID.
- **POST /api/products**: Agrega un nuevo producto.
- **PUT /api/products/:pid**: Actualiza un producto por ID.
- **DELETE /api/products/:pid**: Elimina un producto por ID.
- **POST /api/carts**: Crea un nuevo carrito.
- **GET /api/carts/:cid**: Obtiene los productos en un carrito.
- **POST /api/carts/:cid/product/:pid**: Agrega un producto al carrito.
