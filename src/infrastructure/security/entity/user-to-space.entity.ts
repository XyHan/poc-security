import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { SpaceInterface } from '../../../domain/model/security/space.model';
import { UserToSpaceInterface } from '../../../domain/model/security/user-to-space.model';
import { UserInterface } from '../../../domain/model/security/user.model';
import { UserEntity } from './user.entity';
import { SpaceEntity } from './space.entity';

@Entity({ name: 'user-to-space' })
export class UserToSpaceEntity implements UserToSpaceInterface {
  @Exclude()
  @PrimaryGeneratedColumn({ name: 'id' }) private id: number;

  @Expose()
  @ManyToOne(() => UserEntity, user => user.userSpaces)
  public user!: UserInterface;

  @Expose()
  @ManyToOne(() => SpaceEntity, space => space.bindedUsers)
  public space!: SpaceInterface;

  @Expose()
  @Column({ type: 'datetime', name: 'created_at', nullable: false }) public createdAt: Date;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'created_by', nullable: false }) public createdBy: string;

  @Expose()
  @Column({ type: 'simple-array', name: 'permissions', nullable: false }) public permissions: string[];
}
