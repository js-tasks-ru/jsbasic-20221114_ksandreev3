export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return;

    let item;
    item = this.cartItems.find((item) => item.product.id === product.id);
    if (item) {
      this.updateProductCount(product.id, 1);
      return;
    }

    item = {};
    item.product = product;
    item.count = 1;

    this.cartItems.push(item);
    this.onProductUpdate(item);
  }

  updateProductCount(productId, amount) {
    let index = this.cartItems.findIndex(
      (item) => item.product.id === productId
    );
    let item = this.cartItems[index];

    item.count += amount;

    if (item.count == 0) {
      this.cartItems.splice(index, 1);
    }

    this.onProductUpdate(item);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => {
      return total + item.count;
    }, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => {
      return total + item.count * item.product.price;
    }, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
