import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
@Entity()
export class Trainee {
  @PrimaryColumn()
  uid: string;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn({
    type: 'datetime',
    default: null
  })
  deletedAt: Date
}
