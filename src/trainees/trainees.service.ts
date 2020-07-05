import { Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      return await this.traineeRepository.findOneOrFail({ uid });
    } catch (error) {
      throw new NotFoundException('No trainee found');
    }
  }

  async store (uid: string): Promise<boolean> {
    return (await this.traineeRepository.insert({ uid })).identifiers.length > 0;
  }

  async update (uid: string, trainee: Trainee): Promise<boolean> {
    return !!(await this.traineeRepository.update(uid, trainee));
  }

  async destroy (uid: string): Promise<boolean> {
    return (await this.traineeRepository.softDelete(uid)).affected > 0;
  }
}
