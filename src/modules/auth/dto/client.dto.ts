import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ClientDto {
  @ApiProperty({
    description: 'Device identifier for anonymous or registered client',
    example: '123413123123',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  deviceId: string;
}
