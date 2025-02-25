import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.stategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({defaultStrategy : 'jwt'}),
    JwtModule.registerAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory : async (configService : ConfigService) => ({
        secret : configService.get('JWT_SECRETKEY'),
        signOptions : {
          expiresIn : 3600
        }

      })
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [AuthService, UsersRepository, JwtStrategy],
  controllers: [AuthController],
  exports : [JwtStrategy, PassportModule]
})
export class AuthModule {}