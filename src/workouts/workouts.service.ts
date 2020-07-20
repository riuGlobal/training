import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './workout.entity';
import { Repository } from 'typeorm';
import { Trainee } from 'src/trainees/trainee.entity';

@Injectable()
export class WorkoutsService {
  constructor (
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>
  ) {}

  async show (trainee: Trainee): Promise<Workout[]> {
    return await this.workoutRepository.find({ trainee });
  }

  async store (trainee: Trainee, workouts: Workout[]): Promise<Workout[]> {
    return (await this.workoutRepository.save(workouts.map(workout => {
      return { ...workout, trainee };
    })));
  }

  async update (id: number, workout: Workout): Promise<boolean> {
    return !!(await this.workoutRepository.update(id, workout));
  }

  async destroy (id: number): Promise<boolean> {
    const workout = await this.workoutRepository.findOne(id);
    return (await this.workoutRepository.remove([workout])).length > 0;
  }
}
