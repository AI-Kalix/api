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
  ApiQuery,
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
  REFRES_TOKEN_RESPONSE_ACCESS_DENIED,
  REFRESH_TOKEN_RESPONSE_201,
  REFRESH_TOKEN_RESPONSE_INVALID,
  REGISTER_USER_200,
  UNAUTHORIZEDEXCEPTION_RESPONSE_401,
} from './docs/authResponses';
import { RefreshTokenDto } from './dto/refreshTokenDto';

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
  @ApiQuery({
    name: 'deviceId',
    required: true,
    description: 'Device ID',
    type: String,
    example: '1234567890',
  })
  async googleLogin(@Query('deviceId') deviceId: string) {
    return { msg: 'Google authentication' + deviceId };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @ResponseMessage('successful registration with google')
  @ApiOperation({ summary: 'Google callback' })
  @ApiResponse({
    status: 200,
    description: 'successful registration with google',
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
    description: 'Unauthorized',
    example: UNAUTHORIZEDEXCEPTION_RESPONSE_401,
  })
  @ApiResponse({
    status: 200,
    description: 'User registered successfully',
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
    description: 'Invalid Credentials',
    example: INVALID_CREDENTIALS_401,
  })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
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
    description: 'User details retrieved successfully',
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

  @Post('refresh')
  @ResponseMessage('Access token refreshed successfully')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 201,
    description: 'Access token refreshed successfully',
    example: REFRESH_TOKEN_RESPONSE_201,
  })
  @ApiResponse({
    status: 403,
    description: 'Invalid refresh token',
    example: REFRESH_TOKEN_RESPONSE_INVALID,
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied',
    example: REFRES_TOKEN_RESPONSE_ACCESS_DENIED,
  })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshTokenDto.refreshToken);
  }
}
