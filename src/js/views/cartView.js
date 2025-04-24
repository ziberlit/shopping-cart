import Fraction from 'fraction.js';
import View from './View';
import { ERR_MSG } from '../config';

class ProductsView extends View {
  addHandlerRender(handler) {
    ['load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerAddToCart(handler) {
    document
      .querySelector('#product-list')
      .addEventListener('click', function (e) {
        const btn = e.target.closest('.add-to-cart');
        if (!btn) return;

        handler(+btn.dataset.itemToAdd);
      });
  }

  addHandlerIncreaseItemQuantity(handler) {
    document
      .querySelector('#cart-list')
      .addEventListener('click', function (e) {
        const btn = e.target.closest('.quantity-btn-increase');
        if (!btn) return;

        handler(+btn.dataset.itemToAdd);
      });
  }

  addHandlerDecreaseItemQuantity(handler) {
    document
      .querySelector('#cart-list')
      .addEventListener('click', function (e) {
        const btn = e.target.closest('.quantity-btn-decrease');
        if (!btn) return;

        handler(+btn.dataset.itemToDecrease);
      });
  }

  generateMarkup(data) {
    return this.#generateMarkupItems(data.items).concat(
      this.#generateMarkupPaymentDetails(data.paymentDetails),
    );
  }

  #generateMarkupItems(items) {
    return items.map(it => this.#generateMarkupItem(it)).join('');
  }

  #generateMarkupPaymentDetails(paymentDetails) {
    return `
    <h5>Items Total: $<span id="items-total-price">${new Fraction(paymentDetails.totalItems)}</span></h5>
    <h5>Shipping: <span id="shipping-price">${paymentDetails.shipping ? '$' + new Fraction(paymentDetails.shipping) : 'FREE'}</span></h5>
    `;
  }

  #generateMarkupItem(item) {
    return `
    <li class="list-group-item d-flex justify-content-between align-items-center'">
      <div>
        <img src="${item.image}" alt=${item.title} width="50" height="50" />
        ${item.title} - $${item.price} ×
        <button class="btn btn-sm btn-outline-secondary me-1 quantity-btn quantity-btn-decrease" data-item-to-decrease=${item.id}>-</button>
        <span>${item.quantity}</span>
        <button class="btn btn-sm btn-outline-secondary ms-1 quantity-btn quantity-btn-increase" data-item-to-add=${item.id} >+</button>
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
