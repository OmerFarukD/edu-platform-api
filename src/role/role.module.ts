import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Module({
  providers: [RoleService],
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [RoleService]
})
export class RoleModule {}
