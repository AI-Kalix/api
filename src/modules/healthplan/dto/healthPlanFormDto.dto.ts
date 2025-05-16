import {
  DesiredOutcome,
  DietType,
  Goal,
  MainChallenge,
  WorkoutsPerWeek,
} from '@prisma/client';
import {
  IsEnum,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HealthPlanFormDto {
  @ApiProperty({
    type: Number,
    description: 'Desired weight of the user in kilograms',
    example: 70,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  desiredWeight: number;

  @ApiProperty({
    enum: WorkoutsPerWeek,
    description: 'Number of workouts per week',
    example: WorkoutsPerWeek.HIGH_6_PLUS,
    required: true,
  })
  @IsEnum(WorkoutsPerWeek)
  @IsNotEmpty()
  workoutsPerWeek: WorkoutsPerWeek;

  @ApiProperty({
    enum: DietType,
    description: 'Type of diet the user is following',
    example: DietType.VEGAN,
    required: true,
  })
  @IsEnum(DietType)
  @IsNotEmpty()
  dietType: DietType;

  @ApiProperty({
    type: String,
    description: 'Time for breakfast in military time format',
    example: '07:00',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'breakFastTime is required' })
  @IsMilitaryTime({ message: 'breakFastTime must be a valid HH:mm time' })
  breakFastTime: string;

  @ApiProperty({
    type: String,
    description: 'Time for lunch in military time format',
    example: '12:30',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'lunchTime is required' })
  @IsMilitaryTime({ message: 'lunchTime must be a valid HH:mm time' })
  lunchTime: string;

  @ApiProperty({
    type: String,
    description: 'Time for dinner in military time format',
    example: '18:30',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'dinnerTime is required' })
  @IsMilitaryTime({ message: 'dinnerTime must be a valid HH:mm time' })
  dinnerTime: string;

  @ApiProperty({
    enum: Goal,
    description: 'Primary goal of the health plan',
    example: Goal.LOSE_WEIGHT,
    required: true,
  })
  @IsEnum(Goal)
  @IsNotEmpty()
  goal: Goal;

  @ApiProperty({
    type: Number,
    description: 'Desired weight change per week in kilograms',
    example: 0.5,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  weightChangePerWeek: number;

  @ApiProperty({
    enum: DesiredOutcome,
    description: 'Desired outcome of the health plan',
    example: DesiredOutcome.BETTER_BODY_IMAGE,
    required: true,
  })
  @IsEnum(DesiredOutcome)
  @IsNotEmpty()
  desiredOutcome: DesiredOutcome;

  @ApiProperty({
    enum: MainChallenge,
    description: 'Main challenge faced by the user',
    example: MainChallenge.INCONSISTENCY,
    required: true,
  })
  @IsEnum(MainChallenge)
  @IsNotEmpty()
  mainChallenge: MainChallenge;
}
