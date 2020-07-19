import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Exercise } from 'src/exercises/exercise.entity';
import { Workout } from 'src/workouts/workout.entity';

@Entity('exercise_by_workout')
export class ExerciseByWorkout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exerciseId: number;

  @Column()
  workoutId: number;

  @Column()
  order: number;

  @ManyToOne(type => Exercise, exercise => exercise.exerciseByWorkout, { eager: true })
  @JoinTable()
  exercise: Exercise;

  @ManyToOne(type => Workout, workout => workout.exerciseByWorkout)
  workout: Workout;
}
