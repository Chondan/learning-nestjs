import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/exceptions/http-exception.filter';
import { ItemService } from './item/item.service';
import { RolesGuard } from './utils/guards/roles.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new HttpExceptionFilter(new ItemService()));
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  await app.listen(3000);
}
bootstrap();
