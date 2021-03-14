import {
  Controller,
  Get,
  Query,
  OnApplicationBootstrap,
  ParseIntPipe,
} from '@nestjs/common';
import { CustomLogger } from '../../base/logger/logger.service';
import { ProductService } from './product.service';

@Controller('Product')
export class ProductController implements OnApplicationBootstrap {
  constructor(
    private productService: ProductService,
    private logger: CustomLogger,
  ) {}

  public async onApplicationBootstrap() {}

  @Get()
  public async findProducts(
    @Query('limit', ParseIntPipe) limit,
    @Query('page', ParseIntPipe) page,
    @Query('gender') gender: string = 'female',
    @Query('sort') sort: string = 'popularity',
  ) {
    try {
      const query = {
        page_size: limit || 100, page, gender, sort,
      };
      const products = this.productService.getProducts(query);
      return products;
    } catch (exception) {
      this.logger.log('exception response', exception);
    }
  }
}
