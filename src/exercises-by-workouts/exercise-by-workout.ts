import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Exercise } from 'src/exercises/exercise.entity';
import { Workout } from 'src/workouts/workout.entity';

@Entity('exercise_by_workout')
export class ExerciseByWorkout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exerciseId: number;

  @Column()
  categoryId: number;

  @Column()
  order: number;

  @ManyToOne(type => Exercise, exercise => exercise.exerciseByWorkout)
  exercise: Exercise;

  @ManyToOne(type => Workout, workout => workout.exerciseByWorkout)
  workout: Workout;
}
