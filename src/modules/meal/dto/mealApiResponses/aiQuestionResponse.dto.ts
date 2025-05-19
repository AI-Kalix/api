// ai-question-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { QuestionDto } from '../aiResponse/question.dto';

export class AiQuestionResponseDto {
  @ApiProperty({ type: () => [QuestionDto] })
  questions: QuestionDto[];

  @ApiProperty()
  mealId: string;
}
