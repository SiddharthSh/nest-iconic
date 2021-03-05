import {HttpModule, MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { LoggerMiddleware } from './base/logger/logger.middleware';
import { LoggerModule } from './base/logger/logger.module';
import {ConfigurationModule} from './modules/configuration/configuration.module';
import {ProductModule} from './modules/product/product.module';

@Module({
  imports: [
    HttpModule,
    ConfigurationModule,
    LoggerModule,
    ProductModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
