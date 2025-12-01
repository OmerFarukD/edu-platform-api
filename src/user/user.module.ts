import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { User } from './entities/user.entity';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User,UserRole])],
})
export class UserModule {}
