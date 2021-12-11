import { FactoryProvider } from '@nestjs/common';
import * as JsonWebToken from 'jsonwebtoken';

export const jwtProvider: FactoryProvider = {
  provide: 'JSON_WEB_TOKEN',
  useFactory: () => JsonWebToken
}
