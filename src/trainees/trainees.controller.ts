import { Controller, Get, Post, Body, Delete, UseGuards, Patch } from '@nestjs/common';
import { TraineesService } from './trainees.service';
import { Trainee } from './trainee.entity';
import { UserGuard } from 'src/auth/user.guard';
import { Header } from '../decorators/global.decorator';
import { ActiveRecordExists, InactiveRecordExists, RecordDoesNotExist } from 'src/validators/repository.validator';
@Controller('trainees')
@UseGuards(UserGuard)
export class TraineesController {
  constructor (
    private readonly traineeService: TraineesService
  ) {}

  @Get()
  async show (@Header('uid', new ActiveRecordExists(Trainee)) uid :string): Promise<Trainee> {
    return await this.traineeService.show(uid);
  }

  @Post()
  async store (@Header('uid', new RecordDoesNotExist(Trainee)) uid :string, @Body() trainee: Trainee): Promise<boolean> {
    return await this.traineeService.store({ ...trainee, uid });
  }

  @Patch()
  async update (@Header('uid', new ActiveRecordExists(Trainee)) uid :string, @Body() trainee: Trainee): Promise<boolean> {
    return await this.traineeService.update(uid, { ...trainee, uid });
  }

  @Delete()
  async destroy (@Header('uid', new ActiveRecordExists(Trainee)) uid :string) : Promise<boolean> {
    return await this.traineeService.destroy(uid);
  }

  @Patch()
  async reactivate (@Header('uid', new InactiveRecordExists(Trainee)) uid: string): Promise<boolean> {
    return await this.traineeService.reactivate(uid);
  }
}
