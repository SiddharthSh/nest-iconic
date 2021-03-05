import { Controller, Get, Query, OnApplicationBootstrap, ParseIntPipe } from '@nestjs/common';
import { CustomLogger } from '../../base/logger/logger.service';
import { ProductService } from './product.service';

@Controller('Product')
export class ProductController implements OnApplicationBootstrap {
  constructor( private productService: ProductService, private logger: CustomLogger ) { }

  public async onApplicationBootstrap() {}

  @Get()
  public async findProducts(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('gender') gender: string,
    @Query('sort') sort: string,
  ) {
    try {
      this.logger.log('checking for products', `limit ${limit}`);
      const products = this.productService.getProducts();
      return products;
    } catch (exception) {
      this.logger.log('exception response', exception);
    }
  }
}
