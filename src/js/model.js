import { API_URL } from './config';
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
        quantity: 3,
      },
    ],
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

  console.log(state.products);
};

export const addItemToCart = id => {
  const itemIndex = state.cart.items.findIndex(it => it.id === id);

  if (itemIndex !== -1) {
    // Item exists, increase the quantity
    state.cart.items[itemIndex].quantity++;
  } else {
    // Item doesn't exist, add it to the cart
    const item = state.products.find(it => it.id === id);
    if (item) {
      const { id, title, price, image } = item;
      state.cart.items.push({ id, title, price, image, quantity: 1 });
    }
  }
};
