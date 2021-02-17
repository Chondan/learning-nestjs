import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

type Role = "admin" | "user";

export function Auth(...roles: Role[]) {
	return applyDecorators(
		SetMetadata('roles', roles),
		UseGuards(AuthGuard, RolesGuard),
	);
}