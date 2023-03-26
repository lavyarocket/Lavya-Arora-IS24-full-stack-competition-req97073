import { Product } from '../entities/product.entity';

let store: { data: Product[], counter: number } = { data: [], counter: 1 };

function addData(data: Product) {
  store.data.push(data);
  store.counter++;
}

async function bootUpStore() {
  await import("./mock.json").then(data=>{
    let i = 1;
    for(const product of data) {
      addData({...product, productId: i++});
    }
  })
}

export default store;

export { bootUpStore, addData };
