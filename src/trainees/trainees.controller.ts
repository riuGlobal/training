import { Controller, Get, Headers } from '@nestjs/common';
import { TraineesService } from './trainees.service';
import { Trainee } from './trainee.entity';

@Controller('trainees')
export class TraineesController {
  constructor (
    private readonly traineeService: TraineesService
  ) {}

  @Get()
  async show (@Headers('uid') uid :string): Promise<Trainee> {
    return this.traineeService.show(uid);
  }
}
