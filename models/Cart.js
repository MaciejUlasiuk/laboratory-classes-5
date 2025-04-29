const Product = require("./Product");

class Cart {
  static #items = [];

  static add(productName) {
    const productToAdd = Product.findByName(productName);
    if (!productToAdd) {
      console.error(`Product with name ${productName} not found.`);
      return;
    }

    const existingCartItemIndex = this.#items.findIndex(
      (item) => item.product.name === productName
    );

    if (existingCartItemIndex > -1) {
      this.#items[existingCartItemIndex].quantity += 1;
    } else {
      this.#items.push({ product: productToAdd, quantity: 1 });
    }
  }

  static getItems() {
    return this.#items;
  }

  static getTotalPrice() {
    return this.#items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  static getProductsQuantity() {
    return this.#items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  static clearCart() {
    this.#items = [];
  }
}

module.exports = Cart;