import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsOptional,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export enum ChoiceType {
  MULTIPLE_CHOICES = 'MULTIPLE CHOICES',
  SINGLE_CHOICE = 'SINGLE CHOICES',
}

export class QuestionDto {
  @ApiProperty({
    description: 'Type of question choice',
    example: ChoiceType.MULTIPLE_CHOICES,
  })
  @IsEnum(ChoiceType)
  @IsNotEmpty()
  choiceType: ChoiceType;
  @ApiProperty({
    description: 'Question asked by the user',
    example: 'How much meat does the dish contain?',
  })
  @IsString()
  question: string;

  @ApiProperty({
    description: 'Options presented to the user to answer',
    example: ['None', 'Little', 'Moderate', 'A lot'],
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  options: string[];

  @ApiPropertyOptional({
    description: 'Answer selected by the user',
    example: ['None'],
    isArray: true,
  })
  @IsOptional()
  @IsString({ each: true })
  answer?: string[];
}
