import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { QuestionDto } from "./aiResponse/question.dto";

export class CreateMealDto {

  @ApiProperty({
    description: 'Optional ID of the meal, if it already exists',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  mealId?: string;

  @ApiProperty({
    description: 'Optional array of questions related to the meal',
    type: [QuestionDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  data?: QuestionDto[];
}

