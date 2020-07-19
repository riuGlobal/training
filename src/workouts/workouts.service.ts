import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './workout.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkoutsService {
  constructor (
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>
  ){}

  async show(uid: string): Promise<Workout> {
    return await this.workoutRepository.findOneOrFail({ uid });
  }

}
