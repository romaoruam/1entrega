const fs = require('fs');
const path = './data/products.json';

class ProductManager {
    static async getAllProducts() {
        try {
            const data = await fs.promises.readFile(path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer los productos:', error);
            return [];
        }
    }

    static async getProductById(pid) {
        try {
            const products = await this.getAllProducts();
            return products.find(product => product.id === pid);
        } catch (error) {
            console.error('Error al obtener producto por ID:', error);
        }
    }

    static async addProduct(product) {
        try {
            const products = await this.getAllProducts();
            const id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
            const newProduct = { ...product, id };
            products.push(newProduct);
            await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
            return newProduct;
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    }

    static async updateProduct(pid, updatedData) {
        try {
            const products = await this.getAllProducts();
            const index = products.findIndex(product => product.id === pid);
            if (index === -1) return null;
            products[index] = { ...products[index], ...updatedData };
            await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
            return products[index];
        } catch (error) {
            console.error('Error al actualizar producto:', error);
        }
    }

    static async deleteProduct(pid) {
        try {
            const products = await this.getAllProducts();
            const newProducts = products.filter(product => product.id !== pid);
            await fs.promises.writeFile(path, JSON.stringify(newProducts, null, 2));
            return newProducts;
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    }
}

module.exports = ProductManager;
