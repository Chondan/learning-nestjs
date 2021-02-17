import { Controller, Get, HttpCode, Res, Req, Ip, Query, Redirect, HttpStatus, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { CreateCatDto } from './cat/dto/create-cat.dto';

const cats = ["cat1", "cat2"];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
  	console.log(HttpStatus);
    return this.appService.getHello();
  }

  @Get('person')
  @HttpCode(200)
  getPerson(): { name: string, age: number } {
  	return { name: "Chondan", age: 22 };
  }

  @Get('google')
  @Redirect('https://youtube.com', 301)
  goToGoogle(): { url: string, statusCode: number } {
  	return {
  		"url": "https://google.com",
  		"statusCode": 301
  	};
  }

  // CAT
  @Get('cats')
  findAll(): string[] {
    return cats;
  }

  @Get('/cat/catId/:id')
  getCat(@Req() request: Request, @Ip() ip, @Query("color") color): string {
    console.log(request.params);
      console.log(request.query);
      console.log('Incoming Request from', ip);
      console.log('Request ' + color + ' cat');
      return 'This action return a ' + color + ' cat';
  }

  @Get('/ab*cd')
  function() {
    return 'Wildcards';
  }

  @Get('cat/promise')
  async getPromiseCat(): Promise<any[]> {
    return Promise.resolve([
      "Football", "Listening to Music"
    ]);
  }

  @Post('addCat')
  async create(@Body() createCatDto: CreateCatDto) {
    cats.push(`cat${cats.length + 1}`);
    return 'This action adds a new cat'
  }

}
