// meal-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { NutrionalTableDto } from '../aiResponse/nutrionalTable.dto';
import { QuestionDto } from '../aiResponse/question.dto';

export class MealResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  imageKey: string;

  @ApiProperty({ type: () => NutrionalTableDto })
  nutrionalTable: NutrionalTableDto;

  @ApiProperty({ type: () => [QuestionDto] })
  questions: QuestionDto[];

  @ApiProperty({ nullable: true })
  name: string | null;

  @ApiProperty({ nullable: true })
  location: string | null;

  @ApiProperty()
  isAIAnalysisDone: boolean;

  @ApiProperty()
  globalStatus: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  imageUrl: string;
}
