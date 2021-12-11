import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface ConfigInterface {
    getMysqlConfig(): TypeOrmModuleOptions;
}
