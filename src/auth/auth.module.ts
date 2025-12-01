import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserRole } from '../user/entities/user-role.entity';
import { RoleModule } from '../role/role.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User, UserRole]),
    RoleModule,
    PassportModule,
    JwtModule.register({
      secret: 'my-super-secret-keymy-super-secret-keymy-super-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [JwtStrategy, JwtModule],
})
export class AuthModule {}
