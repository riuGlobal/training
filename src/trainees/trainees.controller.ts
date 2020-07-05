import { Controller, Get, Headers, Post, Body, Delete, UseGuards, Patch } from '@nestjs/common';
import { TraineesService } from './trainees.service';
import { Trainee } from './trainee.entity';
import { UserGuard } from 'src/auth/user.guard';

@Controller('trainees')
@UseGuards(UserGuard)
export class TraineesController {
  constructor (
    private readonly traineeService: TraineesService
  ) {}

  @Get()
  async show (@Headers('uid') uid :string): Promise<Trainee> {
    return await this.traineeService.show(uid);
  }

  @Post()
  async store (@Headers('uid') uid :string): Promise<boolean> {
    return await this.traineeService.store(uid);
  }

  @Patch()
  async update (@Headers('uid') uid :string, @Body() trainee: Trainee): Promise<boolean> {
    return await this.traineeService.update(uid, {
      uid,
      ...trainee
    });
  }

  @Delete()
  async destroy (@Headers('uid') uid :string) : Promise<boolean> {
    return await this.traineeService.destroy(uid);
  }
}
