import { Injectable, Inject } from '@nestjs/common';
import { CatService } from '../cat/cat.service';

@Injectable()
export class ItemService {

	private items: string[] = ["Item1", "Item2"];

	// constructor(
	// 	private readonly catService: CatService,
	// ) {}
	@Inject()
	private readonly catService: CatService;

	getItem() {
		return this.items;
	}

	getCat() {
		return this.catService.findAll();
	}

	log() {
		console.log("hi from item");
	}

	findOne(id): [string] {
		return [this.items[id]];
	}

}
