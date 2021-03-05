import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('Product Controller', () => {
  let controller: ProductController;

  const ProductServiceMock = { getProduct: (ProductId: string) => '{_id: 123345678}' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
    .overrideProvider(ProductService)
    .useValue(ProductServiceMock)
    .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });
});
