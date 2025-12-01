import { Exclude, Expose, Type } from 'class-transformer';

export class RoleDto {
  @Expose()
  name: string;
}

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  fullName: string;

  @Expose()
  avatar: string;

  @Exclude()
  password: string;

  @Expose()
  @Type(() => RoleDto)
  roles: RoleDto[];

  @Expose()
  createdAt: Date;
}