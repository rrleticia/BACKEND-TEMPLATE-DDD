import { jwtConstants } from '@common/constants';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

export default class JwtConfig {
  static getJwtConfig(): JwtModuleOptions {
    return {
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    };
  }
}

export const JwtConfigAsync: JwtModuleAsyncOptions = {
  useFactory: async (): Promise<JwtModuleAsyncOptions> =>
    JwtConfig.getJwtConfig(),] 
};
