import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ReasonInvalidImage {
  NOT_FOOD = 'NOT_FOOD',
  INVALID_FORMAT = 'INVALID_FORMAT',
  TOO_SMALL = 'TOO_SMALL',
}

export class InvalidImageDto {
  @ApiProperty({
    description: 'Reason why the image is not valid',
    enum: ReasonInvalidImage,
    example: ReasonInvalidImage.NOT_FOOD,
  })
  @IsEnum(ReasonInvalidImage)
  @IsNotEmpty()
  reason: ReasonInvalidImage;

  @ApiProperty({
    description: 'Error message',
    example: 'Image is not a valid food image',
  })
  @IsNotEmpty()
  @IsString()
  errorMessage: string;
}
