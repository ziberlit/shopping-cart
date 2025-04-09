import * as model from './model';
import productsView from './views/productsView';

const controlProducts = async function () {
  try {
    await model.loadProducts();
    productsView.render(model.state.products);
  } catch (err) {
    productsView.renderError();
    console.log(err);
  }
};

export default function init() {
  productsView.addHandlerRender(controlProducts);
}
