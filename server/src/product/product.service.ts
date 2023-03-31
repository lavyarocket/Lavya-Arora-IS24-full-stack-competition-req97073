import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import store, { addData, updateData, deleteData } from './data/store';

//Product Endpoints Setup
@Injectable()
export class ProductService {
  //Create New Product Endpoint
  create(createProductDto: CreateProductDto) {
    return addData(createProductDto);
  }

  //Get list of all Products Endpoint
  findAll() {
    return store.data;
  }

  //Find a given Product based on Product ID Endpoint
  findOne(id: string) {
    return store.data.find((e) => e.productId === id) || {};
  }

  //Update a given Product Entry (Uses findOne nested within)
  update(id: string, updateProductDto: UpdateProductDto) {
    const _existingProduct = this.findOne(id);

    if (Object.keys(_existingProduct).length > 0) {
      return updateData(id, updateProductDto);
    } else {
      throw new BadRequestException('Product ID specified does not exist.');
    }
  }

  //Delete a product entry Endpoint
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
