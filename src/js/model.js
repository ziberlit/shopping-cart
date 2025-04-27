import { API_URL, MAX_SHIPPING, SHIPPING_THRESHOLD } from './config';
import { getJSON } from './helpers';

export const state = {
  products: [],
};

export const loadProducts = async function (query) {
  const json = await getJSON(`${API_URL}/products`);
  state.products = json.map(prod => ({
    id: prod.id,
    title: prod.title,
    price: prod.price,
    image: prod.image,
  }));
};

export const loadCart = function () {
  state.cart = JSON.parse(localStorage.getItem('cart')) || {
    items: [],
    paymentDetails: {
      totalItems: 0,
      shipping: 0,
    },
    productsInCart: 0,
  };
};

export const storeCart = function () {
  // Store the cart in local storage
  localStorage.setItem('cart', JSON.stringify(state.cart));
};

export const addItemToCart = itemId => {
  let itemIndex = state.cart.items.findIndex(it => it.id === itemId);

  if (itemIndex !== -1) {
    // Item is already in the cart, increase the quantity
    state.cart.items[itemIndex].quantity++;
  } else {
    // Item is not in the cart, add it to the cart
    const item = state.products.find(it => it.id === itemId);
    const { id, title, price, image } = item;
    itemIndex =
      state.cart.items.push({ id, title, price, image, quantity: 1 }) - 1;
  }
  state.cart.productsInCart++;
  state.cart.paymentDetails.totalItems += state.cart.items[itemIndex].price;
  if (
    state.cart.productsInCart > SHIPPING_THRESHOLD &&
    state.cart.paymentDetails.shipping < MAX_SHIPPING
  ) {
    state.cart.paymentDetails.shipping += 10;
  }

  storeCart();
};

export const removeItemFromCart = itemId => {
  const itemIndex = state.cart.items.findIndex(it => it.id === itemId);
  if (itemIndex !== -1) {
    // Item is in the cart, remove it
    state.cart.paymentDetails.totalItems -=
      state.cart.items[itemIndex].price * state.cart.items[itemIndex].quantity;
    state.cart.productsInCart -= state.cart.items[itemIndex].quantity;
    if (
      state.cart.paymentDetails.shipping > 0 &&
      state.cart.productsInCart <= SHIPPING_THRESHOLD
    ) {
      // If the number of products in the cart is less than the threshold, remove shipping cost
      state.cart.paymentDetails.shipping -= 10;
    }
    state.cart.items.splice(itemIndex, 1);
  }

  storeCart();
};

export const decreaseItemQuantity = itemId => {
  const itemIndex = state.cart.items.findIndex(it => it.id === itemId);
  if (itemIndex !== -1) {
    // Item is in the cart, decrease the quantity
    state.cart.items[itemIndex].quantity--;
    state.cart.productsInCart--;
    state.cart.paymentDetails.totalItems -= state.cart.items[itemIndex].price;
    if (
      state.cart.paymentDetails.shipping > 0 &&
      state.cart.productsInCart <= SHIPPING_THRESHOLD
    ) {
      // If the number of products in the cart is less than the threshold, remove shipping cost
      state.cart.paymentDetails.shipping -= 10;
    }
    if (state.cart.items[itemIndex].quantity === 0) {
      state.cart.items.splice(itemIndex, 1);
    }
  }

  storeCart();
};
