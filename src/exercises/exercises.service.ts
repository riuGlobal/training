import { Injectable } from '@nestjs/common';
import { Exercise } from './exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Like } from 'typeorm';

@Injectable()
export class ExercisesService {
  constructor (
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>
  ) {}

  async index (ids: number[], designation = ''): Promise<Exercise[]> {
    return this.exerciseRepository.find({
      ...ids && { id: In(ids) },
      designation: Like('%' + designation + '%')
    });
  }

  async store (exercises: Exercise[]): Promise<Exercise[]> {
    return (await this.exerciseRepository.save(exercises));
  }

  async update (id: number, exercise: Exercise): Promise<boolean> {
    return (await this.exerciseRepository.update(id, exercise)).affected > 0;
  }

  async delete (id: number): Promise<boolean> {
    return (await this.exerciseRepository.delete(id)).affected > 0;
  }
}
