import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  #modal;
  #modalBody;

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    let item;
    item = this.cartItems.find((arItem) => arItem.product.id === product.id);
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
      (arItem) => arItem.product.id === productId
    );
    let item = this.cartItems[index];

    item.count += amount;

    if (item.count === 0) {
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

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.#modalBody = createElement("<div></div>");
    this.cartItems
      .map((item) => this.renderProduct(item.product, item.count))
      .forEach((item) => {
        item.addEventListener("click", this.onItemClick);
        this.#modalBody.append(item);
      });

    let submit = this.renderOrderForm();
    submit.addEventListener("submit", (event) => this.onSubmit(event));
    this.#modalBody.append(submit);

    this.#modal = new Modal();
    this.#modal.setTitle("Your order");
    this.#modal.setBody(this.#modalBody);

    this.#modal.open();
  }

  onItemClick = (event) => {
    let productId = event.target.closest(".cart-product").dataset.productId;

    if (event.target.closest(".cart-counter__button_minus")) {
      this.updateProductCount(productId, -1);
      return;
    }
    if (event.target.closest(".cart-counter__button_plus")) {
      this.updateProductCount(productId, 1);
      return;
    }
  };

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains("is-modal-open")) return;

    if (this.getTotalCount() == 0) {
      this.#modal.close();
      return;
    }

    this.#modalBody.querySelector(".cart-buttons__info-price").innerHTML =
      "€" + this.getTotalPrice().toFixed(2);

    let elem = this.#modalBody.querySelector(
      `[data-product-id="${cartItem.product.id}"]`
    );

    if (cartItem.count === 0) {
      elem.remove();
      return;
    }

    elem.querySelector(".cart-counter__count").innerHTML = cartItem.count;

    elem.querySelector(".cart-product__price").innerHTML =
      "€" + (cartItem.count * cartItem.product.price).toFixed(2);
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();

    this.#modalBody
      .querySelector('button[type="submit"]')
      .classList.add(".is-loading");

    let formData = new FormData(this.#modalBody.querySelector(".cart-form"));
    formData.append("cartItems", JSON.stringify(this.cartItems));

    let promise = fetch("https://httpbin.org/post", {
      method: "POST",
      body: formData,
    });

    promise
      .then((response) => {
        if (response.ok) this.#renderSuccess();
        return response.json();
      })
      .then((result) => console.log(result))
      .catch(() => {
        alert("ERROR");
      });
  }

  #renderSuccess() {
    this.cartItems.length = 0;
    this.cartIcon.update(this);

    this.#modal.setTitle("Success!");

    this.#modal.setBody(
      createElement(`
            <div class="modal__body-inner">
              <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
              </p>
            </div>`)
    );
  }
  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
