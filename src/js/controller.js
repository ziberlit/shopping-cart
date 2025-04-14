import * as model from './model';
import productsView from './views/productsView';
import cartView from './views/cartView';

const controlProducts = async function () {
  try {
    await model.loadProducts();
    productsView.render(model.state.products);
  } catch (err) {
    productsView.renderError();
    console.log(err);
  }
};

const controlDisplayCart = function () {
  try {
    cartView.render(model.state.cart.items);
  } catch (err) {
    cartView.renderError();
    console.log(err);
  }
};

const controlAddToCart = function (itemToAdd) {
  model.addItemToCart(itemToAdd);
  console.log(itemToAdd);
  cartView.render(model.state.cart.items);
};

export default function init() {
  productsView.addHandlerRender(controlProducts);
  productsView.addHandlerClick(controlAddToCart);
  cartView.addHandlerRender(controlDisplayCart);
}
