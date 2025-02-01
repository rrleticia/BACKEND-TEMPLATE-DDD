import { IS_PUBLIC_KEY } from '@common/decorators';
import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const canActivate = super.canActivate(context);

    if (!canActivate) {
      return false;
    }

    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const user = request.user;
    const routePath = request.route?.path;

    if (!user || !user.audience) {
      throw new ForbiddenException('User audience not found.');
    }

    const hasValidAudience = user.audience.some((aud: string) =>
      routePath.startsWith(aud)
    );
    if (!hasValidAudience) {
      throw new ForbiddenException('User does not have access to this route.');
    }

    return true;
  }
}
