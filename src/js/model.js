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
