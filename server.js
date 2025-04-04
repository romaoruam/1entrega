const express = require('express');
const fs = require('fs');
const ProductManager = require('./managers/ProductManager');
const CartManager = require('./managers/CartManager');

const app = express();
app.use(express.json());

const PORT = 8080;

// Rutas para productos
app.get('/api/products', async (req, res) => {
    const products = await ProductManager.getAllProducts();
    res.json(products);
});

app.get('/api/products/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await ProductManager.getProductById(Number(pid));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.post('/api/products', async (req, res) => {
    const newProduct = await ProductManager.addProduct(req.body);
    res.status(201).json(newProduct);
});

app.put('/api/products/:pid', async (req, res) => {
    const { pid } = req.params;
    const updatedProduct = await ProductManager.updateProduct(Number(pid), req.body);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.delete('/api/products/:pid', async (req, res) => {
    const { pid } = req.params;
    const updatedProducts = await ProductManager.deleteProduct(Number(pid));
    if (updatedProducts) {
        res.json(updatedProducts);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// Rutas para carritos
app.post('/api/carts', async (req, res) => {
    const newCart = await CartManager.createCart();
    res.status(201).json(newCart);
});

app.get('/api/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await CartManager.getCartById(Number(cid));
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

app.post('/api/carts/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const updatedCart = await CartManager.addProductToCart(Number(cid), Number(pid), quantity);
    res.json(updatedCart);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
