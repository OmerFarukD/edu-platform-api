import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserRole, UserRoleStatus } from '../user/entities/user-role.entity';
import { RoleService } from '../role/role.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    console.log(registerDto);
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Bu email zaten kullanılıyor.');
    }

    const hashedUser = await bcrypt.hash(registerDto.password, 10);

    const user = this.userRepository.create({
      email: registerDto.email,
      password: hashedUser,
      fullName: registerDto.fullName,
    });

    await this.userRepository.save(user);

    const studentRole = await this.roleService.findOrCreate('student');
    const userRole = this.userRoleRepository.create({
      role: studentRole,
      user: user,
    });

    await this.userRoleRepository.save(userRole);

    return this.generateToken(user, [studentRole.name]);
  }

  async login(loginDto: LoginDto) {
    // 1. Email ile user bul (roller ile birlikte)
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      relations: ['userRoles', 'userRoles.role'],
    });

    if (!user) {
      throw new UnauthorizedException('Email veya şifre hatalı');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email veya şifre hatalı');
    }
    const approvedRoles = user.userRoles
      .filter((ur) => ur.status === UserRoleStatus.APPROVED)
      .map((ur) => ur.role.name);

    return this.generateToken(user, approvedRoles);
  }

  private generateToken(user: User, roles: string[]) {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
