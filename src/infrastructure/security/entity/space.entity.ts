import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Length } from 'class-validator';
import { SpaceInterface } from '../../../domain/model/security/space.model';
import { UserToSpaceEntity } from './user-to-space.entity';
import { UserToSpaceInterface } from '../../../domain/model/security/user-to-space.model';

@Entity({ name: 'space' })
export class SpaceEntity implements SpaceInterface {
  @Exclude()
  @PrimaryGeneratedColumn({ name: 'id' }) private id: number;

  @Expose()
  @Length(1, 38)
  @Index('IDX_USER_UUID')
  @Column({ type: 'varchar', length: 38, name: 'uuid' , nullable: false, unique: true }) public uuid: string;

  @Expose()
  @Column({ type: 'datetime', name: 'created_at', nullable: false }) public createdAt: Date;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'created_by', nullable: false }) public createdBy: string;

  @Expose()
  @Column({ type: 'datetime', name: 'updated_at', nullable: false }) public updatedAt: Date;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'updated_by', nullable: false }) public updatedBy: string;

  @Expose()
  @Column({ type: 'integer', name: 'status', nullable: false }) public status: number;

  @Expose()
  @Column({ type: 'integer', name: 'objectable_type', nullable: false }) public objectableType: number;

  @Expose()
  @Column({ type: 'integer', name: 'objectable_uuid', nullable: true }) public objectableUuid: string;

  @Expose()
  @OneToMany(() => UserToSpaceEntity, userToSpace => userToSpace.space)
  public userToSpace: UserToSpaceInterface[];
}
