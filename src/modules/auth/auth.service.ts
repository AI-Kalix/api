import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Service } from 'src/service';
import { Role, User } from '@prisma/client';

export interface SocialMediaUser {
  email: string;
  name: string;
  lastname: string;
}

@Injectable()
export class AuthService extends Service {
  constructor(private jwtService: JwtService) {
    super(AuthService.name);
  }

  async register(dto: RegisterDto, user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const existingUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    const updateUser = await this.prisma.user.update({
      where: { deviceId: existingUser.deviceId },
      data: {
        email: dto.email,
        password: hashedPassword,
      },
    });

    return updateUser;
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    const newUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      newUser,
    };
  }

  async getMe(userId: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async clientAuth(deviceId: string): Promise<{
    accessToken: string;
    refreshToken: string;
    user?: User;
  }> {
    let user = await this.prisma.user.findUnique({
      where: { deviceId },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: { deviceId },
      });

      const tokens = await this.generateTokens(
        user.id,
        user.deviceId,
        user.role,
      );
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user,
      };
    }

    const tokens = await this.generateTokens(user.id, user.deviceId, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async loginWithGoogle(
    googleUser: SocialMediaUser,
    deviceId: string,
  ): Promise<User> {
    if (!deviceId) {
      throw new UnauthorizedException('Missing deviceId in query parameters');
    }
    const user = await this.prisma.user.findFirst({
      where: { email: googleUser.email },
    });

    if (user) return user;

    const userByDeviceId = await this.prisma.user.findUnique({
      where: { deviceId },
    });

    if (!userByDeviceId) {
      throw new UnauthorizedException(
        "This user doesn't have a valid deviceId",
      );
    }

    return await this.prisma.user.update({
      where: { deviceId },
      data: {
        email: googleUser.email,
        name: googleUser.name,
        lastname: googleUser.lastname,
      },
    });
  }

  async socialMediaUserGenerateJwt(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!existingUser) {
      throw new UnauthorizedException('User not found');
    }

    const tokens = await this.generateTokens(
      existingUser.id,
      existingUser.email,
      existingUser.role,
    );

    await this.updateRefreshToken(existingUser.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: existingUser,
    };
  }

  private async generateTokens(userId: string, email: string, role: Role) {
    const payload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: '15m' }),
      this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    ]);

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashed = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashed },
    });
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Access Denied');
      }

      const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isMatch) {
        throw new UnauthorizedException('Access Denied');
      }

      const tokens = await this.generateTokens(user.id, user.email, user.role);
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
      this.logger.error(error);
    }
  }
}
