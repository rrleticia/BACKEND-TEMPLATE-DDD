import { JwtPayloadType } from '@common/types/jwt-payload.type';
import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const JwtPayload = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const jwtPayload: JwtPayloadType = request.user;

    if (jwtPayload) {
      return jwtPayload;
    } else {
      throw new NotFoundException('JwtPayload does not exist in HTTP context');
    }
  }
);
