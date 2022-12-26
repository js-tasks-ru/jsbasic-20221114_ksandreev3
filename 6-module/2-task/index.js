export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = document.createElement("div");
    this.elem.innerHTML = this.render();
    this.elem.addEventListener("product-add", this.productAdd);
    this.elem.addEventListener("click", this.click);
  }

  render() {
    return `<div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${
            this.product.image
          }" class="card__image" alt="product">
          <span class="card__price">€${this.product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
            <div class="card__title">${this.product.name}</div>
            <button type="button" class="card__button" id = "${
              this.product.id
            }">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
      </div>`;
  }

  click(event) {
    let cardButton = event.target.closest(".card__button");
    if (cardButton)
      cardButton.dispatchEvent(
        new CustomEvent("product-add", {
          detail: cardButton.id,
          bubbles: true,
        })
      );
  }
}
