import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { SpaceInterface } from '../../../domain/model/user/space.model';
import { UserToSpaceInterface } from '../../../domain/model/user/user-to-space.model';
import { UserInterface } from '../../../domain/model/user/user.model';
import { UserEntity } from './user.entity';
import { SpaceEntity } from './space.entity';

@Entity({ name: 'user-to-space' })
export class UserToSpaceEntity implements UserToSpaceInterface {
  @Exclude()
  @PrimaryGeneratedColumn({ name: 'id' }) private id: number;

  @Expose()
  @ManyToOne(() => UserEntity, user => user.userToSpace)
  public user!: UserInterface;

  @Expose()
  @ManyToOne(() => SpaceEntity, space => space.userToSpace)
  public space!: SpaceInterface;

  @Expose()
  @Column({ type: 'datetime', name: 'created_at', nullable: false }) public createdAt: Date;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'created_by', nullable: false }) public createdBy: string;

  @Expose()
  @Column({ type: 'datetime', name: 'updated_at', nullable: false }) public updatedAt: Date;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'updated_by', nullable: false }) public updatedBy: string;

  @Expose()
  @Column({ type: 'simple-array', name: 'roles', nullable: false }) public roles: number[];
}
