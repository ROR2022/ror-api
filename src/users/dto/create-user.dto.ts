import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
//import { listRoles } from 'src/lib/dataGlobal';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'password must contain min 8 characteres, 1 lowercase, 1 uppercase, 1 number, 1 symbol',
    },
  )
  password: string;

  @IsEmail({}, { message: 'email must be a valid email' })
  email: string;

  role: string;

  active: boolean;

  avatar: string;
}
