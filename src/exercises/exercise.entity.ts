import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { IsUniqueIndex } from '../validators/repository/repository.unique';
import { ExerciseByWorkout } from 'src/exercises-by-workouts/exercise-by-workout.entity';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @IsUniqueIndex(Exercise)
  @IsNotEmpty()
  @Index({ unique: true })
  @Column()
  designation: string;

  @IsNotEmpty()
  @Column()
  description: string;

  @OneToMany(type => ExerciseByWorkout, exerciseByWorkoout => exerciseByWorkoout.exercise)
  exerciseByWorkout: ExerciseByWorkout[];
}
