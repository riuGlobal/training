import { Controller, Get, Body, Post, Headers, UsePipes, Inject, ParseIntPipe} from '@nestjs/common';
import { RecordExist } from './validators/repository.validator';
import { AppService } from './app.service';
import { Trainee } from './trainees/trainee.entity';
import { Header } from './decorators/global.decorator';

@Controller()
export class AppController {
  constructor (
    private readonly appService: AppService
  ) {}

  @Get()
  getHello (): string {
    return this.appService.getHello();
  }

  // @Post()
  // test (@Header('uid', new RecordExist(Trainee)) uid: string): string {
    // return uid;
  // }
}
