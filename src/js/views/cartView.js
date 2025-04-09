import View from './View';
import { ERR_MSG } from '../config';

class ProductsView extends View {
  addHandlerRender(handler) {
    ['load'].forEach(ev => window.addEventListener(ev, handler));
  }

  generateMarkup(data) {
    return data.map(it => this.#generateMarkupItem(it)).join('');
  }

  #generateMarkupItem(item) {
    return `
    <li class="list-group-item d-flex justify-content-between align-items-center'">
      <div>
        <img src="${item.image}" alt=${item.title} width="50" height="50" />
        ${item.title} - $${item.price} ×
        <button class="btn btn-sm btn-outline-secondary me-1 quantity-btn">-</button>
        <span>${item.quantity}</span>
        <button class="btn btn-sm btn-outline-secondary ms-1 quantity-btn">+</button>
      </div>
      <button class="btn btn-sm btn-danger remove-btn">Remove</button>
    </li>
    `;
  }
}

export default new ProductsView({
  parentElement: document.querySelector('#cart-list'),
  errorMessage: ERR_MSG,
});
