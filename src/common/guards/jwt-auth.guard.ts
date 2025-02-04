import { IS_PUBLIC_KEY } from '@common/decorators';
import { AuthService } from '@modules/auth/auth.service';
import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly _authService: AuthService
  ) {
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

    const routePath = request.originalUrl;
    const token = request.cookies?.access_token;

    let options_metadata;

    try {
      console.log('Token recebido:', token);

      options_metadata = this._authService.verifyToken(token);

      console.log('Metadata do token:', options_metadata);
    } catch (e) {
      console.error('Erro ao verificar token:', e);
      return false;
    }

    const audience = options_metadata.aud;
    console.log(routePath);

    const hasValidAudience = audience.some((aud: string) => {
      return routePath.startsWith(aud);
    });

    if (!hasValidAudience) {
      throw new ForbiddenException('User does not have access to this route.');
    }
    console.info('User logged in successfully');
    return true;
  }
}
