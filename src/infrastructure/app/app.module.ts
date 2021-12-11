import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConfigInterface } from '../config/config.interface';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRootAsync({
      'imports': [ConfigModule],
      'inject': [ConfigService],
      'useFactory': async (config: ConfigInterface) => {
        return config.getMysqlConfig();
      }
    }),
    LoggerModule
  ],
})
export class AppModule {}
