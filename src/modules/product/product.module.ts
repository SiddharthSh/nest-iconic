import { HttpModule, Module } from '@nestjs/common';
import { CustomLogger } from '../../base/logger/logger.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [HttpModule],
  controllers: [ProductController],
  providers: [ProductService, CustomLogger],
  exports: [ProductService],
})
export class ProductModule {}
