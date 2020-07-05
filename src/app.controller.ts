import { Controller, Get, Body, Post, Headers, UsePipes, Inject, ParseIntPipe} from '@nestjs/common';
import { ExistsRecord } from './validators/repository.validator';
import { AppService } from './app.service';
import { Trainee } from './trainees/trainee.entity';
import { Header } from './decorators/user.decorator';

@Controller()
export class AppController {
  constructor (
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello (): string {
    return this.appService.getHello();
  }

  @Post()
  // @UsePipes(new ExistsRecord<Trainee>(this.traineeRepository))
  test (@Header('uid', new ExistsRecord(Trainee)) uid: string): string {
    return uid;
  }
}
