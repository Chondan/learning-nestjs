import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemMiddleware } from './item.middleware';

@Module({
	controllers: [ItemController],
	providers: [ItemService],
	
})
export class ItemModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(ItemMiddleware)
			.forRoutes(ItemController);
	}
}
