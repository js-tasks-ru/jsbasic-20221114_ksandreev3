import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  #slider = null;
  #thumbElement = null;
  #progressElement = null;
  #valueElement = null;
  #stepsElement = null;
  #steps = null;
  #value = null;
  constructor({ steps = 2, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.#slider = createElement(this.#templateSlider());
    this.#thumbElement = this.#slider.querySelector(".slider__thumb");
    this.#progressElement = this.#slider.querySelector(".slider__progress");
    this.#valueElement = this.#slider.querySelector(".slider__value");
    this.#stepsElement = this.#slider.querySelector(".slider__steps");

    this.#setActiveStep(this.value);

    this.#slider.addEventListener("click", this.#onSliderClick);
    this.#thumbElement.addEventListener("pointerdown", this.#onPointerDown);
  }
  get elem() {
    return this.#slider;
  }

  get sliderWidth() {
    return this.#slider.getBoundingClientRect().width;
  }

  get sliderClientX() {
    return this.#slider.getBoundingClientRect().x;
  }

  get segmentWidth() {
    return this.sliderWidth / this.segments;
  }

  get segments() {
    return this.#steps - 1;
  }

  get value() {
    return this.#value;
  }

  set value(number) {
    if (number > this.segments) {
      this.#value = this.segments;
    } else if (number < 0) {
      this.#value = 0;
    } else {
      this.#value = Math.round(number);
    }
  }

  get steps() {
    return this.#steps;
  }

  set steps(number) {
    if (number <= 1) {
      this.#steps = 2;
    } else {
      this.#steps = number;
    }
  }

  #onPointerDown = () => {
    this.#slider.classList.add("slider_dragging");
    document.addEventListener("pointermove", this.#onPointerMove);
    document.addEventListener("pointerup", this.#onPointerUp, { once: true });
  };

  #onPointerUp = (event) => {
    this.#slider.classList.remove("slider_dragging");
    document.removeEventListener("pointermove", this.#onPointerMove);

    const cordRelative = event.clientX - this.sliderClientX;
    const step = cordRelative / this.segmentWidth;
    this.#setActiveStep(step);

    this.#generateCustomEvent();
  };

  #onPointerMove = (event) => {
    event.preventDefault();

    const cordRelative = event.clientX - this.sliderClientX;
    const step = cordRelative / this.segmentWidth;
    this.#setActiveStep(step);

    let percentWidth = cordRelative / (this.sliderWidth / 100);
    percentWidth = percentWidth > 100 ? 100 : percentWidth;
    percentWidth = percentWidth < 0 ? 0 : percentWidth;
    this.#updateStateOfSteps(this.value, percentWidth);
  };

  #onSliderClick = (event) => {
    const cordRelative = event.clientX - this.sliderClientX;
    const step = cordRelative / this.segmentWidth;
    this.#setActiveStep(step);

    this.#generateCustomEvent();
  };

  #setActiveStep(position) {
    this.value = position;

    const percentWidth = (100 / this.segments) * this.value;
    this.#updateStateOfSteps(this.value, percentWidth);
  }

  #updateStateOfSteps(value, percentWidth) {
    this.#valueElement.innerText = value;
    this.#thumbElement.style.left = `${percentWidth}%`;
    this.#progressElement.style.width = `${percentWidth}%`;

    this.#stepsElement
      .querySelector(".slider__step-active")
      ?.classList.remove("slider__step-active");
    this.#stepsElement.children[this.value].classList.add(
      "slider__step-active"
    );
  }

  #generateCustomEvent() {
    this.#slider.dispatchEvent(
      new CustomEvent(
        "slider-change",
        {
          bubbles: true,
          detail: this.#value,
        },
        { once: true }
      )
    );
  }

  #templateSlider() {
    return `<div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.#value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${`<span></span>`.repeat(this.#steps)}
        </div>
      </div>`;
  }
}
