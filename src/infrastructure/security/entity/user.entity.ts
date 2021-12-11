import { UserInterface } from '../../../domain/model/security/user.model';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Length } from 'class-validator';
import { UserToSpaceInterface } from '../../../domain/model/security/user-to-space.model';
import { UserToSpaceEntity } from './user-to-space.entity';

@Entity({ name: 'user' })
export class UserEntity implements UserInterface {
  @Exclude()
  @PrimaryGeneratedColumn({ name: 'id' }) private id: number;

  @Expose()
  @Length(1, 200)
  @Index('IDX_USER_EMAIL')
  @Column({ type: 'varchar', length: 200, name: 'email', nullable: false, unique: true  }) public email: string;

  @Exclude()
  @Column({ type: 'varchar', name: 'password', nullable: false }) public password: string;

  @Exclude()
  @Column({ type: 'varchar', name: 'salt', nullable: false }) public salt: string;

  @Expose()
  @Column({ type: 'datetime', name: 'created_at', nullable: false }) public createdAt: Date;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'created_by', nullable: false }) public createdBy: string;

  @Expose()
  @Column({ type: 'datetime', name: 'updated_at', nullable: false }) public updatedAt: Date;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'updated_by', nullable: false }) public updatedBy: string;

  @Expose()
  @Length(1, 38)
  @Index('IDX_USER_UUID')
  @Column({ type: 'varchar', length: 38, name: 'uuid' , nullable: false, unique: true }) public uuid: string;

  @Expose()
  @Column({ type: 'integer', name: 'status', nullable: false }) public status: number;

  @Expose()
  @OneToMany(() => UserToSpaceEntity, userToSpace => userToSpace.user)
  public userToSpace: UserToSpaceInterface[];
}
