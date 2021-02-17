import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  
	constructor(private reflector: Reflector) {}
  	
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {

		const roles = this.reflector.get<string[]>('roles', context.getHandler());

		const request = context.switchToHttp().getRequest();
		request.user = { name: "Chondan", age: 22 };

		if (!roles.includes('admin')) return false;
		if (!roles) return true;

		const user = request.user;
		if (!user) throw new UnauthorizedException();
		return ['user'].some(role => roles.includes(role));
	}
}