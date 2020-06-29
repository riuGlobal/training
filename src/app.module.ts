import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TraineesModule } from './trainees/trainees.module';

@Module({
  imports: [TraineesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
