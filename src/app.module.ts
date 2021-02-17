import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatController } from './cat/cat.controller';
import { CatService } from './cat/cat.service';
import { CatModule } from './cat/cat.module';
import { ItemController } from './item/item.controller';
import { ItemService } from './item/item.service';
import { ItemModule } from './item/item.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/exceptions/http-exception.filter';

@Module({
  controllers: [AppController, CatController, ItemController],
  providers: [AppService, CatService, ItemService, 
  	{
  		provide: APP_FILTER,
  		useClass: HttpExceptionFilter,
  	},
  ],
  imports: [CatModule, ItemModule],
})
export class AppModule {}
