import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './workout.entity';
import { Repository } from 'typeorm';
import { ExerciseByWorkout } from 'src/exercises-by-workouts/exercise-by-workout.entity';

@Injectable()
export class WorkoutsService {
  constructor (
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>
  ) {}

  async show (uid: string): Promise<Workout[]> {
    return await this.workoutRepository.find({ uid });
  }

  async store (workouts: any[]): Promise<Workout[]> {
    const wo = [];
    await workouts.forEach(async workoutDto => {
      let workout = new Workout();
      workout.exerciseByWorkout = [];
      await workoutDto.exercises.forEach((exercise, index: number) => {
        const exerciseByWorkout = new ExerciseByWorkout();
        exerciseByWorkout.exerciseId = exercise.id;
        exerciseByWorkout.order = index;
        exerciseByWorkout.workoutId = workout.id;
        workout.exerciseByWorkout.push(exerciseByWorkout);
      });
      workout = { ...workoutDto, ...workout };
      wo.push(workout);
    });

    return (await this.workoutRepository.save(wo));
  }

  async update (id: number, workout: Workout): Promise<boolean> {
    return !!(await this.workoutRepository.update(id, workout));
  }

  async destroy (id: number): Promise<boolean> {
    return (await this.workoutRepository.delete(id)).affected > 0;
  }
}
