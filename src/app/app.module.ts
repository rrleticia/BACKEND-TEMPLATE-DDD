import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '@common/middleware/logger.middleware';
import {
  HttpFilterProvider,
  ErrorsInterceptorProvider,
  AuthenticationGuard,
  AppRolesGuard,
} from '@common/constants';
import { MyConfigModule } from '@modules/config/config.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [MyConfigModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    HttpFilterProvider,
    ErrorsInterceptorProvider,
    AuthenticationGuard,
    AppRolesGuard,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude().forRoutes('user');
  }
}
