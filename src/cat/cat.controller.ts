import { 
	Controller, Get, Req, Ip, Query, Post, Body, HttpException, HttpStatus, UsePipes,
	UseGuards, SetMetadata, UseInterceptors
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatService } from './cat.service';
import { Cat } from './interfaces/cat.interface';
import { CatSchema } from './schemas/cat.schema';
import { JoiValidationPipe } from '../utils/pipes/joi-validation.pipe';
import { ClassValidationPipe } from '../utils/pipes/class-validator.pipe';
import { AuthGuard } from '../utils/guards/auth.guard';
import { LoggingInterceptor } from '../utils/interceptors/loggin.interceptor';

@Controller('cat')
export class CatController {

	private catsService: CatService;
	constructor(catsService: CatService) {
		this.catsService = catsService;
	}

	@Get()
	@UseInterceptors(LoggingInterceptor)
	async findAllCat(): Promise<Cat[]> {
		return this.catsService.findAll();
	}

	@Post()
	// class-validator
	async create(@Body(new ClassValidationPipe()) createCatDto: CreateCatDto): Promise<string> {
		this.catsService.create(createCatDto);
		return 'Added Cat';
	}

	@Post('add')
	@UseGuards(AuthGuard)
	@UsePipes(new JoiValidationPipe(CatSchema)) // Object schema validation
	async anotherCreate(@Body() createCatDto: CreateCatDto): Promise<string> {
		this.catsService.create(createCatDto);
		return 'Added Cat';
	}


	@Get('exception')
	async exception() {
		throw new HttpException({
			status: HttpStatus.FORBIDDEN,
			error: 'This is a custom message'
		}, HttpStatus.FORBIDDEN);
	}

}
