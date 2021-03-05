import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

@Module(
  {
    imports: [],
    providers: [
      {
        provide: ConfigurationService,
        useValue: new ConfigurationService(`${process.env.NODE_ENV || 'development'}.env`),
      },
    ],
    exports: [ ConfigurationService ] ,
    controllers: [],
  },
)

export class ConfigurationModule {}
