import { Module } from '@nestjs/common';
import { HealthplanService } from './healthplan.service';
import { HealthplanController } from './healthplan.controller';

@Module({
  controllers: [HealthplanController],
  providers: [HealthplanService],
  exports: [HealthplanService],
})
export class HealthplanModule {}
