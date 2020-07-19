import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Exercise } from "src/exercises/exercise.entity";
import { Workout } from "src/workouts/workout.entity";

@Entity()
export class ExerciseByWorkout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exerciseId: number
  
  @Column()
  categoryId: number

  @Column()
  public order: number

  @ManyToOne(type => Exercise, exercise => exercise.exerciseByWorkout)
  public exercise: Exercise

  @ManyToOne(type => Workout, workout => workout.exerciseByWorkout)
  public workout: Workout

}
