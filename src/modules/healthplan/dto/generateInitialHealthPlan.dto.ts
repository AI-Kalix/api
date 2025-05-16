import { Gender, TriedOtherApps } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { HealthPlanFormDto } from 'src/modules/healthplan/dto/healthPlanFormDto.dto';
import { Type } from 'class-transformer';

export class GenerateInitialHealthPlanDto {
  @ApiProperty({
    enum: Gender,
    example: Gender.MALE,
    description: 'Gender of the user',
    required: true,
  })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2000-01-01T00:00:00.000Z or 1990-05-15',
    description: 'Date of birth of the user',
    required: true,
  })
  @IsDateString(
    {},
    { message: 'dateOfBirth must be a valid ISO 8601 date string' },
  )
  dateOfBirth: string;

  @ApiProperty({
    type: Number,
    example: 175,
    description: 'Height of the user in centimeters',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @ApiProperty({
    type: Number,
    example: 70,
    description: 'Weight of the user in kilograms',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @ApiProperty({
    enum: TriedOtherApps,
    example: TriedOtherApps.YES,
    description: 'Has the user tried other apps?',
    required: true,
  })
  @IsEnum(TriedOtherApps)
  @IsNotEmpty()
  triedOtherApps: TriedOtherApps;

  @ApiProperty({
    type: HealthPlanFormDto,
    description: 'Health plan form',
    required: true,
  })
  @ValidateNested({ each: true })
  @Type(() => HealthPlanFormDto)
  @ApiProperty({
    type: HealthPlanFormDto,
    description: 'Health plan form',
    required: true,
  })
  healthPlanForm: HealthPlanFormDto;
}
