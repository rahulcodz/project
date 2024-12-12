import { IsEqual } from '@/utils/password-matcher';
import { IsEmail, IsNotEmpty, IsString, MinLength, ValidateIf } from 'class-validator';

export class RegisterWeaverDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf(o => o.password)
  @IsEqual('password')
  confirmPassword: string;
}
