import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { QuestionDto } from "./aiResponse/question.dto";

export class CreateMealDto {

  @IsOptional()
  @IsString()
  mealId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  data?: QuestionDto[];
}
