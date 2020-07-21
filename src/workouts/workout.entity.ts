import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { PeriodOfTimeOfDay } from '../enums/enum.period-of-time-of-day';
import { ExerciseByWorkout } from 'src/exercises-by-workouts/exercise-by-workout.entity';
import { Trainee } from 'src/trainees/trainee.entity';

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'date'
  })
  startedAtDate: Date;

  @Column({
    nullable: true,
    type: 'time'
  })
  startedAtTime: Date;

  @Column({
    nullable: true,
    type: 'enum',
    enum: PeriodOfTimeOfDay
  })
  periodOfTimeOfDay: PeriodOfTimeOfDay;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => Trainee, { nullable: false })
  trainee: Trainee;

  @OneToMany(type => ExerciseByWorkout, exerciseByWorkout => exerciseByWorkout.workout, { eager: true, cascade: true })
  exerciseByWorkout: ExerciseByWorkout[];
}
