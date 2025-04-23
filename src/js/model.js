import { API_URL, SHIPPING_THRESHOLD } from './config';
import { getJSON } from './helpers';

export const state = {
  products: [],
  cart: {
    items: [
      {
        id: 2,
        title: 'Mens Casual Premium Slim Fit T-Shirts ',
        price: 22.3,
        image:
          'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
        quantity: 1,
      },
    ],
    paymentDetails: {
      totalItems: 22.3,
      shipping: 10,
    },
    productsInCart: 1,
  },
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
  if (state.cart.productsInCart > SHIPPING_THRESHOLD) {
    state.cart.paymentDetails.shipping += 10;
  }
};
