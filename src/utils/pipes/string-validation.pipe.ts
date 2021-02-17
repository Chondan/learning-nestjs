import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class StringValidationPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		console.log('string validation');
		if (typeof value == typeof "string") return value;
		throw new BadRequestException("Validation Failed");
	}
}