import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Trainee } from './trainee.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TraineesService {
  constructor (
      @InjectRepository(Trainee)
      private traineeRepository: Repository<Trainee>
  ) {}

  async show (uid: string): Promise<Trainee> {
    return await this.traineeRepository.findOneOrFail({ uid });
  }

  async store (trainee: Trainee): Promise<boolean> {
    return (await this.traineeRepository.insert(trainee)).identifiers.length > 0;
  }

  async update (uid: string, trainee: Trainee): Promise<boolean> {
    return !!(await this.traineeRepository.update(uid, trainee));
  }

  async destroy (uid: string): Promise<boolean> {
    return !!(await this.traineeRepository.softDelete(uid)).raw.affectedRows;
  }

  async reactivate (uid: string): Promise<boolean> {
    return !!(await this.traineeRepository.restore(uid)).raw.affectedRows;
  }
}
