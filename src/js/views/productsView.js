import View from './View';
import { ERR_MSG } from '../config';

class ProductsView extends View {
  addHandlerRender(handler) {
    ['load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerClick(handler) {
    document
      .querySelector('#product-list')
      .addEventListener('click', function (e) {
        const btn = e.target.closest('.add-to-cart');
        if (!btn) return;

        handler(+btn.dataset.itemToAdd);
      });
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
            <button class="btn btn-primary add-to-cart" data-item-to-add="${product.id}">Add to Cart</button>
        </div>
    </div>
    `;
  }
}

export default new ProductsView({
  parentElement: document.querySelector('#product-list'),
  errorMessage: ERR_MSG,
});
