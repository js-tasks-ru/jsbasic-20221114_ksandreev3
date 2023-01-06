import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  #root = null;
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#root = this.#render();
    this.#refreshProductCards();
  }
  #render() {
    return createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
      `);
  }

  get elem() {
    return this.#root;
  }

  updateFilter(filter) {
    Object.assign(this.filters, filter);
    this.#refreshProductCards();
  }

  #refreshProductCards() {
    let cards = this.#root.querySelector(".products-grid__inner");

    cards.innerHTML = "";

    this.products
      .filter((item) => {
        let nuts = true;
        if (this.filters.noNuts && "nuts" in item) {
          nuts = !item.nuts;
        }

        let veget = true;
        if (this.filters.vegeterianOnly) {
          veget = item.vegeterian;
        }

        let spic = true;
        if (this.filters.maxSpiciness) {
          spic = item.spiciness <= this.filters.maxSpiciness;
        }

        let category = true;
        if (this.filters.category && this.filters.category.length > 0) {
          category = this.filters.category == item.category;
        }

        return nuts && veget && spic && category;
      })
      .forEach((product) => {
        let card = new ProductCard(product);
        console.log(card);
        cards.append(card.elem);
      });
  }
}
