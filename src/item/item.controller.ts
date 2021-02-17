import { Controller, Get, HttpException, 
	HttpStatus, UseFilters, Body, Param, ParseIntPipe, DefaultValuePipe,
	Query, UseGuards, Post, SetMetadata, UseInterceptors, ValidationPipe as VPipe
} from '@nestjs/common';
import { ItemService } from './item.service';
import { ForbiddenException } from '../utils/exceptions/forbidden.exception';
import { HttpExceptionFilter } from '../utils/exceptions/http-exception.filter';
import { ValidationPipe } from './validation.pipe';
import { ParseIntPipe as MyParseIntPipe } from '../utils/pipes/parse-int.pipe';
import { RolesGuard } from '../utils/guards/roles.guard';
import { Roles } from '../utils/decorators/role.decorator';
import { TransformInterceptor } from '../utils/interceptors/transform.interceptor';
import { ErrorsInterceptor } from '../utils/interceptors/errors.interceptor';
import CacheInterceptor from '../utils/interceptors/cache.interceptor';
import { TimeoutInterceptor } from '../utils/interceptors/index.interceptor';
import { User } from '../utils/decorators/user.decorator';
import { StringValidationPipe } from '../utils/pipes/string-validation.pipe';
import { Auth } from '../utils/decorators/auth.decorator';

class Item {
	name: string;
}

interface UserEntity {
	name: string;
	age: number;
}

@Controller('item')
export class ItemController {
	constructor(private readonly itemService: ItemService) {}

	@Get()
	@UseInterceptors(TransformInterceptor)
	getItem(): string[] {
		return this.itemService.getItem();
	}

	@Get('cats')
	@UseFilters(HttpExceptionFilter)
	getCats() {
		return this.itemService.getCat();
	}

	@Get('exception')
	@UseInterceptors(ErrorsInterceptor)
	async exception() {
		throw new HttpException({
			status: HttpStatus.FORBIDDEN,
			error: 'This is a custom message'
		}, HttpStatus.FORBIDDEN);
	}

	@Get('custom-exception')
	async customException() {
		throw new ForbiddenException();
	}

	@Get('filter-exception')
	async getItemException(@Body() item: Item) {
		throw new ForbiddenException();
	}

	@Get('findItem/:id')
	async findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
		return this.itemService.findOne(id);
	}

	@Get('findMyItem/:id')
	async findMyItem(@Param('id', ValidationPipe) id: any) {
		return this.itemService.findOne(id);
	}

	@Get('/otherItem')
	async findItemByid(@Query('id', new DefaultValuePipe(0), new MyParseIntPipe()) id: string) {
		return this.itemService.findOne(id)
	}

	@Post()
	@Roles('admin')
	async addItem() {
		return 'added item';
	}

	@UseInterceptors(CacheInterceptor)
	@Get('cache')
	getCache() {
		return this.itemService.getItem();
	}

	@Get('wait')
	@UseInterceptors(TimeoutInterceptor)
	wait() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('Are you waiting?');
			}, 1000);
		});
	}
	
	@Get('user')
	async getUser(@User() user: UserEntity) {
		return user;
	}

	@Get('username')
	async getUsername(@User('name', new StringValidationPipe()) name: string) {
		return name;
	}

	@Get('auth')
	@Auth('user')
	async getAuth() {
		return 'authorised';
	}

}
