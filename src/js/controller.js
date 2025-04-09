import * as model from './model';

const controlProducts = async function () {
  try {
    await model.loadProducts();
  } catch (err) {
    console.log(err);
  }
};

export default function init() {
  ['load'].forEach(ev => window.addEventListener(ev, controlProducts));
}
