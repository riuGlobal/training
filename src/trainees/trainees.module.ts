import { Module } from '@nestjs/common';
import { TraineesController } from './trainees.controller';

@Module({
  controllers: [TraineesController]
})
export class TraineesModule {}
