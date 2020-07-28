import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { IsUniqueIndex } from '../validators/repository/repository.unique';

@Entity('exercise')
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
}
