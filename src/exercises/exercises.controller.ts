import { Controller, Get, Post, Param, Delete, Query, Body, Put } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { Exercise } from './exercise.entity';
import { StringToNumbersArrayPipe } from '../pipes/stringToArray.pipe';

@Controller('exercises')
export class ExercisesController {
  constructor (
    private readonly exerciseService: ExercisesService
  ) {}

  @Get()
  async index (@Query('id', new StringToNumbersArrayPipe()) ids: number[], @Query('designation') designation: string): Promise<Exercise[]> {
    return await this.exerciseService.index(ids, designation);
  }

  @Post()
  async store (@Body() exercise: Exercise[]) : Promise<Exercise[]> {
    return await this.exerciseService.store(exercise);
  }

  @Put(':id')
  async update (@Param(':id') id: number, @Body() exercise: Exercise): Promise<boolean> {
    return await this.exerciseService.update(id, exercise);
  }

  @Delete(':id')
  async destroy (@Param('id') id: number): Promise<boolean> {
    return await this.exerciseService.delete(id);
  }
}
