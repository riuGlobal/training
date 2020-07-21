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
  workoutId: number;

  @Column()
  order: number;

  @Column()
  reps: number

  // Time of rep in seconds
  @Column()
  time: number

  @ManyToOne(type => Exercise, exercise => exercise.exerciseByWorkout, { eager: true, nullable: false })
  exercise: Exercise;

  @ManyToOne(type => Workout, workout => workout.exerciseByWorkout, { onDelete: 'CASCADE', nullable: false })
  workout: Workout;
}
