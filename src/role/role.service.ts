import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService implements OnModuleInit {

  constructor(@InjectRepository(Role) private readonly roleRepository:Repository<Role>) {}

  async onModuleInit() {
    await this.seedRoles();
  }

  private async seedRoles(){
    const roles = ['student', 'instructor', 'moderator', 'admin'];

    for (const roleName of roles) {
      await this.findOrCreate(roleName);
    }

    console.log('✅ Roles seeded successfully');
  }


  async findByName(name: string): Promise<Role | null> {
    return await this.roleRepository.findOne({ where: { name } });
  }

  async findOrCreate(name: string): Promise<Role> {
    let role = await this.findByName(name);

    if (!role) {
      role = this.roleRepository.create({ name });
      await this.roleRepository.save(role);
    }

    return role;
  }


  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }
}
