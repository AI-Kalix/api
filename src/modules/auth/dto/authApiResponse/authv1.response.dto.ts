// auth-response-v1.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { AuthTokensDto } from './auth.tokens.dto';
import { UserDto } from './user.dto';

export class AuthResponseV1Dto extends AuthTokensDto {
  @ApiProperty({ type: () => UserDto })
  user: UserDto;
}
