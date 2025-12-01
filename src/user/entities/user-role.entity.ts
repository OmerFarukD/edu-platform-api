import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Role } from '../../role/entities/role.entity';

export enum UserRoleStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('user_role')
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.userRoles, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Role, role => role.userRoles, { onDelete: 'CASCADE' })
  role: Role;

  @Column({
    type: 'enum',
    enum: UserRoleStatus,
    default: UserRoleStatus.APPROVED,
  })
  status: UserRoleStatus;

  @CreateDateColumn()
  assignedAt: Date;
}