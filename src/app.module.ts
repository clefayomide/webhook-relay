import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './modules/gateway/gateway.module';
import { SecurityModule } from './security/security.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { SecurityMiddleware } from './common/middleware/security.middleware';
import { apiEntryPoint } from './constant';
import { SecurityService } from './security/security.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    GatewayModule,
    SecurityModule,
  ],
  controllers: [AppController],
  providers: [AppService, SecurityService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecurityMiddleware)
      .forRoutes({
        path: `${apiEntryPoint}/:name`,
        method: RequestMethod.POST,
      });
  }
}
