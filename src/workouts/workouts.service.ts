import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './workout.entity';
import { Repository } from 'typeorm';
import { ExerciseByWorkout } from 'src/exercises-by-workouts/exercise-by-workout.entity';
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

  async store (trainee: Trainee, workoutsDto: any[]): Promise<Workout[]> {
    const workouts = [];
    await workoutsDto.forEach(async workoutDto => {
      let workout = new Workout();
      workout.exerciseByWorkout = [];
      await workoutDto.exercises.forEach((exercise, index: number) => {
        const exerciseByWorkout = new ExerciseByWorkout();
        exerciseByWorkout.exerciseId = exercise.id;
        exerciseByWorkout.order = index;
        exerciseByWorkout.workoutId = workout.id;
        exerciseByWorkout.reps = exercise.reps;
        exerciseByWorkout.time = exercise.time;
        workout.exerciseByWorkout.push(exerciseByWorkout);
      });

      workout = { ...workoutDto, ...workout, trainee };
      workouts.push(workout);
    });

    return (await this.workoutRepository.save(workouts));
  }

  async update (id: number, workout: Workout): Promise<boolean> {
    return !!(await this.workoutRepository.update(id, workout));
  }

  async destroy (id: number): Promise<boolean> {
    const workout = await this.workoutRepository.findOne(id);
    return (await this.workoutRepository.remove([workout])).length > 0;
  }
}
