import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  #modal = null;
  #modalTitle = null;
  #modalBody = null;
  #modalClose = null;

  constructor() {
    this.#modal = createElement(this.#templateModal());
    this.#modalTitle = this.#modal.querySelector(".modal__title");
    this.#modalBody = this.#modal.querySelector(".modal__body");
    this.#modalClose = this.#modal.querySelector(".modal__close");
  }

  #templateModal() {
    return `<div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"></h3>
      </div>
      <div class="modal__body"></div>
    </div>
  </div>`;
  }

  #onCloseClick = () => this.close();

  #onEscapeKeydown = (event) => {
    if (event.code === "Escape") {
      this.close();
    }
  };

  setTitle(title) {
    this.#modalTitle.innerText = title;
  }

  setBody(node) {
    this.#modalBody.innerHTML = "";
    this.#modalBody.append(node);
  }

  open() {
    document.body.append(this.#modal);
    document.body.classList.add("is-modal-open");
    document.body.addEventListener("keydown", this.#onEscapeKeydown, {
      once: true,
    });
    this.#modalClose.addEventListener("click", this.#onCloseClick, {
      once: true,
    });
  }

  close() {
    this.#modal.remove();
    document.body.classList.remove("is-modal-open");
  }
}
