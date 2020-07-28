import { Controller, Get, Post, Param, Delete, Query, Body, Put, ParseArrayPipe } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { Exercise } from './exercise.entity';
import { RecordExists } from 'src/validators/repository.validator';

@Controller('exercises')
export class ExercisesController {
  constructor (
    private readonly exerciseService: ExercisesService
  ) {}

  @Get()
  async index (@Query('ids', new ParseArrayPipe({ items: Number, separator: ',', optional: true })) ids: number[], @Query('designation') designation: string): Promise<Exercise[]> {
    return await this.exerciseService.index(ids, designation);
  }

  @Post()
  async store (@Body(new ParseArrayPipe({ items: Exercise })) exercise: Exercise[]) : Promise<Exercise[]> {
    return await this.exerciseService.store(exercise);
  }

  @Put(':id')
  async update (@Param('id', new RecordExists(Exercise)) id: number, @Body() exercise: Exercise): Promise<boolean> {
    return await this.exerciseService.update(id, exercise);
  }

  @Delete(':id')
  async destroy (@Param('id') id: number): Promise<boolean> {
    return await this.exerciseService.delete(id);
  }
}
