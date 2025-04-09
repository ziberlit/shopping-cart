import { isEmptyArray } from '../helpers';

class View {
  #parentElement;
  #errorMessage = '';

  constructor({ parentElement, errorMessage }) {
    if (this.generateMarkup === undefined) {
      throw new Error('You have to implement the method generateMarkup!');
    }

    this.#parentElement = parentElement;
    this.#errorMessage = errorMessage;
  }

  clear() {
    this.#parentElement.innerHTML = '';
  }

  render(data) {
    if (!data || isEmptyArray(data)) {
      this.renderError();
      return;
    }

    this.clear();
    const markup = this.generateMarkup(data);
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this.#errorMessage) {
    const markup = `
        <div class="alert alert-primary" role="alert">
            ${message}
        </div>
        `;

    this.clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default View;
