import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginWeaverDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
