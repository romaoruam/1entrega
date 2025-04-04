const fs = require('fs');
const path = './data/carts.json';

class CartManager {
    static async getAllCarts() {
        try {
            const data = await fs.promises.readFile(path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer los carritos:', error);
            return [];
        }
    }

    static async getCartById(cid) {
        try {
            const carts = await this.getAllCarts();
            return carts.find(cart => cart.id === cid);
        } catch (error) {
            console.error('Error al obtener carrito por ID:', error);
        }
    }

    static async createCart() {
        try {
            const carts = await this.getAllCarts();
            const id = carts.length ? Math.max(...carts.map(c => c.id)) + 1 : 1;
            const newCart = { id, products: [] };
            carts.push(newCart);
            await fs.promises.writeFile(path, JSON.stringify(carts, null, 2));
            return newCart;
        } catch (error) {
            console.error('Error al crear carrito:', error);
        }
    }

    static async addProductToCart(cid, pid, quantity = 1) {
        try {
            const carts = await this.getAllCarts();
            const cart = carts.find(cart => cart.id === cid);
            if (!cart) return null;
            
            const existingProduct = cart.products.find(p => p.product === pid);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ product: pid, quantity });
            }
            await fs.promises.writeFile(path, JSON.stringify(carts, null, 2));
            return cart;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    }
}

module.exports = CartManager;
