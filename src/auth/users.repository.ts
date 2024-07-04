import { Repository, DataSource } from 'typeorm';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = this.create({
      username,
      password,
    });

    try {
        await this.save(user);
    } catch(error) {
        //Duplicate Username Error Handling
        if(error.code === '23505') {
            throw new ConflictException('User already exists!')
        }
        else {
            throw new InternalServerErrorException();
        }
    };
  }
}
