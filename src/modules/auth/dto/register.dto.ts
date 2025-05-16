import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password123',
    minLength: 6,
    type: String,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: Role,
    example: Role.USER,
    type: String,
    required: false,
    default: Role.USER,
    deprecated: true,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
