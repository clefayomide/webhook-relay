import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerFactory } from './common/factory/LoggerFactory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    logger: LoggerFactory(),
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
