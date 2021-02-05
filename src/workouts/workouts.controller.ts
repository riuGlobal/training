import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { Workout } from './workout.entity';
import { Header } from 'src/decorators/global.decorator';
import { RecordPipe } from 'src/validators/repository.validator';
import { Trainee } from 'src/trainees/trainee.entity';

@Controller('workouts')
export class WorkoutsController {
  constructor (
    private workoutService: WorkoutsService
  ) {}

  @Get()
  async show (@Header('uid', new RecordPipe<Trainee>(Trainee)) trainee: Trainee): Promise<Workout[]> {
    return await this.workoutService.show(trainee);
  }

  @Post()
  async store (@Header('uid', new RecordPipe<Trainee>(Trainee)) trainee: Trainee, @Body() workouts: Workout[]): Promise<Workout[]> {
    return await this.workoutService.store(trainee, workouts);
  }

  @Put(':id')
  async update (@Param('id') id: number, @Body() workout: Workout): Promise<boolean> {
    return await this.workoutService.update(id, workout);
  }

  @Delete(':id')
  async destroy (@Param('id') id: number): Promise<boolean> {
    return await this.workoutService.destroy(id);
  }
}
