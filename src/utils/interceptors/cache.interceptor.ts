import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export default class CacheInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler) {
		const isCached = true;
		if (isCached) return of({ type: "cache", data: [] }); // return a new stream, created by the RxJS 'of()' operator
		return next.handle();
	}
}