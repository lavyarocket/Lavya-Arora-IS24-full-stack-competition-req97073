import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import store, { addData } from './data/store';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    (createProductDto as any).productId = store.counter;
    addData(createProductDto as Product);
  }

  findAll() {
    return store.data;
  }

  findOne(id: number) {
    return store.data.find((e) => e.productId === id) || {};
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const _existingProduct = this.findOne(id);

    if (Object.keys(_existingProduct).length > 0) {
      const existingProduct = _existingProduct as Product;

      if (updateProductDto.productName) {
        existingProduct.productName = updateProductDto.productName;
      }
      if (updateProductDto.productOwnerName) {
        existingProduct.productOwnerName = updateProductDto.productOwnerName;
      }
      if (updateProductDto.methodology) {
        existingProduct.methodology = updateProductDto.methodology;
      }
      if (updateProductDto.scrumMasterName) {
        existingProduct.scrumMasterName = updateProductDto.scrumMasterName;
      }
      if (updateProductDto.Developers) {
        existingProduct.Developers = updateProductDto.Developers;
      }
      if (updateProductDto.startDate) {
        existingProduct.startDate = updateProductDto.startDate;
      }
    } else {
      throw new BadRequestException('Product ID specified does not exist.');
    }
  }

  remove(id: number) {
    return store.data = store.data.filter(e=>e.productId!==id);
  }
}
