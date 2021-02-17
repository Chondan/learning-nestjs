import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatService {
	private readonly cats: Cat[] = [{ name: "Cat1", age: 10, breed: "Thai" }];

	create(cat: Cat) {
		this.cats.push(cat);
	}

	findAll(): Cat[] {
		return this.cats;
	}
}
