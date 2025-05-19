import { ApiProperty } from '@nestjs/swagger';
import { MealResponseDto } from './meal.response.dto';

export class MealPaginatedResponseDto {
  @ApiProperty({ type: [MealResponseDto] })
  meals: MealResponseDto[];

  @ApiProperty()
  totalMeals: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;
}
