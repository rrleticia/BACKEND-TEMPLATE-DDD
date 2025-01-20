import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FEATURE_KEY } from "@common/decorators";

@Injectable()
export class FeatureGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requiredFeatures = this.reflector.getAllAndOverride(FEATURE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredFeatures) {
      return true;
    }

    const ctx = context.switchToHttp();
    const { metadata } = ctx.getRequest();
    const { featurePermissions } = metadata;

    return requiredFeatures.every((element) =>
      featurePermissions.includes(element)
    );
  }
}
