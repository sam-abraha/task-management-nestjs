import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
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

    console.log('Creating user:', user);

    await this.save(user);

    console.log('User created:', user);
  }
}
