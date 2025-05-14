import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    const googleConfig = configService.get('google');

    super({
      clientID: googleConfig.clientId,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackUrl,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }
  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const deviceId = req.query.state as string;
    console.log(req.query.state);
    if (!deviceId) {
      return done(
        new UnauthorizedException('Missing deviceId in OAuth state'),
        null,
      );
    }
    const user = await this.authService.loginWithGoogle(
      {
        email: profile.emails[0].value,
        name: profile.name.givenName,
        lastname: profile.name.familyName,
      },
      deviceId,
    );

    done(null, user);
  }
}
