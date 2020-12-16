import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TraineesModule } from './trainees/trainees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutsModule } from './workouts/workouts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(),
    TraineesModule,
    ExercisesModule,
    WorkoutsModule,
    ExercisesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
