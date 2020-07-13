import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
@Entity('trainees')
export class Trainee {
  @PrimaryColumn()
  uid: string;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn({
    default: null
  })
  deletedAt: Date
}
