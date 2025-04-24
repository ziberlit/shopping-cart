import * as model from './model';
import productsView from './views/productsView';
import cartView from './views/cartView';

const controlProducts = async function () {
  try {
    await model.loadProducts();
    productsView.render(model.state.products);
  } catch (err) {
    productsView.renderError();
  }
};

const controlDisplayCart = function () {
  try {
    cartView.render(model.state.cart);
  } catch (err) {
    cartView.renderError();
  }
};

const controlAddToCart = function (itemToAdd) {
  model.addItemToCart(itemToAdd);
  cartView.render(model.state.cart);
};

const controlDecreaseItemQuantity = function (itemToDecrease) {
  model.decreaseItemQuantity(itemToDecrease);
  cartView.render(model.state.cart);
};

export default function init() {
  productsView.addHandlerRender(controlProducts);
  cartView.addHandlerRender(controlDisplayCart);
  cartView.addHandlerAddToCart(controlAddToCart);
  cartView.addHandlerIncreaseItemQuantity(controlAddToCart);
  cartView.addHandlerDecreaseItemQuantity(controlDecreaseItemQuantity);
}
