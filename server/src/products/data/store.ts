import { Product } from '../entities/product.entity';

let store: { data: Product[] } = { data: [] };

async function bootUpStore() {
  await import('./mock.json').then((mockData) => {
    store.data = mockData;
  });
}

export default store;

export { bootUpStore };
