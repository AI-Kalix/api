import { IsString, IsNumber, IsPositive } from 'class-validator';

export class NutrionalTableDto {
  @IsString()
  name: string;
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

