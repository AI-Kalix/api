import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Service } from 'src/service';
import { User } from '@prisma/client';

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

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      token: this.jwtService.sign(payload),
      user: user,
    };
  }

  async getMe(userId: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async clientAuth(deviceId: string) {
    let user = await this.prisma.user.findUnique({
      where: { deviceId },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: { deviceId },
      });

      const payload = {
        sub: user.id,
        email: user.deviceId,
        role: user.role,
      };

      return {
        token: this.jwtService.sign(payload),
        user,
      };
    }
    const payload = {
      sub: user.id,
      email: user.deviceId,
      role: user.role,
    };

    return {
      token: this.jwtService.sign(payload),
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

  async socialMediaUserGenerateJwt(user: User) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    const payload = {
      sub: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };

    return {
      token: this.jwtService.sign(payload),
      user: existingUser,
    };
  }
}
