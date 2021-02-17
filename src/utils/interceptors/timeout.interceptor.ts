import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export default class TimeoutInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler) {
		return next.handle().pipe(
			timeout(500),
			catchError(err => {
				if (err instanceof TimeoutError) return throwError(new RequestTimeoutException());
				return throwError(err);
			})
		)
	}
}