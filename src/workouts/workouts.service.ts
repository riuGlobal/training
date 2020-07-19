import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './workout.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkoutsService {
  constructor (
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>
  ) {}

  async show (uid: string): Promise<Workout> {
    return await this.workoutRepository.findOneOrFail({ uid });
  }

  async store (workout: Workout): Promise<Workout> {
    return (await this.workoutRepository.save(workout));
  }

  async update (id: number, workout: Workout): Promise<boolean> {
    return !!(await this.workoutRepository.update(id, workout));
  }

  async destroy (id: number, workout: Workout): Promise<boolean> {
    return (await this.workoutRepository.delete(id)).affected > 0;
  }
}
