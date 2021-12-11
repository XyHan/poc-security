import { FactoryProvider } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const bcryptProvider: FactoryProvider = {
  provide: 'BCRYPT',
  useFactory: () => bcrypt
}
