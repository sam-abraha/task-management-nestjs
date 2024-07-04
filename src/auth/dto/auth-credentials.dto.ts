import { IsString, MaxLength, MinLength, Matches} from "class-validator";
import { Task } from "src/tasks/task.entity";
import { OneToMany } from "typeorm";
export class AuthCredentialsDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username : string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: `Password is too weak. Passwords must contain at least: -1 upper case letter, - 1 lower case letter, - 1 number or special character.`,
      })
    password : string;

    @OneToMany((_type)=> Task, (task) => task.user, {
        eager : true
    })
    task : Task[]
}