import { API_URL } from './config';
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

  console.log(state.products);
};
