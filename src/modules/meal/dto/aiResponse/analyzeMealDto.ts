import { QuestionDto } from '../aiResponse/question.dto';

export class AnalyzeMealDto {
  resource: string;
  userId: string;
  answers?: QuestionDto[];
}
