import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Query,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ActiveUser } from './decorators/session.decorator';
import { Role, User } from '@prisma/client';
import { ResponseMessage } from 'src/decorators/responseMessage.decorator';
import { Auth } from './decorators/auth.decorator';
import {
  ApiExtraModels,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientDto } from './dto/client.dto';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { GoogleLoginGuard } from './guards/google-auth/google-login.guard';
import {
  CLIENT_AUTH_RESPONSE_201_V1,
  CLIENT_AUTH_RESPONSE_201_V2,
  GOOGLE_CALLBACK_RESPONSE_200,
  INVALID_CREDENTIALS_401,
  LOGIN_RESPONSE_200,
  ME_200,
  REGISTER_USER_200,
  UNAUTHORIZEDEXCEPTION_RESPONSE_401,
} from './docs/authResponses';

@ApiTags('Auth')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
})
@ApiExtraModels(ClientDto, RegisterDto, LoginDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('client')
  @ResponseMessage('Token generated successfully')
  @ApiOperation({ summary: 'Simulated client authentication' })
  @ApiResponse({
    status: 201,
    description: 'Token generated successfully',
    content: {
      'application/json': {
        examples: {
          v1: {
            summary: 'v1',
            value: CLIENT_AUTH_RESPONSE_201_V1,
          },
          v2: {
            summary: 'v2',
            value: CLIENT_AUTH_RESPONSE_201_V2,
          },
        },
      },
    },
  })
  async clientAuth(@Body() clientDto: ClientDto) {
    return this.authService.clientAuth(clientDto.deviceId);
  }

  @Get('google/login')
  @UseGuards(GoogleLoginGuard)
  @Auth([Role.USER])
  @ApiOperation({ summary: 'Google auth' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    example: UNAUTHORIZEDEXCEPTION_RESPONSE_401,
  })
  async googleLogin(@Query('deviceId') deviceId: string) {
    return { msg: 'Google authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @ResponseMessage('successful registration with google')
  @ApiOperation({ summary: 'Google callback' })
  @ApiResponse({
    status: 200,
    example: GOOGLE_CALLBACK_RESPONSE_200,
  })
  async googleCallback(@Req() req) {
    const respose = await this.authService.socialMediaUserGenerateJwt(req.user);
    return respose;
  }

  @Post('register')
  @ResponseMessage('User registered successfully')
  @Auth([Role.USER])
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    example: UNAUTHORIZEDEXCEPTION_RESPONSE_401,
  })
  @ApiResponse({
    status: 200,
    example: REGISTER_USER_200,
  })
  async register(@Body() registerDto: RegisterDto, @ActiveUser() user: User) {
    return this.authService.register(registerDto, user);
  }

  @Post('login')
  @ResponseMessage('User logged in successfully')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 401,
    example: INVALID_CREDENTIALS_401,
  })
  @ApiResponse({
    status: 200,
    example: LOGIN_RESPONSE_200,
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @Auth([Role.ADMIN, Role.USER])
  @ResponseMessage('User details retrieved successfully')
  @ApiOperation({ summary: 'get auth user' })
  @ApiResponse({
    status: 200,
    example: ME_200,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    example: UNAUTHORIZEDEXCEPTION_RESPONSE_401,
  })
  async me(@ActiveUser() user: User) {
    return this.authService.getMe(user.id);
  }
}
