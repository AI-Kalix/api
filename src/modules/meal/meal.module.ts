import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { S3Service } from '../aws/s3/s3.service';

@Module({
  controllers: [MealController],
  providers: [MealService, S3Service],
})
export class MealModule {}
