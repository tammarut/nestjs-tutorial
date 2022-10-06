import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger as PinoLogger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { ConfigSchema } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(PinoLogger));
  app.enableCors();
  const configService = app.get(ConfigService<ConfigSchema>);
  const appPort = configService.get<string>('PORT');

  await app.listen(appPort, () =>
    Logger.log(`Server is running at port :${appPort}`, 'NestApplication')
  );
}
void bootstrap();
