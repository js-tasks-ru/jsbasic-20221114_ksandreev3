import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  #elem = null;
  #slides = [];
  constructor(slides) {
    this.slides = slides;
    this.#elem = createElement(this.#template(slides));
    this.#elem.addEventListener("click", this.onClick);
    this.#elem.querySelector(".carousel__arrow_left").style.display = "none";
  }
  get elem() {
    return this.#elem;
  }

  #template(slides) {
    return `<div class="carousel">
    <!--Кнопки переключения-->
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner" data-current-number="0">
      ${slides.map((slide) => this.#templateSlide(slide)).join("")}
    </div>
  </div>`;
  }

  #templateSlide(slide) {
    return `
    <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${
          slide.image
        }" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`;
  }

  onClick(event) {
    const carousel = event.currentTarget;
    const carouselInner = carousel.querySelector(".carousel__inner");
    const arrowRight = carousel.querySelector(".carousel__arrow_right");
    const arrowLeft = carousel.querySelector(".carousel__arrow_left");
    const addButton = event.target.closest(".carousel__button");
    const currentSlide = event.target.closest(".carousel__slide");
    const countSlides = carouselInner.children.length - 1;
    const width = carouselInner.offsetWidth;
    if (event.target.closest(".carousel__arrow_right")) {
      carouselInner.dataset.currentNumber++;
      arrowLeft.style.display = "";
      if (parseInt(carouselInner.dataset.currentNumber) === countSlides) {
        arrowRight.style.display = "none";
      }
      carouselInner.style.transform = `translateX(-${
        width * carouselInner.dataset.currentNumber
      }px)`;
    }
    if (event.target.closest(".carousel__arrow_left")) {
      carouselInner.dataset.currentNumber--;
      arrowRight.style.display = "";
      if (carouselInner.dataset.currentNumber === "0") {
        arrowLeft.style.display = "none";
      }
      carouselInner.style.transform = `translateX(-${
        width * carouselInner.dataset.currentNumber
      }px)`;
    }
    if (addButton) {
      addButton.dispatchEvent(
        new CustomEvent("product-add", {
          detail: currentSlide.dataset.id,
          bubbles: true,
        })
      );
    }
  }
}
