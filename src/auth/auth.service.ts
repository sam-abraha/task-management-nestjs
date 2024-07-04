import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ) {}

    async signUp (authCredialsDto : AuthCredentialsDto) : Promise<void>{
        return this.usersRepository.createUser(authCredialsDto);
    }

    async signIn(authCredentialsDto : AuthCredentialsDto) : Promise<string> {
        const { username, password } = authCredentialsDto;

        const user = await this.usersRepository.findOne({
            where : {
                username : username
            }
        })

        if (user && (await bcrypt.compare(password, user.password))) {
            return 'success';
          } else {
            throw new UnauthorizedException('Invalid credentials');
          }
    }
}