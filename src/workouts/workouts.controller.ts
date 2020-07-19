import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { Workout } from './workout.entity';
import { Header } from 'src/decorators/global.decorator';

@Controller('workouts')
export class WorkoutsController {
  constructor (
    private workoutService: WorkoutsService
  ) {}

  @Get()
  async show (@Header('uid') uid: string): Promise<Workout[]> {
    return this.workoutService.show(uid);
  }

  @Post()
  async store (@Header('uid') uid: string, @Body() workouts: Workout[]): Promise<Workout[]> {
    return await this.workoutService.store(workouts
      .map(workout => { return { ...workout, uid }; }));
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
