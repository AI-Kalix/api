import { IsString, IsArray, IsOptional } from 'class-validator';

export class QuestionDto {
  @IsString()
  question: string;
  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsOptional()
  @IsString({ each: true })
  answer?: string[];
}
