import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity()
export class Trainee {
  @PrimaryColumn()
  uid: string;

  @Column()
  isActive: boolean;
}
