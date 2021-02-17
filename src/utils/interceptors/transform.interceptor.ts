import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
	data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler) {
		return next.handle().pipe(
			map(data => ({ data })),
		)
	}
}