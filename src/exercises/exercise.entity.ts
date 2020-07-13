import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('exercise')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  designation: string;

  @Column()
  description: string;
}
