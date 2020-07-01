import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Trainee } from './trainee.entity';

@Injectable()
export class TraineesService {
  constructor (
      private traineeRepository: Repository<Trainee>
  ) {}

  async show (uid: string): Promise<Trainee> {
    return await this.traineeRepository.findOne({ uid });
  }

  async store (uid: string): Promise<boolean> {
    return (await this.traineeRepository.insert({ uid })).identifiers.length > 0;
  }

  async update (uid: string): Promise<boolean> {
    return !!(await this.traineeRepository.save({ uid })).uid;
  }

  async delete (uid: string): Promise<boolean> {
    return (await this.traineeRepository.delete(uid)).affected > 0;
  }
}
