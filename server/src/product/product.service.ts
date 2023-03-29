import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import store, { addData, updateData, deleteData } from './data/store';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  create(createProductDto: CreateProductDto) {
    return addData(createProductDto);
  }

  findAll() {
    return store.data;
  }

  findOne(id: string) {
    return store.data.find((e) => e.productId === id) || {};
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const _existingProduct = this.findOne(id);

    if (Object.keys(_existingProduct).length > 0) {
      return updateData(id, updateProductDto);
    } else {
      throw new BadRequestException('Product ID specified does not exist.');
    }
  }

  remove(id: string) {
    const _existingProduct = this.findOne(id);
    
    if(Object.keys(_existingProduct).length > 0) {
      deleteData(id);
    } else {
      throw new BadRequestException('Product ID specified does not exist.');
    }

    return null;
  }
}
