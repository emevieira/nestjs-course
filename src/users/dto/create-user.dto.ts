import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  /**
   * O email é usado para realizar o login do usuário
   * @example marcos.augusto@gmail.com
   * */
  @IsEmail()
  email: string;

  /**
   * A senha é usada para realizar o login, ela devem ter no mínimo 4 e no máximo 20 caracteres, contendo letras maiúsculas, minusculas e números
   * @example ABC@123
   * */
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  /**
   * O nome é usado para exibição do perfil
   * @example Marcos Augusto
   * */
  @IsString()
  name: string;
}
