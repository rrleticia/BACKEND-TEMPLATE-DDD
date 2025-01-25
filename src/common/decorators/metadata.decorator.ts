import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const Metadata = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const metadata = request.metadata;

    if (metadata) {
      return metadata;
    } else {
      throw new NotFoundException('Metadata does not exist in HTTP context');
    }
  }
);
