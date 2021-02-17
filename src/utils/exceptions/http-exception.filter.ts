import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Inject, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ItemService } from '../../item/item.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

	@Inject()
	private readonly itemService: ItemService;

	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception instanceof HttpException
			? exception.getStatus()
			: HttpStatus.INTERNAL_SERVER_ERROR;

		console.log('filter-exception');
		this.itemService.log();

		response
			.status(status)
			.json({
				statusCode: status,
				timestamp: new Date().toISOString(),
				path: request.url,
				error: HttpStatus[status]
			});
	}
}