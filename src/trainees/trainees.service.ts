import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Trainee } from './trainee.entity';

@Injectable()
export class TraineesService {
  constructor (
      private traineeRepository: Repository<Trainee>
  ) {}

  async index (uid: string): Promise<Trainee> {
    return await this.traineeRepository.findOne(uid);
  }

  //store
    //Create many or just one given array

  //update
    // update just one given entire thing or partialy with patch
  //delete
    //delete just one
}
