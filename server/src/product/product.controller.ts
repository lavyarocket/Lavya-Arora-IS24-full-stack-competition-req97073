import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from "./entities/product.entity";

//API Endpoints Response code Setup for Products
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //Add New Product
  @ApiOkResponse({ type: Product, status: HttpStatus.CREATED })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  //Find all Products
  @ApiOkResponse({ type: Product, isArray: true, status: HttpStatus.OK })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.productService.findAll();
  }

  //Find a Given Product
  @ApiOkResponse({ type: Product, status: HttpStatus.OK })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  //Update a given product entry
  @ApiOkResponse({ type: Product, status: HttpStatus.OK })
  @ApiBadRequestResponse({status: HttpStatus.BAD_REQUEST})
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  //Delete a given Product Entry
  @ApiOkResponse({status: HttpStatus.NO_CONTENT})
  @ApiBadRequestResponse({status: HttpStatus.BAD_REQUEST})
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
