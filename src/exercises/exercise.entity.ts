import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('exercise')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Index({ unique: true })
  @Column()
  designation: string;

  @IsNotEmpty()
  @Column()
  description: string;
}
