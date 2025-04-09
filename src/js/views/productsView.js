import View from './View';
import { ERR_MSG } from '../config';

class ProductsView extends View {
  addHandlerRender(handler) {
    ['load'].forEach(ev => window.addEventListener(ev, handler));
  }

  generateMarkup(data) {
    return data.map(prod => this.#generateMarkupProduct(prod)).join('');
  }

  #generateMarkupProduct(product) {
    return `
    <div class="col">
        <div class="card p-3">
            <h5 class="card-title">${product.title}</h5>
            <img src="${product.image}" alt=${product.title} />
            <p class="card-text">Price: $${product.price}</p>
            <button class="btn btn-primary add-to-cart">Add to Cart</button>
        </div>
    </div>
    `;
  }
}

export default new ProductsView({
  parentElement: document.querySelector('#product-list'),
  errorMessage: ERR_MSG,
});
