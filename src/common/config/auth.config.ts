import { jwtConstants } from '@common/constants';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

export default class JwtConfig {
  static getJwtConfig(): JwtModuleOptions {
    return {
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    };
  }
}

export const JwtConfigAsync: JwtModuleAsyncOptions = {
  useFactory: async (): Promise<JwtModuleAsyncOptions> =>
    JwtConfig.getJwtConfig(),
};
