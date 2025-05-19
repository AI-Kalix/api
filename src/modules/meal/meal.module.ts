import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { S3Service } from '../aws/s3/s3.service';
import { AiAnalysisService } from './aiAnalysis/aiAnalysis.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MealController],
  providers: [MealService, S3Service, AiAnalysisService],
})
export class MealModule {}
