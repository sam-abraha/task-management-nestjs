import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService : JwtService
    ) {}

    async signUp (authCredialsDto : AuthCredentialsDto) : Promise<void>{
        return this.usersRepository.createUser(authCredialsDto);
    }

    async signIn(
        authCredentialsDto : AuthCredentialsDto,
        res : Response,
    ) : Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = await this.usersRepository.findOne({
            where : {
                username : username
            }
        })

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload : JwtPayload = { username };
            const accessToken = await this.jwtService.sign(payload);

            res.cookie('accessToken',accessToken, {
                httpOnly : true,
                secure : true,
                sameSite : 'none',
                maxAge : 3600000,
            });

            res.sendStatus(200);
          } else {
            throw new UnauthorizedException('Invalid credentials');
          }
    }
}