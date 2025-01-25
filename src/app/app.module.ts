import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from '@common/middleware/logger.middleware';
import {
  HttpFilterProvider,
  ErrorsInterceptorProvider,
  AuthenticationGuard,
} from '@common/constants';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    HttpFilterProvider,
    ErrorsInterceptorProvider,
    AuthenticationGuard,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude().forRoutes();
  }
}
