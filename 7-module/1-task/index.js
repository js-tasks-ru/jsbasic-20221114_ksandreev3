import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  #ribbon = null;
  #ribbonInner = null;
  #leftArrow = null;
  #rightArrow = null;
  elem = null;

  constructor(categories) {
    this.categories = categories;
    this.#ribbon = createElement(this.#templateRibbonMenu(categories));
    this.#ribbonInner = this.#ribbon.querySelector(".ribbon__inner");
    this.#leftArrow = this.#ribbon.querySelector(".ribbon__arrow_left");
    this.#rightArrow = this.#ribbon.querySelector(".ribbon__arrow_right");

    this.#ribbon
      .querySelector(".ribbon__item")
      .classList.add("ribbon__item_active");

    this.#ribbonInner.addEventListener("click", this.#onMenuItemClick);
    this.#ribbonInner.addEventListener(
      "scroll",
      this.#updateVisibilityOfArrows
    );
    this.#leftArrow.addEventListener("click", this.#onLeftArrowClick);
    this.#rightArrow.addEventListener("click", this.#onRightArrowClick);

    this.elem = this.#ribbon;
  }
  #onMenuItemClick = (event) => {
    if (!event.target.dataset.id) {
      return;
    }

    event.target.dispatchEvent(
      new CustomEvent("ribbon-select", {
        detail: event.target.dataset.id,
        bubbles: true,
      })
    );
  };

  #onLeftArrowClick = () => this.#ribbonInner.scrollBy(-350, 0);

  #onRightArrowClick = () => this.#ribbonInner.scrollBy(350, 0);

  #updateVisibilityOfArrows = () => {
    const scrollWidth = this.#ribbonInner.scrollWidth;
    const clientWidth = this.#ribbonInner.clientWidth;
    const scrollLeft = this.#ribbonInner.scrollLeft;

    scrollLeft === 0
      ? this.#leftArrow.classList.remove("ribbon__arrow_visible")
      : this.#leftArrow.classList.add("ribbon__arrow_visible");

    scrollWidth - clientWidth - scrollLeft === 0
      ? this.#rightArrow.classList.remove("ribbon__arrow_visible")
      : this.#rightArrow.classList.add("ribbon__arrow_visible");
  };

  #templateRibbonMenu(categories) {
    return `<div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner">
      ${categories
        .map(
          (category) =>
            `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`
        )
        .join("")}
    </nav>
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`;
  }
}
