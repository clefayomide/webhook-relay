import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './modules/gateway/gateway.module';
import { SecurityModule } from './modules/security/security.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { SecurityMiddleware } from './common/middleware/security.middleware';
import { apiEntryPoint } from './constant';
import { SecurityService } from './modules/security/security.service';
import { UtilsModule } from './modules/utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    GatewayModule,
    SecurityModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SecurityService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SecurityMiddleware).forRoutes({
      path: `${apiEntryPoint}/:name`,
      method: RequestMethod.POST,
    });
  }
}
