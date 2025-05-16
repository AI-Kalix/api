import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive } from 'class-validator';

export class NutrionalTableDto {
  @ApiProperty({
    description: 'Meal name',
    example: 'KFC',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Calories in the meal',
    example: 250,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  calories: number;
  /**
   * Total de grasas en gramos
   */
  // @IsNumber()
  // @IsPositive()
  // totlFats: number;
  /**
   * Grasas saturadas en gramos
   */
  // @IsNumber()
  // @IsPositive()
  // saturatedFats: number;
  /**
   * Grasas trans en gramos
   */
  // @IsNumber()
  // @IsPositive()
  // transFats: number;
  /**
   * Colesterol en miligramos
   */
  // @IsNumber()
  // @IsPositive()
  // cholesterol: number;
  /**
   * Sodio en miligramos
   */
  // @IsNumber()
  // @IsPositive()
  // sodio: number;
  /**
   * Carbohidratos totales en gramos
   */
  // @IsNumber()
  // @IsPositive()
  // totalCarbohydrates: number;
  /**
   * Azucares en gramos
   */
  // @IsNumber()
  // @IsPositive()
  // sugar: number;
  /**
   * Proteinas en gramos
   */
  // @IsNumber()
  // @IsPositive()
  // proteins: number;
}
