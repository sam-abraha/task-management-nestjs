import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "./users.repository";
import { ExternalContextCreator } from "@nestjs/core";
import { User } from "./user.entity";
import { JwtPayload } from "./jwt-payload.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy  extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository : UsersRepository,
        private configService : ConfigService,

    ) {
        super({
            secretOrKey : configService.get('JWT_SECRETKEY'),
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),

        })
    }

    async validate(payload : JwtPayload) : Promise<User> {
        const {username} = payload;
        const user : User = await this.usersRepository.findOne({
            where : {
                username : username
            }
        })

        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
    
}