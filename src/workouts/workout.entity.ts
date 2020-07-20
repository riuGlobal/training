import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { PeriodOfTimeOfDay } from '../enums/enum.period-of-time-of-day';
import { ExerciseByWorkout } from 'src/exercises-by-workouts/exercise-by-workout.entity';
import { Trainee } from 'src/trainees/trainee.entity';

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // uid: string;

  @Column({
    type: 'date'
  })
  date: Date;

  @Column({
    type: 'time'
  })
  time: Date;

  @Column({
    type: 'enum',
    enum: PeriodOfTimeOfDay
  })
  periodOfTimeOfDay: PeriodOfTimeOfDay;

  @ManyToOne(type => Trainee)
  @JoinColumn()
  trainee: Trainee;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => ExerciseByWorkout, exerciseByWorkout => exerciseByWorkout.workout, { eager: true, cascade: true })
  @JoinTable()
  exerciseByWorkout: ExerciseByWorkout[];
}
