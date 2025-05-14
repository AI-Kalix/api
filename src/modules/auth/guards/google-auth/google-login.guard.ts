import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleLoginGuard extends AuthGuard('google') {
  private deviceId: string;

  canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const deviceId = req.query.deviceId as string;
    if (!deviceId) {
      throw new UnauthorizedException('Missing deviceId in query parameters');
    }
    this.deviceId = deviceId;
    return super.canActivate(context) as Promise<boolean>;
  }

  getAuthenticateOptions() {
    return { state: this.deviceId };
  }
}
