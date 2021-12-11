import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigInterface } from './config.interface';
import { UserEntity } from '../security/entity/user.entity';
import { SpaceEntity } from '../security/entity/space.entity';
import { UserToSpaceEntity } from '../security/entity/user-to-space.entity';

@Injectable()
export class ConfigService implements ConfigInterface {
  private _storageDir: string = process.env.STORAGE_DIR;

  get storageDir(): string {
    return this._storageDir;
  }

  public getMysqlConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, SpaceEntity, UserToSpaceEntity],
      synchronize: true,
      keepConnectionAlive: true,
      debug: false,
    };
  }
}
