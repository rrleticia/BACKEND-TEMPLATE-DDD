import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { ErrorsInterceptor } from '@common/interceptors/errors.interceptor';
import { LoggerMiddleware } from '@common/middleware/logger.middleware';

const HttpFilterProvider = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};

const ErrorsInterceptorProvider = {
  provide: APP_INTERCEPTOR,
  useClass: ErrorsInterceptor,
};

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, HttpFilterProvider, ErrorsInterceptorProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude().forRoutes();
  }
}
