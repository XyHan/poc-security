import { NestFactory } from '@nestjs/core';
import { UiHttpModule } from './ui/http/ui-http.module';

async function bootstrap() {
  const app = await NestFactory.create(UiHttpModule, { cors: true });
  await app.listen(3000);
}
bootstrap();
