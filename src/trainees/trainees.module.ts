import { Module } from '@nestjs/common';
import { TraineesController } from './trainees.controller';
import { TraineesService } from './trainees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainee } from './trainee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trainee])],
  controllers: [TraineesController],
  providers: [TraineesService]
})
export class TraineesModule {}
